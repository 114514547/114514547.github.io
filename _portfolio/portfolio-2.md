---
title: "GitHub Pages 个人主页简明教程——(2)"
excerpt: "本文介绍了一些基本元素的更改途径<br/><img src='/images/project cover.png'>"
collection: portfolio

---
这是一个基于 Jekyll + academicpages 主题的个人网站，你已经添加了自定义的玻璃拟态（glassmorphism）皮肤。下面是你要修改的各项对应的位置：

---

## 1. 修改动画、方框大小、透明度等

**主文件：[assets/css/modern-glass.css](vscode-webview://0c24j8du45jtdp5affa9h8af9jbt0hvh0sbnrmbnps2jl07hjede/assets/css/modern-glass.css)**

这是控制你所有玻璃拟态外观的核心文件，包含你要改的所有内容：

|你想改的|对应位置|具体说明|
|---|---|---|
|**玻璃透明度**|第 7-8 行 `:root` 变量|`--glass-bg: rgba(255,255,255,0.55)` — 最后一个数字 `0.55` 就是透明度，越小越透明|
|**毛玻璃模糊度**|第 11 行|`--glass-blur: 18px` — 控制 backdrop-filter 的模糊程度|
|**玻璃卡片圆角**|第 18 行|`--radius-lg: 16px` — 方框圆角大小，改成 `4px` 就更方|
|**卡片阴影**|第 10 行|`--glass-shadow` — 控制方框的投影深度|
|**浮动动画速度**|第 102 行 `.orb`|`animation: orbFloat 20s` — 背景光球的浮动速度|
|**Hero 卡片入场动画**|第 151 行 `.hero-card`|`animation: heroReveal 0.9s` — 修改秒数控制速度|
|**卡片悬停动画**|第 317-319 行 `.glass-card:hover`|`transform: translateY(-2px)` — 悬停时上移距离|
|**滚动揭示动画**|第 809-875 行 `.reveal` 系列|卡片入场动效的参数|
|**暗色模式透明度**|第 29-40 行 `html[data-theme="dark"]`|暗色模式下的对应变量|

---

## 2. 更换网页背景

**两个位置需要配合修改：**

1. **背景图片路径** — [_sass/layout/_base.scss](vscode-webview://0c24j8du45jtdp5affa9h8af9jbt0hvh0sbnrmbnps2jl07hjede/_sass/layout/_base.scss) 第 14 行：
    
    ```scss
    background-image: url("/images/bg.png");
    ```
    
    把 `bg.png` 替换成你的新图片，新图片放到 `images/` 目录下即可。
    
2. **背景渐变叠加层** — [assets/css/modern-glass.css](vscode-webview://0c24j8du45jtdp5affa9h8af9jbt0hvh0sbnrmbnps2jl07hjede/assets/css/modern-glass.css) 第 50-61 行（`body::before`），控制背景上的彩色渐变叠加，可以调整颜色或透明度。
    

如果你想用纯色背景而不是图片，直接删除 `_base.scss` 中第 14 行 `background-image` 那一行，然后在 `_base.scss` 或 `modern-glass.css` 的 `body` 中设置 `background-color`。

---

## 3. 发布新项目

**两个目录，取决于你要发布什么类型的内容：**

|内容类型|目录|操作|
|---|---|---|
|**项目/作品展示**|[_portfolio/](vscode-webview://0c24j8du45jtdp5affa9h8af9jbt0hvh0sbnrmbnps2jl07hjede/_portfolio/)|在这个目录新建 `.md` 或 `.html` 文件，参考已有的 `portfolio-2.html`|
|**博客文章**|[_posts/](vscode-webview://0c24j8du45jtdp5affa9h8af9jbt0hvh0sbnrmbnps2jl07hjede/_posts/)|新建 `YYYY-MM-DD-标题.md` 格式的文件，参考已有的 post 文件|

新建文件后，推送到 GitHub 的 `master` 分支，GitHub Pages 会自动部署。

---

### 总结速查表

```
想修改什么 → 打开哪个文件
──────────────────────────
动画/透明度/圆角/阴影 → assets/css/modern-glass.css (CSS变量区 第6-27行)
背景图片              → _sass/layout/_base.scss (第14行)
背景渐变颜色          → assets/css/modern-glass.css (第50-61行)
网站标题/作者信息     → _config.yml
首页内容              → _pages/about.md
发布新项目            → _portfolio/ 目录
发布新文章            → _posts/ 目录
```
