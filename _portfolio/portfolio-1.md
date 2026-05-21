---
title: "GitHub Pages 个人主页"
excerpt: "本文介绍了Github Pages个人主页的文件夹构成<br/><img src='/images/project cover.png'>"
collection: portfolio

---

## 主要内容文件夹

|文件夹|用途|
|---|---|
|`_posts/`|**已发布的博客文章**，Jekyll 会自动按日期发布。目前有 5 篇示例文章|
|`_drafts/`|**草稿文章**，未正式发布，只有本地 `jekyll serve --drafts` 时才能预览|
|`_pages/`|独立页面（如 About、Resume 等）|
|`_portfolio/`|作品集/项目展示|
|`_publications/`|学术论文列表|
|`_talks/`|演讲/报告列表|
|`_teaching/`|教学经历|
|`_data/`|YAML 数据文件（导航菜单、作者信息等）|

## 模板和样式

|文件夹|用途|
|---|---|
|`_layouts/`|页面布局模板（文章页、首页等）|
|`_includes/`|可复用的 HTML 片段（导航栏、页脚等）|
|`_sass/`|SCSS 样式文件|
|`assets/`|静态资源（CSS、JS、图片等）|

## 其他

|文件夹|用途|
|---|---|
|`_site/`|Jekyll 构建输出目录（自动生成，不应提交到 git）|
|`images/`|博客中使用的图片|
|`files/`|可下载的文件（PDF、简历等）|
|`scripts/`|辅助脚本|
|`markdown_generator/`|从数据生成 Markdown 文件的工具|
|`talkmap/`|演讲地点地图的可视化|
|`.devcontainer/`|GitHub Codespaces 开发容器配置|
|`.github/`|GitHub Actions / issue 模板等|

## 关于 `_drafts/`

你的 `_drafts/` 目前有两个文件：

- **`post-draft.md`** — 一篇正式草稿文章
- **`2026-05-20-测试内容.md`** — 今天的测试内容（136 字节，基本是空的）

草稿和已发布文章的区别：`_posts/` 里的文件名必须带日期前缀（如 `2026-05-20-title.md`），Jekyll 会自动发布。`_drafts/` 里的文件不需要日期前缀，不会出现在正式网站上，方便你在本地预览和编辑后再移到 `_posts/` 发布。