---
title: "本地 AI 反代进阶：从 gcli2api 凭证桥接到 Termux 常驻与 503 算力耗尽排查"
description: "延续 API 网关的学习实践，记录将 Gemini CLI/Antigravity 凭据接入移动端 Termux 并常驻运行 gcli2api 的全过程，深度剖析 curl 调试中捕获的 503 MODEL_CAPACITY_EXHAUSTED 与 404 模型路由本质。"
date: 2026-10-10T20:40:00.000+08:00
preview: ""
tags: ["AI", "反向代理", "Termux", "API", "Gemini", "故障排查"]
categories: ["学习记录"]
---

# 本地 AI 反代进阶：从 gcli2api 凭证桥接到 Termux 常驻与 503 算力耗尽排查

在之前的文章《从端口冲突到理解 API 网关》中，我梳理了客户端、本地反代、端口监听与上游模型供应商之间的调用拓扑。在那之后，随着使用场景的延伸，我产生了一个更极致的想法：**能不能脱离沉重的 PC，把 AI 反向代理服务直接搬到 Android 平板（Termux）上后台常驻运行，让平板上的 Chatbox 或第三方客户端随时随地调用大模型？**

在实践中，我成功借助 `gcli2api` 实现了基于 OAuth 凭证的本地接口转换，并通过 PM2 实现了移动端常驻。但在此期间，我也遇到了一个极其离奇的故障：
* 同一条反代链路下，调用 **Claude 系列模型** 和 **`gemini-2.5-flash`** 秒级响应、顺畅无比；
* 但只要切换到 **`gemini-2.5-pro`**，客户端立刻抛出错误断开；测试 **`gemini-3.1-pro-preview`** 时甚至直接返回 404。

很多人遇到这种问题的第一反应往往是“我的 Key 是不是被封了？”或者“账号额度是不是用完了？”。但通过用 `curl` 抓取最原始的 HTTP 响应报文，真相彻底颠覆了我的直觉。

---

## 一、进阶拓扑：把反代网关搬进安卓移动端

常规的本地反代依赖 PC 电脑开机，而通过在 Android 系统的 Termux 中部署 Node.js 环境与 `gcli2api`，我们可以组装出一套完全便携的“移动 AI 网关”：

```text
┌────────────────────────────────────────────────────────┐
│  Android 平板设备内部                                  │
│                                                        │
│  [客户端前端] Chatbox / 写作软件                        │
│       │                                                │
│       ▼ HTTP (http://127.0.0.1:7861/antigravity/v1)    │
│  [本地中间件] gcli2api 服务 (由 PM2 守护常驻进程)       │
│       │                                                │
│       │ 转换 OpenAI 兼容请求为 Google 内部调用格式     │
│       │ 挂载本地 OAuth 认证令牌 (Bearer Token)         │
│       ▼ HTTPS                                          │
└───────┼────────────────────────────────────────────────┘
        │
        ▼ (公网请求)
   Google Cloud Code / Antigravity 上游基础设施
```

### 1. 环境变量与 PM2 守护配置
为了避免每次打开 Termux 都要重复输入长串命令，在 `~/.bashrc` 中将反代服务的关键配置固化：

```bash
export API_PASSWORD='your_strong_password'
export PANEL_PASSWORD='your_panel_password'
export HOST='127.0.0.1'
export PORT='7861'
```

借助进程管理工具 `pm2` 实现后台平稳守护：

```bash
# 启动反代服务
pm2 start termux-start.sh --name gcli2api

# 检查运行状态
pm2 status
```

看到 `gcli2api` 的状态稳稳呈现为 `online`，且监听在 `127.0.0.1:7861`，说明移动端本地网关已经搭建就绪。

---

## 二、迷雾重重：为什么 Claude 丝滑，Gemini Pro 却扑街？

配置好 Chatbox 的自定义 Provider 接口后，我进行了一轮对比实测：

* 测试 `claude-sonnet-4-6`：长篇剧情推进、改稿，流畅生成，毫无卡顿；
* 测试 `gemini-2.5-flash`：日常问答毫秒级返回，输出极其稳定；
* **测试 `gemini-2.5-pro`**：输入后等待数秒，直接弹窗报错；
* **测试 `gemini-3.1-pro-preview`**：直接报错找不到模型。

在同一个反代进程中、使用完全相同的认证密码和相同的 Base URL，为什么不同模型的表现会有天壤之别？

---

## 三、精准捉虫：用 `curl` 剥开 HTTP 原始报文

为了排除客户端 UI 的干扰，最专业的手段是在 Termux 终端直接用 `curl` 向本地反代发送标准的 JSON 报文进行单点排查。

### 测试用例 1：测试 `gemini-2.5-flash`
```bash
curl -X POST "http://127.0.0.1:7861/antigravity/v1/chat/completions" \
  -H "Authorization: Bearer your_strong_password" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-2.5-flash",
    "messages": [{"role": "user", "content": "只回复OK"}],
    "stream": false
  }'
```
**回显结果**：立即返回 `HTTP 200`，带回标准的 JSON 响应体，内容为 `"OK"`。
👉 **证明**：Termux 端口监听正常、gcli2api 认证通过、网络通道畅通无阻。

