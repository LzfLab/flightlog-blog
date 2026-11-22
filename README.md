# flightlog-blog

从 `AI飞行猿` 文档站中抽出的独立博客站点（VitePress），不包含 Python 代码。

## 本地运行

```bash
npm install
npm run docs:dev
```

默认地址：http://localhost:5173/

构建与预览：

```bash
npm run docs:build
npm run docs:preview
```

## 新增文章

1. 新建英文文章 `docs/en/blog/my-post.md`。
2. 新建中文文章 `docs/zh/blog/my-post.md`。
3. 在 `docs/.vitepress/config.mts` 的 `rootSidebar` 和 `zhSidebar` 中注册链接：
   `{ text: '文章标题', link: '/zh/blog/my-post' }`。
4. 可选：在 `docs/index.md` 和 `docs/zh/index.md` 的“全部文章”列表中添加链接。

URL 规则：

- 英文：`/blog/my-post/`
- 中文：`/zh/blog/my-post/`

## 部署

推送到 `main` 且改动 `docs/**` 时，`.github/workflows/deploy.yml` 会自动构建并发布到 `gh-pages` 分支。

- 仓库名不是 `<user>.github.io` 时，工作流会自动使用 `BASE_PATH=/<repo>/`。
- 如果是 `<user>.github.io` 仓库，请把工作流中的 `BASE_PATH` 改为 `/`。
- 仓库 Settings → Pages 中选择 `gh-pages` 分支作为发布源。

## 目录结构

```
docs/
├── .vitepress/        # 站点配置与主题
├── en/blog/           # 英文文章源文件（映射为 /blog/*）
├── zh/blog/           # 中文文章源文件
├── public/            # favicon 与 logo
├── index.md           # 英文首页
└── zh/index.md        # 中文首页
```

注意：`docs/blog/` 目录是 VitePress 的路由产物位置，不需要手动放入文章；英文源文件统一放在 `docs/en/blog/`，由 `rewrites` 映射为 `/blog/*`。
