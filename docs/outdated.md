## 过时的函数
- 由于过于复杂或不实用已经不推荐使用的内置函数

- 又或者，极速模式下，我们想让处理器升频变的非常积极，同时让后台进程也可以比较正常的保持运行
- 则可以像这样配置
```json
{
  "platform": "lahaina",
  "platform_name": "骁龙888",
  "schemes": {
    "performance": {
      "call": [
        ["@set_priority", "top-app", "max"],
        ["@set_priority", "foreground", "high"],
        ["@set_priority", "background", "normal"]
      ]
    }
  }
}
```

#### 补充说明
- 关乎处理器升降频积极性的全局参数，只会在调用 **`@set_priority` top-app [level]** 时修改
- `high`、`max`、`turbo` 均会提高处理器升频积极性和重负载任务向大核迁移的积极性
  > 注意：`turbo`级别会无条件的优先使用大核<br>
  > 优先使用大核，在负载不高的情况下，能显著提高流畅度和响应速度<br>
  > `但`在高帧率的游戏和大型游戏中，单核性能要求往往非常之高，<br>
  > 将过多的任务迁移至大核，可能会压垮本就负载极高的大核


### 设置值 `@set_value`
- 参数格式为 **@set_value [path] [value]**
- 例如，我准备在省电模式下向指定路径写入值(示例中为意图关闭CPU7)
```json
{
  "schemes": {
    "powersave": {
      "call": [
        ["@set_value", "/sys/devices/system/cpu/cpu7/online", "0"]
      ]
    }
  }
}
```

#### 补充说明
> `@set_value` 函数的拓展用法非常复杂，如果你还没有遇到需要特殊用法的场景，可以先略过本节，继续阅读其它说明<br>
> 留意，所有特殊用法都是在 [value] 上加特殊标识符

- 特殊用法：多次写入 `|`符号
> 下面这个例子是我们通过PPM，修改MTK处理器频率<br>
> 是指分两次分别写入`0 1991000`和`1 2025000`
```
"call": [
  ["@set_value", "/proc/ppm/policy/hard_userlimit_max_cpu_freq", "0 1991000|1 2025000"]
]
```

- 所有特殊用法

```
多个值 如 123|223|323
只调大 如 ^223 或 >223，说明：如属性当前值为 123, value指定^122 则不会执行写入，如果 value指定^124 会执行写入
只调小 如 <123，说明：如属性当前值为 123, value指定^124 则不会执行写入，如果 value指定^122 会执行写入
锁定值 如 #123，说明：向指定属性写入123，完成将属性改为只读状态
校验值 如 true(enabled:true)，说明：如果属性当前值 是 enabled:true，则不执行写入
模糊校验 如 true(~enabled:true)，说明：如果属性当前值 包含 enabled:true，则不执行写入
不校验 如 =123，表示跳过比对属性当前值，即使属性当前值与value相等，也会执行写入
			* 框架默认会有比对逻辑，value直接写 111 等同于 111(111),
			* 但是注意，value包含 | 符号时无法执行校验，例如 1500|1700|1899 等同于 =1500|=1700|=1899

values 特殊格式 标识符特殊用法
正确示例
#^223 只上调数值，并锁定数值
#^1600000(boost_cluster_0:1600000) 只上调数值，并锁定数值
0 1600000|1 1400000|#1 1400000 分别向属性写入 0 1600000, 1 1400000, 1 1400000, 并在完成后锁定

错误示例
^#223 锁定标识符(#)和其它标识符共同使用时，#必须永远放在最前面
```
