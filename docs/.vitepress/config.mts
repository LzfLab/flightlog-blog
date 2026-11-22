import { defineConfig } from 'vitepress'

const currentYear = new Date().getFullYear()

const rootNav = [
  { text: 'Home', link: '/' },
  { text: 'Blog', link: '/blog/match' },
]

const rootSidebar = {
  '/blog/': [
    {
      text: 'Blog',
      items: [
        { text: 'Matching Models Guide', link: '/blog/match' },
        { text: 'Ranking Models Guide', link: '/blog/rank' },
        { text: 'HLLM Reproduction', link: '/blog/hllm_reproduction' },
        { text: 'HSTU Reproduction', link: '/blog/hstu_reproduction' },
        { text: 'TIGER Reproduction', link: '/blog/tiger_reproduction' },
        { text: 'Physical Cores and vCPUs', link: '/blog/physical-cores-vcpus' },
        { text: 'Available Capacity Calculation', link: '/blog/method-for-available-capacity' },
      ],
    },
  ],
}

const zhNav = [
  { text: '首页', link: '/zh/' },
  { text: '博客', link: '/zh/blog/match' },
]

const zhSidebar = {
  '/zh/blog/': [
    {
      text: '博客',
      items: [
        { text: '召回模型训练指南', link: '/zh/blog/match' },
        { text: '排序模型训练指南', link: '/zh/blog/rank' },
        { text: 'HLLM 复现说明', link: '/zh/blog/hllm_reproduction' },
        { text: 'HSTU 复现说明', link: '/zh/blog/hstu_reproduction' },
        { text: 'TIGER 复现说明', link: '/zh/blog/tiger_reproduction' },
        { text: '物理核和 vCPU 的关系', link: '/zh/blog/physical-cores-vcpus' },
        { text: '可得容量计算方法', link: '/zh/blog/method-for-available-capacity' },
      ],
    },
  ],
}

export default defineConfig({
  title: 'AI飞行猿 Blog',
  description: 'Blog posts for the AI飞行猿 recommendation framework.',
  base: process.env.BASE_PATH || '/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#0f766e' }],
  ],
  markdown: {
    math: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
  rewrites: {
    'en/:rest*': ':rest*',
  },
  themeConfig: {
    logo: '/img/logo.png',
    search: { provider: 'local' },
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/datawhalechina/torch-rechub' },
      { icon: 'github', link: 'https://github.com/LzfLab' },
    ],
    outline: {
      level: [2, 3],
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: rootNav,
        sidebar: rootSidebar,
        outlineTitle: 'On this page',
        returnToTopLabel: 'Back to top',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        sidebarMenuLabel: 'Menu',
        docFooter: {
          prev: 'Previous page',
          next: 'Next page',
        },
        footer: {
          message: 'Notes on recommender systems.',
          copyright: `Copyright © ${currentYear} AI飞行猿`,
        },
      },
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        outlineTitle: '本页目录',
        returnToTopLabel: '返回顶部',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        docFooter: {
          prev: '上一页',
          next: '下一页',
        },
        footer: {
          message: '推荐系统实践笔记',
          copyright: `Copyright © ${currentYear} AI飞行猿`,
        },
      },
    },
  },
})
