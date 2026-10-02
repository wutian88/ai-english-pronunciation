# 开口英语 · iPhone 离线口语 PWA

免费、纯前端、无 AI 接口和 API Key 的英语发音与口语应用。面向有大学英语基础、但很久没开口的人。内置 **40 节日常口语课** 与 **28 节可直接进入的 AI 英语专项课（224 个核心表达）**；两个词库的进度彼此独立。

## AI Data Assistant 项目英语

第 **21–28 课**根据自己的 AI Data Assistant 项目追加，面向 GitHub 展示与英文面试。可以在“AI 英语”→“课程”直接打开，不需要先完成前 20 课。

| 课号 | 练习主题 |
| --- | --- |
| 21 | 项目用途、技术栈、合成数据与现成模型 |
| 22 | Streamlit → HTTP → FastAPI → LangGraph 路由 |
| 23 | RAG 分块、Embedding、Milvus Lite 与来源核对 |
| 24 | SQL Agent 安全校验、只读查询与统计口径 |
| 25 | MCP Client / Server、stdio 与本地子进程 |
| 26 | API Key、Session Key、thread ownership 与 checkpoint |
| 27 | request_id、耗时、错误码与已观测 Token |
| 28 | 离线回归、Docker、原型局限与面试追问 |

每课继续提供 8 个表达、4 个常用句、情景对话和 2 个口述任务，使用已有朗读和间隔复习功能。新课只追加 `a21–a28`，不修改 `a01–a20` 或日常课程的 ID，不迁移或清空学习进度。

[项目口述练习稿](docs/project-speaking.md)提供 30 秒 / 1 分钟双语介绍、SQL / RAG 演示台词和面试问答。先练第 21 课的短句，再逐渐串联技术流程；重点说清自己能验证什么，以及项目目前的边界。

## 手机上使用

1. 在 iPhone Safari 打开 `https://wutian88.github.io/ai-english-pronunciation/`。
2. 点“分享”→“添加到主屏幕”，之后尽量从主屏幕打开并学习。
3. 首页直接切换“日常英语 / AI 英语”；“课程”页可任选下一课。点击词语旁的 ▶ 可听词语发音，点击下方的“🔊 听例句”可听完整例句；常用句和对话也有独立发音按钮。课程页可切换慢速或正常速度。
4. 第一次联网打开后，界面与内置课程会被缓存；后续可离线使用。更新时先联网打开主屏幕应用，在“我的”页靠前的“应用更新”中点整行大按钮“检查更新”；下载完成后，同一个按钮变成“立即更新”，在这里直接点即可。若已自动下载新版本，可以直接点“立即更新”，不必再点顶部提示。若暂未发现更新，稍后重新打开应用再检查。不要卸载应用或清除网站数据，以免丢失本机学习进度。

学习进度、自定义词条和此前的录音存放在本机 IndexedDB。Safari 与主屏幕应用可能是不同的存储空间；换设备或删除应用前，在“我的”页导出 JSON。JSON 包含进度和自定义词库，**不含录音**。跟读与录音界面目前隐藏，但代码和已有录音保留，以备后续重新启用。系统英文朗读能否断网使用取决于设备是否有本地英文语音；应用会显示检测结果，不依赖联网语音识别打分。

## 每日复习与 GitHub 记录

词条自评使用“再练 / 困难 / 良好 / 熟练”。应用在设备本地排定到期复习，第二天打开即可继续，不依赖 GitHub。

已准备好[固定进度 Issue](https://github.com/wutian88/ai-english-pronunciation/issues/1)。每天学完后点“复制今天的进度”，再点“打开固定 Issue”，在 GitHub 手机端粘贴并**发布评论**。此过程需要你亲自操作；不支持 iPhone 在夜间不打开应用时自动上传。纯复习日和同一天学多课也会写入同一份当日记录。恢复时只读取仓库主人 `wutian88` 账号发布的有效评论，不包含录音或自定义词库；完整备份仍应使用 JSON。

## 本地开发

需要 Node.js 24 或兼容版本。

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

GitHub Actions 从 `main` 构建 `dist` 并部署到 GitHub Pages。Vite `base` 固定为 `/ai-english-pronunciation/`。如果仓库还未启用 Actions 作为 Pages 来源，在仓库 Settings → Pages 选择 **GitHub Actions**。部署不需要运行时服务器或 API Key。

旧版原生 JS 和未发布 AI 草稿保留在源码仓库中作为参考，不进入新的 Vite 构建产物。旧版 `localStorage` 进度不会强行映射到新课程，也不会被新版清除。
