---
title: "Git 多端同步翻车实录：Obsidian 核心配置冲突与 Termux 人工消解指南"
description: "记录多设备同步时 Obsidian 内部配置 .obsidian/community-plugins.json 发生严重 Git 冲突的排查全过程，探讨 GUI 删文件无法解冲突的底层机制，并给出多端知识库的版本控制边界治理方案。"
date: 2026-10-10T20:10:00.000+08:00
preview: ""
tags: ["Obsidian", "Git", "版本控制", "Termux", "冲突解决"]
categories: ["学习记录"]
---

# Git 多端同步翻车实录：Obsidian 核心配置冲突与 Termux 人工消解指南

在使用 Git 管理多端同步的 Obsidian 笔记库时，绝大多数用户最初都会顺理成章地把整个文件夹（包括隐藏的 `.obsidian` 配置目录）完整推送到 GitHub。这种做法在单台电脑上运行顺畅，但一旦引入了第二台设备——比如在 PC 主力机和 Android 平板/手机之间双向同步时，一场关于“配置文件冲突”的灾难就只是时间问题了。

最近我就遭遇了这样一次典型的“翻车”：移动端 Obsidian 在同步时弹出了血红色的错误提示，仓库根目录下自动生成了一份 `conflict-files-obsidian-git.md`，并在里面赫然写着：

```text
# Conflicts
Please resolve them and commit them using the commands `Git: Commit all changes` followed by `Git: Push`
- Not a file: .obsidian/community-plugins.json
```

我下意识地在手机文件管理器里把这个报错的 `community-plugins.json` 删掉，心想“删了让它从 GitHub 重新 pull 一份不就好了？”结果再次点击 Pull 时，弹出了更让人绝望的报错：

```text
Modifying the index is not possible because you have unmerged files: function toString(){ [native code] }. 
Fix them up in the work tree, and then use 'git add/rm' as appropriate to mark resolution and make a commit.
```

为什么在图形界面里删除了冲突文件，Git 反而更愤怒了？这篇文章记录了我在 Android Termux 下抽丝剥茧排查并消解这次冲突的过程，以及对 Obsidian 多端版本控制边界的深度复盘。

---

## 一、迷思破除：为什么“删掉文件再 Pull”行不通？

许多初接触 Git 的人都有一个直觉误区：**把冲突的文件直接删掉，Git 就会自动用远端覆盖本地。**

但在 Git 的内部状态机中，这完全行不通：

```text
本地分支提交变动 ──┐
                  ├──> Git 检测到同一个文件被两端修改 ──> 进入 Unmerged 状态（锁死 Index）
远端分支提交变动 ──┘
```

当 Git 发生合并冲突（Merge Conflict）时，它会在暂存区（Index）中为该文件创建三个不同的版本标记（基础祖先版本、本地版本、远端版本），此时暂存区被打上了 **`unmerged`（未合并）** 标记。

在这个状态下，Git 会**封锁任何索引修改操作**（也就是报错里所说的 `Modifying the index is not possible because you have unmerged files`）。你在工作区物理删除了文件，工作区虽然空了，但 Git 索引数据库里依然牢牢记着“这个文件处于冲突未决状态”。

Git 要求的规则非常严谨：**必须由人类或者工具明确告诉它“冲突已经按某种方式解决”，并执行 `git add` 或 `git rm` 来解除 unmerged 状态，最后生成一个合并提交（Merge Commit）。**

---

## 二、Termux 深入一线：还原冲突事故现场

因为 Obsidian 的移动端插件在面对复杂的未决合并状态时往往无能为力，必须切入 Termux 命令行查看最真实的底层数据：

```bash
cd /storage/emulated/0/obsidian/My-hub
git status
```

终端输出了触目惊心但极其关键的信息：

```text
On branch main
Your branch and 'origin/main' have diverged,
and have 5 and 15 different commits each, respectively.
  (use "git pull" if you want to integrate the remote branch with yours)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
    both modified:   .obsidian/community-plugins.json
```

### 1. 分支严重发散（Diverged）
本地领先了 5 个 commit（在手机上断断续续写的日记和临时备忘），而远端领先了 15 个 commit（在电脑主力机上的大规模重构）。两边都在各自前进，且没有及时 fast-forward 合并。

### 2. 罪魁祸首：`both modified`
两端同时修改了 `.obsidian/community-plugins.json`。通过 `cat` 检查文件内容，真相大白：

* **安卓移动端启用的插件列表**（移动端只需极简编辑）：
  ```json
  [
    "obsidian-git"
  ]
  ```