---

### 测试用例 2：测试 `gemini-2.5-pro`
将模型参数改为 `"model": "gemini-2.5-pro"` 再次发起请求，终端输出了极其硬核的错误报文：

```json
{
  "error": {
    "code": 503,
    "message": "No capacity available for model gemini-2.5-pro on the server",
    "status": "UNAVAILABLE",
    "details": [
      {
        "@type": "type.googleapis.com/google.rpc.ErrorInfo",
        "reason": "MODEL_CAPACITY_EXHAUSTED",
        "domain": "cloudcode-pa.googleapis.com"
      }
    ]
  }
}
```

这是一份价值连城的证据！我们来逐字拆解它的含义：
* `code: 503` 与 `status: UNAVAILABLE`：HTTP 503 明确代表**服务暂时不可用**；
* `domain: cloudcode-pa.googleapis.com`：错误直接来自于 Google 的 Cloud Code 基础设施层；
* **`reason: MODEL_CAPACITY_EXHAUSTED`**：服务器端**模型算力容量耗尽**！

---

### 测试用例 3：测试 `gemini-3.1-pro-preview`
将模型参数换成最新的预览版模型：

```json
{
  "error": {
    "code": 404,
    "message": "Requested entity was not found."
  }
}
```

**回显结果**：`HTTP 404 NOT_FOUND`。

---

## 四、核心认知升级：额度超限 vs 算力耗尽 vs 路由不存在

通过这份实测结果，我们必须在脑海中建立起对 AI API 状态码的全新认知体系：

| 错误现象 | 真实根因分类 | 典型表现与含义 | 处置策略 |
|---|---|---|---|
| **429 Too Many Requests** | **个人配额耗尽** (User Quota Exhausted) | 你账号当前的 RPM（每分钟请求数）或每日免费额度用完了。 | 等待下一周期刷新，或充值升级配额。 |
| **503 MODEL_CAPACITY_EXHAUSTED** | **上游服务器算力耗尽** (Server Capacity Exhausted) | **与你的账号无关！** 你的账号权限和额度完全充足，纯粹是 Google 该机房当前分配给该模型的 GPU 算力集群被打满了。 | 降级使用轻量模型（Flash），或配置重试退避机制。 |
| **404 NOT_FOUND** | **模型端点未开放/未映射** (Route Not Found) | 该反代通道或该 OAuth 凭据对应的上游版本池中，压根没有挂载此模型 ID。 | 核对官方支持的模型标识，移除不存在的候选。 |

### 为什么官方客户端能用，反代却报 503？
一个常见的疑问是：“为什么我在 Antigravity 原生应用里有时能用 Gemini，而 gcli2api 反代会报 503？”

这是因为官方应用在后台接入了 Google 内部动态调度的多组节点，当主节点负载过高时可能会在内部做静默降级或换池处理；而第三方开源反代工具（如 gcli2api）通常是复刻了某一组固定的内部 RPC/HTTP 调用端点。当大量第三方调用同时涌入这一条通道时，就极易撞上该特定节点的 `MODEL_CAPACITY_EXHAUSTED` 阈值。

---

## 五、工程落地：如何构建高可用的多模型避障体系

既然算力挤兑和容量波动是分布式大模型服务的客观常态，我们在配置日常写作与开发工具时，就不能把鸡蛋放在同一个篮子里：

### 1. 梯队式模型配置策略
在客户端中不要只配置单一模型，而是建立清晰的阶梯：
* **第一梯队（日常主力）**：配置高智力、通道稳定的主力模型（如通过反代调用的 Claude 系列）；
* **第二梯队（快速响应与保底）**：配置 `gemini-2.5-flash`。它的算力池极为充沛，极少出现 503，适合处理代码补全、格式提取等快速任务；
* **第三梯队（深度分析）**：保留 `gemini-2.5-pro`，但在心中明确它可能存在容量挤兑。一旦遇到 503，立刻优雅降级，而不是盲目重试。

### 2. 避免盲目归咎与无效重试
当客户端提示请求失败时：
* 如果是 `429`，连续狂点重试只会让封禁时间变长；
* 如果是 `503`，短时间内疯狂重试往往徒劳无功，因为机房容量需要时间恢复；
* 打开 Termux 查看 PM2 日志（`pm2 logs gcli2api`），永远是定位问题的最快路径。

---

## 六、总结

从最初被一个抽象的“请求失败”弹窗搞得焦头烂额，到能够熟练运用 `curl` 捕获底层错误码，拆解 `cloudcode-pa.googleapis.com` 的响应体，这一步迈出的是从“工具使用者”到“系统理解者”的巨大跨越。

大语言模型不是虚无缥缈的魔法，它背后依然是成千上万台真实的 GPU 服务器、严格的限流熔断算法和分层的微服务架构。看懂了 503 和 404，你就真正看懂了现代云端 AI 基础设施跳动的脉搏。
