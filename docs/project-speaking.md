# AI Data Assistant · 项目口述练习

配合 AI 英语第 21–28 课使用。内容依据当前 AI Data Assistant 项目的实现；这是合成数据上的求职展示原型。不要把课程中的泛用训练、上线和客户场景说成自己的项目经历。

## 30 秒介绍：先讲清做什么

**English**

I built AI Data Assistant as a backend portfolio prototype. Users ask questions about demo business data and company policies. It uses FastAPI and LangGraph to choose SQL or RAG. The Streamlit UI shows answers, sources, and request metrics. I use existing models and synthetic data.

**中文**

我把 AI Data Assistant 做成了用于求职展示的后端原型。用户可以提问演示业务数据和公司规则。项目用 FastAPI 和 LangGraph 选择 SQL 或 RAG。Streamlit 界面展示答案、来源和请求指标。我使用现成模型与合成数据。

练法：先分成五句听读，再连起来说。允许替换成自己更熟悉的短句，不必一字不差背诵。

## 1 分钟介绍：串起工程链路

**English**

My project is an AI data assistant for demo business data and policy documents. The Streamlit UI sends HTTP requests to FastAPI. LangGraph routes each question to SQL, RAG, or a fallback. The workflow calls query tools through a local MCP server.

The SQL tool validates queries and uses a read-only SQLite connection. The RAG service retrieves document chunks from Milvus Lite and returns sources with the answer. I added API and session key checks, thread ownership checks, request IDs, and token usage reporting.

Offline tests check security and application behavior with mock services. I also verified real SQL and RAG requests in Docker. This is a portfolio prototype with synthetic data. It still needs broader evaluation and shared rate limiting before use across multiple replicas.

**中文**

我的项目是一个面向演示业务数据和规则文档的 AI 数据助手。Streamlit 界面向 FastAPI 发送 HTTP 请求。LangGraph 把每个问题分到 SQL、RAG 或回退分支。工作流通过本地 MCP 服务端调用查询工具。

SQL 工具校验查询并使用只读 SQLite 连接。RAG 服务从 Milvus Lite 检索文档块，返回答案及来源。我加入了 API 和 Session Key 校验、会话归属检查、请求标识和 Token 用量报告。

离线测试使用模拟服务检查安全和程序行为。我也在 Docker 中验证了真实 SQL 和 RAG 请求。这是使用合成数据的求职展示原型。在支持多个副本前，还需要更广的评测和共享限流。

## 演示时可以直接说

### SQL：数据库一共有多少位用户？

“First, I will ask how many users are in the database. The router chooses SQL. The demo database contains one thousand users. I will check both the answer and the route.”

“首先，我问数据库里一共有多少用户。路由节点选择 SQL。演示数据库有一千位用户。我会同时检查答案和路由。”

需要补充时说：“The data is synthetic and can be initialized with a script.”（数据是合成的，可以通过脚本初始化。）

### RAG：公司的退款规则是什么？

“Next, I will ask about the refund policy. The router chooses RAG. The answer should include the after-sales policy as a source. The demo policy allows refund requests within seven days after delivery. Approved refunds are returned through the original payment method within three working days.”

“接着，我问退款规则。路由节点选择 RAG。答案的来源应包含售后规则。演示规则允许在签收后七天内申请退款。审核通过后，在三个工作日内原路退回。”

这不是“总共三天退款完成”：规则没有承诺审核耗时。核对真实返回内容后再描述结果，来源里也可能包含其他检索文档。

### 指标：耗时、错误码与 Token

“These metrics show the route, error code, backend latency, and observed tokens. The total_cost field measures time in seconds. It is not a price. Missing token usage is shown as unknown.”

“这些指标展示路由、错误码、后端耗时和已观测 Token。total_cost 字段以秒衡量耗时，不是价格。缺失 Token 用量显示为未知。”

## 面试问答：先答两句，再补细节

### 1. Why do you use both SQL and RAG?

**为什么同时使用 SQL 和 RAG？**

“SQL is useful for counts and aggregates in structured tables. RAG retrieves policy text from documents. The router chooses the appropriate path for the question.”

“SQL 适合结构化表中的数量和汇总统计。RAG 从文档中检索规则文本。路由节点按问题选择相应分支。”

### 2. How do you stop the agent from changing the database?

**如何阻止智能体修改数据库？**

“The tool validates a single SELECT query against table and column allowlists. It rejects writes and uses a read-only SQLite connection. It also enforces a row limit and an execution timeout in code.”

