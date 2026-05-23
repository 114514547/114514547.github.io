---
title: "从零搭建学术主页(3)：Academic Pages 专属内容目录"
description: "从零搭建学术主页（3）"
date: 2026-05-23T08:02:00.000Z
preview: ""
tags: ["Academic pages", "GitHub Pages", "Jekyll"]
categories: ["teaching"]
---

前面讲了 Jekyll 的基础三件套。这一章讲 Academic Pages 区别于普通 Jekyll 博客的核心——四个学术内容集合（collection）。它们的工作方式和 `_posts/` 类似，但各有自己的字段和用途。

## 3.1 `_publications/` — 论文

每篇论文一个 `.md` 文件，文件名格式和 `_posts/` 一样带日期前缀。

### 文件结构

```yaml
---
title: "Paper Title Number 5, with math $$E=mc^2$$"
collection: publications          # 固定写 publications
category: conferences             # 分类: manuscripts, conferences, books
permalink: /publication/2024-02-17-paper-title-number-4
excerpt: '简短描述，支持 MathJax 公式'
date: 2024-02-17
venue: 'GitHub Journal of Bugs'   # 发表刊物/会议
paperurl: 'https://example.com/files/paper3.pdf'  # 论文 PDF 链接
citation: 'Your Name. (2024). "Paper Title." <i>Journal</i>. 1(3).'  # 引用格式
---

论文的详细描述，可以用 Markdown 写。
```

### 关键点

- `collection: publications` 是必须的，告诉 Jekyll 这属于论文集合
- `category` 决定在论文列表页的分类标题下显示。可选值在 `_config.yml` 的 `publication_category:` 里定义，默认有 `books`、`manuscripts`、`conferences` 三种
- `paperurl` 会自动生成"Download Paper"链接，文件放到 `files/` 目录
- 如果你有大量论文要导入，可以用 `markdown_generator/` 批量生成（后面会讲）

### 分类配置

在 `_config.yml` 里可以自定义分类名称：

```yaml
publication_category:
  books:
    title: 'Books'
  manuscripts:
    title: 'Journal Articles'
  conferences:
    title: 'Conference Papers'
```

---

## 3.2 `_talks/` — 学术报告

和论文类似，但多了地点信息。

```yaml
---
title: "Conference Proceeding talk 3"
collection: talks                # 固定写 talks
type: "Conference proceedings talk"
permalink: /talks/2014-03-01-talk-3
venue: "Testing Institute of America 2014 Annual Conference"
date: 2014-03-01
location: "Los Angeles, CA, USA"  # 演讲地点，论文没有这个字段
---

演讲内容描述。
```

### 演讲地图

Academic Pages 自带一个演讲地点可视化功能（基于 Leaflet.js）。如果你在 `_config.yml` 里把 `talkmap_link` 设为 `true`，演讲列表页会显示一个"查看地图"的链接，把所有演讲地点标在世界地图上。

相关文件在 `talkmap/` 目录和 `talkmap.py` 脚本，用来从演讲数据生成地图。

---

## 3.3 `_portfolio/` — 作品集

展示你的项目、实验或开源作品。

```yaml
---
title: "我的项目名"
excerpt: "项目简介，会显示在列表页"
collection: portfolio            # 固定写 portfolio
---

项目详情，支持完整的 Markdown（标题、列表、代码块、图片等）。
```

### 和论文/演讲的区别

- portfolio 的 frontmatter 更简单，没有 `venue`、`citation` 等学术字段
- 支持 `header.teaser` 和 `header.overlay_image` 设置封面图（详见教程第2篇封面设置）
- `_pages/portfolio.html` 负责渲染列表页，默认用网格布局展示

---

## 3.4 `_teaching/` — 教学经历

```yaml
---
title: "Teaching experience 2"
collection: teaching             # 固定写 teaching
type: "Workshop"                 # 课程类型
permalink: /teaching/2015-spring-teaching-1
venue: "University 1, Department"
date: 2015-01-01
location: "City, Country"
---

教学经历描述。
```

### 在简历中自动展示

`_pages/cv.md`（简历页）里有一段 Liquid 代码会自动遍历所有教学经历：

```liquid
<ul>{% for post in site.teaching reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>
```

所以你只需要往 `_teaching/` 里加文件，简历页就会自动更新。论文和演讲也是一样的机制。

---

## 四个集合的对比

| 目录 | `collection` 值 | 特有字段 | 主要用途 |
|---|---|---|---|
| `_publications/` | `publications` | `category`, `venue`, `citation`, `paperurl` | 论文列表 |
| `_talks/` | `talks` | `type`, `venue`, `location` | 演讲/报告 |
| `_portfolio/` | `portfolio` | `excerpt` | 项目展示 |
| `_teaching/` | `teaching` | `type`, `venue`, `location` | 教学经历 |

它们都在 `_config.yml` 的 `collections:` 段声明，并且都设了 `output: true`（意味着每个条目会生成独立的页面）和 `permalink: /:collection/:path/`（URL 格式为 `/publications/文件名/`）。

## 默认行为

`_config.yml` 的 `defaults:` 段给每个集合设了默认值。比如论文和教学的默认布局是 `single`，演讲用的是专用的 `talk` 布局。这些默认值意味着你写条目时不需要在 frontmatter 里重复写 `layout`。

---

下一章讲 `_data/`、`_pages/`、`_includes/`——它们是驱动网站导航、独立页面和组件复用的关键。
