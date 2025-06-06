## 调用
- Scene的性能调节配置并未采用完全固定的格式
- 而是以*调用(call)*为核心构成各个场景的设定
- 配置的作用就是声明各个场景，要调用Scene提供的哪些函数，将参数改成什么样

### 写入数值
- 例如，使用`@set_value`函数可以向指定路径写入值
  ```js
  // 示例
  ["@set_value", "/proc/sys/kernel/sched_boost", "1]

  // @set_value较为特殊，Scene建议省略函数名直接写path和value
  ["/proc/sys/kernel/sched_boost", "1"]
  ```
- 如果需要再写入数值后，将文件设为只读(0444)，可以在value前加#
  > 这么做主要是防止第三方应用或系统再覆盖写入的数值，并不影响Scene下次写入该文件

  ```js
  ["/proc/sys/kernel/sched_boost", "#1"]
  ```



### 其它函数
- Scene内置了一些常用的频率调节函数
- 这些函数对(Qualcomm|MediaTek)设备做了兼容适配
- 让使用者无需考虑具体需要向什么路径写入参数才能完成性能调节
- 如果你非常了解各个平台的差异，直接写路径会比调用这些函数更高效

#### CPU频率范围 **`@cpu_freq`**
- 参数格式为 **@cpu_freq [clusterExpr] [freqExpr] [freqExpr]**
- 例如，我准备在省电模式下将CPU小核限制为最高900Mhz
```json
{
  "schemes": {
    "powersave": {
      "call": [
        ["@cpu_freq", "cpu0", "min", "900MHz"]
      ]
    }
  }
}
```


### CPU最小频率 **`@cpu_freq_min`**
- 参数格式为 **@cpu_freq_min [clusterExpr] [freqExpr]**
- 例如，我准备在省电模式下将CPU小核限制为最低300Mhz
```json
{
  "schemes": {
    "powersave": {
      "call": [
        ["@cpu_freq_min", "cpu0", "300MHz"]
      ]
    }
  }
}
```

#### CPU最大频率 **`@cpu_freq_max`**
- 参数格式为 **@cpu_freq_max [clusterExpr] [freqExpr]**
- 例如，我准备在省电模式下将CPU小核限制为最高900Mhz
```json
{
  "schemes": {
    "powersave": {
      "call": [
        ["@cpu_freq_max", "cpu0", "900MHz"]
      ]
    }
  }
}
```

#### GPU频率范围 `@gpu_freq`
- 参数格式为 **@gpu_freq [freqExpr] [freqExpr]**
- 例如，我准备在省电模式下将CPU小核限制为最高500Mhz
```json
{
  "schemes": {
    "powersave": {
      "call": [
        ["@gpu_freq", "min", "500MHz"]
      ]
    }
  }
}
```

#### GPU最小频率 **`@gpu_freq_min`**
- 参数格式为 **@gpu_freq_min [freqExpr]**
- 例如，我准备在极速模式下将GPU最低频率限制为400Mhz
```json
{
  "schemes": {
    "fast": {
      "call": [
        ["@gpu_freq_min", "400MHz"]
      ]
    }
  }
}
```

#### GPU最大频率 **`@gpu_freq_max`**
- 参数格式为 **@gpu_freq_max [freqExpr]**
- 例如，我准备在省电模式下将GPU最膏限制为最高300Mhz
```json
{
  "schemes": {
    "powersave": {
      "call": [
        ["@gpu_freq_max", "400MHz"]
      ]
    }
  }
}
```

#### 补充说明
- 频率范围冲突
  > 假设，CPU0此时已经被限制为 [600Mhz ~ 1.2Ghz]<br>
  > 我们调用 **`@cpu_freq_min` cpu0 1.5Ghz** 必然不会成功<br>
  > 因为 1.5Ghz 不符合 [600Mhz ~ 1.2Ghz]这个区间<br>
  > 建议使用 **`@cpu_freq` cpu0 1.5Ghz 2.0Ghz** 直接指定CPU频率范围

- clusterExpr说明
  > 我们修改CPU频率通常是以核心集群(Cluster)为单位进行的<br>
  > 例如，4+3+1的骁龙处理器，小、中、大核可以用以下几种格式来表示<br>
  > `cpu0`、`cpu4`、`cpu7`<br>
  > `policy0`、`policy4`、`policy7`<br>
  > `cluster0`、`cluster1`、`cluster2`<br>
  > 但是，千万不要用意义不明的数字来表示，例如 `0`、`4`、`7`，这是非常不利于理解

- freqExpr说明
  > 为了更方便的表示频率，Scene内置了多种格式兼容和特殊值<br>
  > 例：`min`、`max` 分别表示该核心(Cluster)支持的最小、最大频率<br>
  > 例：`1800Mhz`、`1.8Ghz` 均等同于 `1800000Khz` 或 直接写 `1800000`<br>
  > 如果你指定了一个不存在的频率，那么Scene会帮你选择低于指定频率的最大频率<br>
  > 又或者，指定的频率比核心支持的最高频率还要高，那么Scene会帮你选择支持的最高频率<br>
  > 又或者，指定的频率比核心支持的最低频率还低，那么Scene会帮你选择支持的最低频率<br>

  > 但是，小心！用`GHz|MHz`表示频率虽然非常方便，但你可能会掉进陷阱<br>
  > 因为CPU的频率经常不是 2.8Ghz(2800000Khz) 这样整齐的数字，更多是 2841600Khz这样<br>
  > 如果你写2.8Ghz，是不会匹配到2841600Khz这个频率的！<br>

  > 负值频率<br>
  > 这是Scene定义的一种表示频率的方式，它是指在 `max` 的基础上减去一个频率<br>
  > 例如 `-300Mhz`、`-0.3Ghz`、`-300000`<br>
  > 如果，小核最高频率为`1800Mhz`<br>
  > 那么 **`@cpu_freq` cpu0 -1200Mhz -300Mhz** 相当于 **`@cpu_freq` cpu0 600Mhz 1500Mhz**<br>
  > 如果，小核最高频率为`2000Mhz`<br>
  > 那么 **`@cpu_freq` cpu0 -1200Mhz -300Mhz** 相当于 **`@cpu_freq` cpu0 800Mhz 1700Mhz**
