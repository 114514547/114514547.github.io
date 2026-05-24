---
layout: single
title: "更新日志"
permalink: /changelog/
author_profile: false
comments: false
---

{% include base_path %}

## v0.5 — 2026.05.23
**Metro 风格覆盖列表页**

- 文章、项目、出版物、演讲、教学等列表页在磁贴主题下改为 2 列网格布局
- 列表条目以 Metro 磁贴卡片形式展示，带交错进入动画
- 文章详情页采用 Metro 排版风格
- 移动端自动回退为单列布局

---

## v0.4 — 2026.05.23
**Metro 磁贴主题 & 双主题切换**

- 新增 Windows Metro / Fluent 风格主题，包含完整的 Dashboard 首页布局
- 导航栏添加主题切换按钮（毛玻璃 ↔ 磁贴），支持过渡动画
- 首页新增 Metro Dashboard：侧边栏导航、统计磁贴、日历、标签云、时间线
- 主题偏好通过 localStorage 持久化，刷新不丢失

---

## v0.3 — 2026.05.23
**教程系列上线**

- 发布「从零搭建学术主页」系列教程，共 7 章
- 涵盖：项目结构、Jekyll 核心、学术集合、数据与页面、样式与资源、工具函数、新手清单
- 所有教程归类为 Teaching，统一标签：`Academic pages` `GitHub Pages` `Jekyll`

---

## v0.2 — 2026.05.23
**毛玻璃导航栏 & 深色模式修复**

- 导航栏改为毛玻璃效果（半透明白色背景 + 模糊 + 圆角）
- 修复深色模式下表格表头白色背景导致的可读性问题
- 修复 `.greedy-nav` 背景色遮挡毛玻璃效果的问题

---

## v0.1 — 2026.05.23
**项目初始化**

- 基于 Academic Pages 模板搭建 Jekyll 学术个人主页
- 引入现代毛玻璃（Glassmorphism）主题样式
- 完成首页基本布局：关于我、最新文章、导航卡片
- 配置 GitHub Pages 部署
