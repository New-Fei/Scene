import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/Scene/',
  title: "Scene",
  description: "安卓玩机工具箱",
  themeConfig: {
    logo: '/Scene.svg',

    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/docs/0index' },
      { text: '更新日志', link: '/logs/Scene7.logs' },
      { text: '官网', link: 'http://www.vtools.online/' }
    ],

    outlineTitle: '页面导航',
    outline: [2, 3],
    sidebar: [
      {
        text: '文档',
        collapsed: false,
        items: [
          { text: '介绍', link: '/docs/0index' },
          { text: '空配置', link: '/docs/empty' },
          { text: '基础', link: '/docs/basic' },
          { text: '场景', link: '/docs/apps' },
          { text: '类目', link: '/docs/categories' },
          { text: '传感器', link: '/docs/sensor' },
          { text: 'CPUSET', link: '/docs/cpuset' },
          { text: 'CPUSET for App', link: '/docs/cpuset_for_app' },
          { text: '触摸升频', link: '/docs/booster' },
          { text: '预设', link: '/docs/presets' },
          { text: '别名', link: '/docs/alias' },
          { text: '特性', link: '/docs/features' },
          { text: '描述', link: '/docs/manifest' },
          { text: '温控', link: '/docs/tas' },
          { text: 'FAS', link: '/docs/fas' },
          { text: '辅助调速器', link: '/docs/limiter' },
          { text: '过时的函数', link: '/docs/outdated' },
          { text: '其它', link: '/docs/others' }
        ]
      },
      {
        text: '更新日志',
        collapsed: false,
        items: [
          { text: 'Scene7', link: '/logs/Scene7.logs' },
          { text: 'Scene8', link: '/logs/Scene8.logs' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/helloklf/vtools' },
      { icon: 'qq', link: 'https://pd.qq.com/s/72l4ha1x9' },
      { icon: 'telegram', link: 'https://t.me/scene2023' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    footer: {
      message: '<a href="https://beian.miit.gov.cn/">粤ICP备2022143387号-1</a>',
      copyright: 'Copyright © 2025 NewFei'
    }
  },

  sitemap: {
    hostname: 'https://scene.newfei.top'
  }

})