“工具按表和列白名单校验单条 SELECT 查询。它拒绝写入并使用只读 SQLite 连接，也由代码执行行数和执行超时限制。”

可补充：最多 100 行，SQL 执行限制 2 秒。限制作用于 SQL 执行，不是整个模型请求；权限不靠 Prompt 保证。

### 3. What does MCP do in your project?

**MCP 在项目里做什么？**

“The MCP server exposes business and knowledge query tools. The workflow calls them through an MCP client. This project starts one local server subprocess and uses standard input and output for communication.”

“MCP 服务端提供业务和知识查询工具。工作流通过 MCP 客户端调用它们。本项目启动一个本地服务端子进程，通过标准输入输出通信。”

实际启动路径：`python -m app.mcp.server`。MCP 服务端没有单独的 HTTP 端口。

### 4. How do you isolate users' threads?

**如何隔离不同用户的会话线程？**

“Thread endpoints require an API key and a session key. The session key identifies a demo user. The server checks thread ownership before reading state or running the workflow.”

“会话线程接口需要 API Key 和 Session Key。Session Key 标识一个演示用户。服务端在读取状态或运行工作流前检查会话归属。”

补充边界：“A checkpoint stores the latest graph state. It does not automatically provide full conversational memory.”（checkpoint 保存最新工作流状态，不自动提供完整对话记忆。）

### 5. What do your tests verify?

**测试验证什么？**

“Offline tests check behavior such as SQL validation, authentication, thread isolation, and UI error handling. They use mock services and temporary data. Passing these tests does not prove overall model accuracy.”

“离线测试检查 SQL 校验、鉴权、会话隔离和界面错误处理等行为。它们使用模拟服务和临时数据。测试通过不证明模型总体正确率。”

可以补充：“I also run real SQL and RAG requests to verify the integration.”（我也执行真实 SQL 和 RAG 请求来验证集成。）只有实际验证过的结果才这样说，测试数量和耗时应以当次运行记录为准。

### 6. How do you investigate a failed request?

**如何调查失败请求？**

“I start with the request ID and check the route, error code, and timing logs. I check the response body as well as the HTTP status, because a business error can appear in an HTTP 200 response.”

“我先从请求标识入手，检查路由、错误码和计时日志。我会同时检查响应体和 HTTP 状态，因为 HTTP 200 响应也可能包含业务错误。”

### 7. Why keep Streamlit separate from the backend?

**为什么把 Streamlit 与后端分开？**

“Streamlit calls the HTTP API and does not import backend workflow or service modules. This lets me test and run the backend independently of the demo UI.”

“Streamlit 调用 HTTP API，不导入后端工作流或服务模块。这样我可以独立于演示界面测试和运行后端。”

### 8. What would you improve before production?

**投入生产前会改进什么？**

“I would expand evaluation with more representative questions and review the access-control design. For multiple replicas, I would add shared rate-limit state and reconsider storage. I would also add deeper dependency checks and measure latency under load.”

“我会用更有代表性的问题扩大评测，并审查访问控制设计。对于多个副本，我会加入共享限流状态并重新评估存储方案。我还会加入更深入的依赖检查，并测量负载下的耗时。”

这些是下一步，不是当前已实现能力。当前 readiness 只检查 SQLite 可读和模型凭证配置，不验证完整的外部模型或检索链路。

## 说清几个容易混淆的词

| 英语表达 | 本项目里准确的意思 |
| --- | --- |
| API / MCP | 分别按 A-P-I / M-C-P 三个字母读 |
| SQL | 可按 S-Q-L 三个字母读；保持自己习惯的读法即可 |
| RAG | 可读 /ræɡ/；全称 retrieval-augmented generation |
| stdio | standard input and output（标准输入输出） |
| latency / total_cost | 耗时，单位秒；不是费用金额 |
| observed token usage | 能取得的聊天模型用量；缺失项是未知，不是零，也不是完整账单 |
| sources | 检索来源；不等于每句话都有准确引用，不保证答案正确 |
| checkpoint | 最新工作流状态的持久化，不等于完整对话记忆 |
| recent thirty days | 固定观察日 2026-10-01 下的 2026-09-02 至 2026-10-01，包含首尾日期 |
| estimated order amount | 数量 × 当前商品价格，不是历史成交金额；默认排除取消订单 |
| rate limit / concurrency | 当前是单个进程内的限制，不是多个副本共享的限制 |
| offline regression | 工程行为验证，不是模型正确率或生产性能证明 |

每天练法：听读一个短句 → 用自己的话复述 → 回答一个追问 → 对照项目核查有没有夸大。先求清楚，再增加术语和细节。
