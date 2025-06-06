## 场景
- SCENE认为每个应用都是一个场景，
- 允许针对不同应用类目或包名单独设置参数
- 举个例子：

```json
{
  "schemes": {
    "powersave": {
      "call": []
    }
  },
  "apps": [
    {
      "friendly": "即时通讯",
      "packagess": ["com.tencent.mm", "com.tencent.mobileqq"],
      "call": []
    },
    {
      "friendly": "所有APP",
      "packages": ["*"],
      "call": []
    }
  ],
  "games": [
    {
      "friendly": "原神",
      "packages": [
        "com.miHoYo.Yuanshen",
        "com.miHoYo.ys.mi"
      ],
      "call": []
    },
    {
      "friendly": "所有游戏",
      "packages": ["*"],
      "call": []
    }
  ]
}
```

> `packages`指定该场景会命中哪些应用(写的包名)<br>
> `friendly` 是一个备注属性，可用于改善配置可读性<br>
> 作为通配的 `["*"]` 应该永远放在最后一组！<br>
> Scene将应用分为应用和游戏两个大类，分别命中`"apps":[]`和`"games":[]`两组参数<br>

> SCENE判断应用是否为游戏的依据包括：<br>
>   横屏启动、包含Unity或UE3或UE4库、引入部分手机厂家的游戏服务，<br>
>   只要符合其中之一就当作游戏。当然，用户也可以自己更改应用所属分组


### 场景下的模式细分 `modes`
- 还没有结束，针对不同应用，还可以按不同模式进行配置
- 每个模式又可以分别配置`call`, `booster`, `sensors`, `limiters`
- 示例如下：

```json
{
  "friendly": "原神",
  "packages": [
    "com.miHoYo.Yuanshen",
    "com.miHoYo.ys.mi",
    "com.miHoYo.ys.bilibili",
    "com.miHoYo.GenshinImpact"
  ],
  "call": [],
  "sensors": [],
  "limiters": [],
  "modes": [
    {
      "mode": ["powersave", "balance"],
      "call": [],
      "booster": {
        "duration": 2000,
        "enter": [],
        "exit": []
      },
      "sensors": []
    }
  ]
}
```

- 在这里 `call` 会采用合并覆盖策略，而 `cpuset` `booster` `sensors` 则是子级配置直接覆盖富集配置


#### 模式通配
- 有时候，为每个应用设置4或5组不同的配置是无意义的，所以`mode`也像前面的`packages`一样用`*`来通配

```json
{
  "friendly": "原神",
  "packages": [
    "com.miHoYo.Yuanshen",
    "com.miHoYo.ys.mi",
    "com.miHoYo.ys.bilibili",
    "com.miHoYo.GenshinImpact"
  ],
  "modes": [
    {
      "mode": ["powersave", "balance"],
      "call": []
    },
    {
      "mode": ["*"],
      "call": []
    }
  ]
}
```

#### 类目
- 也可以通过应用分类`categories`而非包名`packages`来指定命中的应用
- 例如，我打算为聊天工具、小说阅读器做一组配置，就像这样：

```json
{
  "schemes": {},
  "apps": [
    {
      "friendly": "即时通讯、阅读",
      "categories": ["IM", "Reader"],
      "call": [
        ["@cpu_freq", "cpu7", "300000", "1500000"]
      ]
    },
    {
      "friendly": "所有APP",
      "packages": ["*"],
      "call": []
    }
  ]
}
```

- 关于应用会如何分类可参考 [类目](./categories.md) 中的详细介绍


#### 配置拆分
- 为了让`profile.json`不变的巨大
- Scene允许将对某个场景的配置拆分成独立文件
- 使用`"import": "文件名.json"`进行关联
- 例如

  ```json
  # profile.json
  {
    "schemes": {},
    "apps": [
      {
        "friendly": "所有APP",
        "packages": ["*"],
        `"import": "Apps.json"`
      }
    ]
  }

  # Apps.json
  {
    "call": [],
    "modes": [
      {
        "mode": ["powersave", "balance"],
        "call": []
      },
      {
        "mode": ["*"],
        "call": []
      }
    ]
  }
  ```

