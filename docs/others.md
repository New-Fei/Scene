## 其它函数
- 在Scene自己的配置中，有时会出现一些文档[主要功能]中未提及的函数
- 其它一般是某种常用操作的聚合体，在此可稍作了解


### `@msm_reset` `@mtk_reset`
- 这两个函数常用作切换模式时执行的第一个操作，
- 前者是重置`msm_performance`
- 后者是重置`cpufreq_debug`
- 目的都是避免某些`boost`导致通过`cpufreq`无法修改频率


### `@thermal_threshold`
- 这个函数用于修改CPU/GPU核心温度墙
- 常用于骁龙(845及以上)、天玑(1100及以上)旗舰处理器
- 合理范围为为95°C ~ 100°C，即数值 `95000` ~ `100000`
- 超过此范围可能不生效或出现预料之外的bug

### `@mtk_renew`
- 由于天玑8100/9000等新天玑处理器修改了某些参数后，
- 会导致PowerHAL因无法成功写入参数而无限重试和报错，这可能会增加待机功耗
- 因此建议在`standby`时调用`@mtk_renew`，重置相关参数的权限和所有者，让PowerHAL可以成功写入参数


### `@sched_limit`
- 适用于`schedutil` `sugov_ext` `walt` 等调速器修改
- `down_rate_limit_us` 和 `up_rate_limit_us`

```json
// 原始写法
{
  "call": [
    ["/sys/devices/system/cpu/cpufreq/policy0/schedutil/down_rate_limit_us", "0"],
    ["/sys/devices/system/cpu/cpufreq/policy0/schedutil/up_rate_limit_us", "1000"],
    ["/sys/devices/system/cpu/cpufreq/policy4/schedutil/down_rate_limit_us", "0"],
    ["/sys/devices/system/cpu/cpufreq/policy4/schedutil/up_rate_limit_us", "3000"],
    ["/sys/devices/system/cpu/cpufreq/policy7/schedutil/down_rate_limit_us", "0"],
    ["/sys/devices/system/cpu/cpufreq/policy7/schedutil/up_rate_limit_us", "2000"]
  ]
}

// 等效写法
{
  "call": [
    ["@sched_limit", "0 1000", "0 3000", "0 2000"]
  ]
}
```


### `@msm_feas` `@mtk_feas`
- 使用指定参数尝试开启小米的FEAS(如果支持)
- 如果开启成功，会自动清掉`@limiters`指定的辅助调速器
- 用法如 ["@msm_feas", "MIN_FREQ_INDEX", "MAX_FREQ_INDEX"]
- FREQ_INDEX 指定频率索引范围(0~N)，值越小频率越高，N的最大值取决于内核模块中的定义

### Utilization Clamping @uclamp
- uclamp作为schedtune的替代方案，在Linux Kernel中引入
- 因此，并非所有设备都能使用该特性
- @uclamp具有至多3个参数，用法非常简单
- 例如：
```json
["@uclamp", "0.00~max", "0.00~max", "0.00~max"]
```
- 3个参数分别对应cpuctl中background、foreground、top-app的cpu.uclamp.min和cpu.uclamp.max，两个值之间以 ~ 符号分隔

### 
- 使用@governor可以切换CPU调速器
- 允许指定两个或更多值，实现调速器优选（仅限Scene7.0+）
```js
// 指定单个调速器
["@governor", "shchedutil"]
// 如果设备支持walt则用walt，不支持则用用shchedutil
["@governor", "walt", "shchedutil"]
```