* **PC 桌面端启用的插件列表**（电脑端全套重型工作流）：
  ```json
  [
    "obsidian-git",
    "calendar",
    "obsidian-style-settings",
    "obsidian-custom-attachment-location",
    "templater-obsidian",
    "lazy-plugins",
    "dataview",
    "periodic-notes",
    "android-nomedia",
    "heatmap-tracker",
    "obsidian-meta-bind-plugin"
  ]
  ```

电脑端安装并激活了十几个重型分析插件，而移动端为了启动速度和内存开销，只启用了最基础的 `obsidian-git`。当两边的配置都被提交进同一个 Git 分支时，Git 无法凭空猜出到底应该采用哪个列表，冲突不可避免地爆发了。

---

## 三、人工手术：4 步消解冲突并恢复分支

在 Termux 中，手动解决冲突的流程非常清晰、严丝合缝：

### 步骤 1：决定最终配置并写回文件
既然电脑是主力生产力工具，我们显然希望保留完整的插件列表配置（移动端在加载时如果找不到桌面专有插件，通常只会默默忽略，不会损坏数据）。

在 Termux 中使用 `nano` 编辑该文件：

```bash
nano .obsidian/community-plugins.json
```

将内容统一为完整的插件列表 JSON，保存并退出（在 nano 中按 `Ctrl + O` 保存，`Ctrl + X` 退出）。

### 步骤 2：使用 `git add` 标记冲突已解决
这是最关键的一步！执行：

```bash
git add .obsidian/community-plugins.json
```

在 Git 中，对冲突文件执行 `git add` 的含义就是向 Git 声明：**“我已经人工确认并处理完这个文件的内容，请将它从未合并状态中解除。”**

此时再次运行 `git status`，你会发现原本刺眼的 `Unmerged paths` 已经彻底消失！

### 步骤 3：清理插件生成的辅助冲突文件
Obsidian-git 插件在冲突时生成的提示文件已无保留必要，将其从版本库和磁盘清理：

```bash
git rm conflict-files-obsidian-git.md
```

### 步骤 4：生成合并提交并推送
现在所有冲突项已完全解决，暂存区处于正常的等待提交状态：

```bash
git commit -m "fix(sync): resolve community-plugins.json conflict between mobile and desktop"
git push origin main
```

推送成功后，分支发散（5 commits vs 15 commits）正式平滑合并为一个统一的节点，整个 Git 历史重归平整。

---

## 四、深层架构反思：知识库的版本控制边界

这次事故解决后，我开始反思一个更本质的命题：**我们真的应该把 `.obsidian` 目录全盘放进 Git 吗？**

Obsidian 的知识库目录结构实际上可以划分为两个世界：

```text
My-hub/
├── 知识内容层 (Content)
│   ├── 日记/
│   ├── 读书笔记/
│   └── 附件图片/
└── 设备环境层 (Configuration)
    └── .obsidian/
        ├── workspace.json       <── 窗口布局与当前打开标签（每台机器必然不同）
        ├── app.json             <── 基础设置
        ├── community-plugins.json <── 激活插件列表（移动端与PC算力不同）
        └── plugins/             <── 插件主程序与缓存
```

### 1. 冲突的根源：环境状态与知识内容的混淆
* **笔记内容（.md）** 是跨端共享的真理之源（Source of Truth）。
* **工作台状态（`workspace.json` 等）** 是与单台物理设备强相关的临时状态。你在手机上打开的是日记，在电脑上打开的是大纲，强制同步 `workspace.json` 只会导致两边互相打架。

### 2. 推荐的 `.gitignore` 边界设计方案

如果你的不同设备性能、屏幕尺寸差异巨大，推荐在知识库根目录的 `.gitignore` 中采取“差异化忽略策略”：

```gitignore
# ==========================================
# 必须忽略：与单设备强相关的临时状态
# ==========================================
.obsidian/workspace.json
.obsidian/workspace-mobile.json
.obsidian/cache/
.obsidian/graph.json

# ==========================================
# 可选策略：若双端插件极度不一致，忽略插件激活列表
# ==========================================
# .obsidian/community-plugins.json

# ==========================================
# 必须忽略：移动端系统标记与大附件缓存
# ==========================================
**/.nomedia
.trash/
```

如果选择继续同步 `community-plugins.json`，则必须在心里建立意识：**在一端安装新插件后，另一端必须先执行拉取再使用，避免离线双向改动配置。**

---

## 五、结语

工具越是自动化，底层原理就越值得被理解。Obsidian Git 插件为我们屏蔽了日常敲命令的繁琐，但在多端协同的网络拓扑和版本分叉面前，它终究只是一层包装。

当错误发生时，不用慌张，也不要盲目删改。打开 Termux，看一眼 `git status`，看清楚哪一个文件在冲突，用规范的 `git add` 宣告主权，你的个人知识库依然是坚不可摧的数字花园。
