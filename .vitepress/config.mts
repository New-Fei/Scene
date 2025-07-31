import { defineConfig } from 'vitepress'

export default defineConfig({
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
          { text: '0index', link: '/docs/0index' },
          { text: 'alias', link: '/docs/alias' },
          { text: 'apps', link: '/docs/apps' },
          { text: 'basic', link: '/docs/basic' },
          { text: 'booster', link: '/docs/booster' },
          { text: 'categories', link: '/docs/categories' },
          { text: 'conf', link: '/docs/conf' },
          { text: 'cpuset', link: '/docs/cpuset' },
          { text: 'cpuset_for_app', link: '/docs/cpuset_for_app' },
          { text: 'empty', link: '/docs/empty' },
          { text: 'fas', link: '/docs/fas' },
          { text: 'features', link: '/docs/features' },
          { text: 'limiter', link: '/docs/limiter' },
          { text: 'manifest', link: '/docs/manifest' },
          { text: 'others', link: '/docs/others' },
          { text: 'outdated', link: '/docs/outdated' },
          { text: 'presets', link: '/docs/presets' },
          { text: 'sensor', link: '/docs/sensor' }
        ]
      },
      {
        text: '更新日志',
        collapsed: false,
        items: [
          { text: 'Scene 6.0.0', link: '/logs/Scene_6.0.0' },
          { text: 'Scene 6.1.0', link: '/logs/Scene_6.1.0' },
          { text: 'Scene 6.2.1', link: '/logs/Scene_6.2.1' },
          { text: 'Scene 6.3.1', link: '/logs/Scene_6.3.1' },
          { text: 'Scene7', link: '/logs/Scene7.logs' },
          { text: 'Scene8', link: '/logs/Scene8.logs' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/helloklf/vtools' },
      { icon: 'qq', link: 'https://pd.qq.com/s/72l4ha1x9' },
      { icon: 'telegram', link: 'https://t.me/scene2023' }
    ],

    footer: {
      message: '<a href="https://beian.miit.gov.cn/">粤ICP备2022143387号-1</a>',
      copyright: 'Copyright © 2025 NewFei'
    }
  },

  sitemap: {
    hostname: 'https://scene.newfei.top'
  }

})
