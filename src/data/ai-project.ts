import { ai } from './ai';
import type { Lesson } from '../types/wordbook';

// Append-only lessons based on the AI Data Assistant portfolio project.
// Keep a01-a20 and their word IDs stable so existing learning records still work.
export const aiProjectLessons: Lesson[] = [
  ai(21, '项目英语：介绍 AI Data Assistant', '用短句讲清项目用途、技术栈和演示数据', [
    ['portfolio project', '/pɔːrtˈfoʊlioʊ ˈprɑːdʒɛkt/', '求职展示项目', 'AI Data Assistant is my portfolio project.', 'AI Data Assistant 是我的求职展示项目。'],
    ['backend', '/ˈbækˌɛnd/', '后端', 'I use FastAPI for the backend.', '我用 FastAPI 构建后端。'],
    ['natural language', '/ˈnætʃərəl ˈlæŋɡwɪdʒ/', '自然语言', 'Users ask questions in natural language.', '用户用自然语言提问。'],
    ['structured data', '/ˈstrʌktʃərd ˈdeɪtə/', '结构化数据', 'SQL queries structured data in SQLite.', 'SQL 查询 SQLite 中的结构化数据。'],
    ['company policy', '/ˈkʌmpəni ˈpɑːləsi/', '公司政策；公司规则', 'RAG searches documents about company policies.', 'RAG 检索公司规则文档。'],
    ['synthetic data', '/sɪnˈθɛtɪk ˈdeɪtə/', '合成数据', 'The demo uses synthetic data, not real customer records.', '演示使用合成数据，而不是真实客户记录。'],
    ['user interface', '/ˈjuːzər ˈɪntərˌfeɪs/', '用户界面', 'Streamlit provides a simple user interface.', 'Streamlit 提供简洁的用户界面。'],
    ['existing model', '/ɪɡˈzɪstɪŋ ˈmɑːdəl/', '现成模型', 'I call an existing model through an API.', '我通过 API 调用现成模型。'],
  ], [
    ['I built AI Data Assistant as a backend portfolio prototype.', '我把 AI Data Assistant 做成了用于求职展示的后端原型。', '在 built 后稍停；重读 Data Assistant 和 prototype。'],
    ['It answers questions about demo business data and company policies.', '它回答有关演示业务数据和公司规则的问题。'],
    ['I use FastAPI, LangGraph, SQLite, and Milvus Lite.', '我使用 FastAPI、LangGraph、SQLite 和 Milvus Lite。', '技术名逐个说，中间稍停；API 可按 A、P、I 三个字母读。'],
    ['I use existing models; I did not train a model from scratch.', '我使用现成模型，没有从零训练模型。'],
  ], [
    ['A', 'Could you briefly introduce your project?', '能简短介绍一下你的项目吗？'],
    ['B', 'It answers data questions with SQL and policy questions with RAG.', '它用 SQL 回答数据问题，用 RAG 回答规则问题。'],
    ['A', 'Does it use real customer data?', '它使用真实客户数据吗？'],
    ['B', 'No. It uses synthetic data and demo policy documents.', '不。它使用合成数据和演示规则文档。'],
  ], [
    ['Introduce the project in thirty seconds: its purpose, stack, and demo data.', '用 30 秒介绍项目：用途、技术栈、演示数据。'],
    ['Explain why this is a portfolio prototype and how it uses existing models.', '说明这是求职展示原型，以及如何使用现成模型。'],
  ]),
  ai(22, '项目英语：HTTP 接口与路由', '沿着一次请求讲清 UI、FastAPI 和 LangGraph', [
    ['HTTP request', '/ˌeɪtʃ tiː tiː ˈpiː rɪˈkwɛst/', 'HTTP 请求', 'The UI sends an HTTP request to FastAPI.', '界面向 FastAPI 发送 HTTP 请求。'],
    ['endpoint', '/ˈɛndˌpɔɪnt/', '接口端点', 'The ask endpoint accepts a question.', '问答接口接收一个问题。'],
    ['validation', '/ˌvæləˈdeɪʃən/', '校验', 'Input validation rejects an empty question.', '输入校验拒绝空问题。'],
    ['router', '/ˈruːtər/', '路由器；路由节点', 'The LangGraph router classifies the question.', 'LangGraph 路由节点对问题分类。'],
    ['route', '/ruːt/', '路由；处理分支', 'A database question takes the SQL route.', '数据库问题走 SQL 分支。'],
    ['fallback', '/ˈfɔːlˌbæk/', '回退分支', 'The fallback asks the user to clarify.', '回退分支请用户进一步说明问题。'],
    ['response body', '/rɪˈspɑːns ˈbɑːdi/', '响应体', 'The response body includes the answer and route.', '响应体包含答案和路由。'],
    ['decoupled', '/diːˈkʌpəld/', '解耦的', 'The UI and backend are decoupled through HTTP.', '界面和后端通过 HTTP 解耦。'],
  ], [
    ['Streamlit calls FastAPI over HTTP instead of importing backend services.', 'Streamlit 通过 HTTP 调用 FastAPI，而不直接导入后端服务。'],
    ['FastAPI validates the input and checks the API key.', 'FastAPI 校验输入并检查 API Key。'],
    ['LangGraph routes the question to SQL, RAG, or a fallback.', 'LangGraph 把问题分到 SQL、RAG 或回退分支。', 'SQL、RAG、fallback 作为三项分开说，最后一项降调。'],
    ['The response includes an answer, sources, and an error code.', '响应包含答案、来源和错误码。'],
  ], [
    ['A', 'What happens when I ask how many users are in the database?', '我问数据库里有多少用户时会发生什么？'],
    ['B', 'The UI sends the question to FastAPI, and the router chooses SQL.', '界面把问题发给 FastAPI，路由节点选择 SQL。'],
    ['A', 'Why keep the UI separate?', '为什么把界面分开？'],
    ['B', 'The HTTP API lets me test the backend without the UI.', 'HTTP API 让我可以在没有界面的情况下测试后端。'],
  ], [
    ['Describe a request from the Streamlit input to the FastAPI response.', '描述一次请求从 Streamlit 输入到 FastAPI 返回的过程。'],
    ['Explain when the router chooses SQL, RAG, or a fallback.', '说明路由节点何时选择 SQL、RAG 或回退分支。'],
  ]),
  ai(23, '项目英语：RAG 与向量检索', '解释文档如何变成可检索的知识，以及来源的作用', [
    ['retrieval', '/rɪˈtriːvəl/', '检索', 'Retrieval finds documents relevant to the question.', '检索找到与问题相关的文档。'],
    ['chunk', '/tʃʌŋk/', '文本分块', 'I split Markdown documents into chunks.', '我把 Markdown 文档切成文本块。'],
    ['overlap', '/ˈoʊvərˌlæp/', '重叠', 'Adjacent chunks can have overlapping text.', '相邻文本块可以包含重叠内容。'],
    ['embedding', '/ɪmˈbɛdɪŋ/', '嵌入向量', 'An embedding represents a chunk as a vector.', '嵌入向量用一个向量表示文本块。'],
    ['vector store', '/ˈvɛktər stɔːr/', '向量库', 'Milvus Lite is the vector store in this project.', 'Milvus Lite 是本项目使用的向量库。'],
    ['metadata', '/ˈmɛtəˌdeɪtə/', '元数据', 'Metadata keeps the source title and file path.', '元数据保留来源标题和文件路径。'],
    ['source document', '/sɔːrs ˈdɑːkjəmənt/', '来源文档', 'The refund answer lists its source documents.', '退款回答列出它的来源文档。'],
    ['insufficient evidence', '/ˌɪnsəˈfɪʃənt ˈɛvɪdəns/', '证据不足', 'The system should say when evidence is insufficient.', '系统应说明何时证据不足。'],
  ], [
    ['RAG stands for retrieval-augmented generation.', 'RAG 的全称是检索增强生成。', 'RAG 可读作 /ræɡ/；先练全称，再练缩写。'],
    ['I split Markdown documents into chunks and store their embeddings in Milvus Lite.', '我把 Markdown 文档分块，并将嵌入向量存入 Milvus Lite。'],
    ['The service retrieves three chunks and uses them to help generate an answer.', '服务检索三个文本块，并用它们辅助生成答案。'],
    ['The answer lists retrieved sources, but sources do not guarantee correctness.', '答案列出检索来源，但来源不保证答案正确。'],
  ], [
    ['A', 'How does the assistant answer a refund question?', '助手如何回答退款问题？'],
    ['B', 'It retrieves policy text and asks the model to answer from that text.', '它检索规则文本，并让模型根据这些文本回答。'],
    ['A', 'Does showing a source mean the answer is always correct?', '展示来源就意味着答案总是正确吗？'],
    ['B', 'No. I still compare the answer with the original policy.', '不。我仍会把答案与原始规则核对。'],
  ], [
    ['Explain the RAG pipeline using chunks, embeddings, retrieval, and sources.', '用分块、嵌入向量、检索和来源解释 RAG 流程。'],
    ['Describe how you check a refund answer against the source document.', '描述如何根据来源文档核对退款回答。'],
  ]),
  ai(24, '项目英语：SQL Agent 与安全统计', '讲清代码校验、只读查询和数据统计口径', [
    ['read-only', '/ˌriːd ˈoʊnli/', '只读的', 'The SQLite connection is read-only.', 'SQLite 连接是只读的。'],
    ['allowlist', '/əˈlaʊˌlɪst/', '允许列表；白名单', 'An allowlist controls access to tables and columns.', '白名单控制对表和列的访问。'],
    ['schema', '/ˈskiːmə/', '数据库结构', 'The agent reads the allowed table schema.', '智能体读取获准访问的表结构。'],
    ['aggregate', '/ˈæɡrəˌɡeɪt/', '汇总；聚合', 'The query aggregates orders by city.', '查询按城市汇总订单。'],
    ['row limit', '/roʊ ˈlɪmɪt/', '返回行数限制', 'The tool has a one-hundred-row limit.', '工具最多返回一百行。'],
    ['query timeout', '/ˈkwɪri ˈtaɪmˌaʊt/', '查询超时', 'The SQL execution timeout is two seconds.', 'SQL 执行超时限制是两秒。'],
    ['reference date', '/ˈrɛfərəns deɪt/', '参考日；观察日', 'Recent orders are counted from a fixed reference date.', '近期订单按固定观察日统计。'],
    ['estimated amount', '/ˈɛstəˌmeɪtɪd əˈmaʊnt/', '估算金额', 'The estimated amount uses the current product price.', '估算金额使用当前商品价格。'],
  ], [
    ['The demo database has one thousand users, two hundred products, and ten thousand orders.', '演示数据库有一千位用户、两百种商品和一万笔订单。'],
    ['The tool validates a single SELECT query and rejects unauthorized tables or columns.', '工具校验单条 SELECT 查询，并拒绝未授权的表或列。'],
    ['Read-only access, row limits, and timeouts are enforced in code.', '只读访问、行数限制和超时由代码强制执行。', '强调 in code，说明权限不只靠提示词。'],
    ['Recent thirty-day totals use a fixed reference date, not the current system date.', '最近三十天的统计使用固定观察日，而不是当前系统日期。'],
  ], [
    ['A', 'Can the model change the database?', '模型能修改数据库吗？'],
    ['B', 'The tool rejects write queries and uses a read-only connection.', '工具拒绝写入查询，并使用只读连接。'],
    ['A', 'Is the estimated order amount historical revenue?', '估算订单金额是历史收入吗？'],
    ['B', 'No. It uses quantity times the current product price.', '不是。它使用数量乘以当前商品价格。'],
  ], [
    ['Explain three code-level checks that protect SQL execution.', '说出三项保护 SQL 执行的代码级检查。'],
    ['Explain why recent-order counts are repeatable and why estimated amounts are not historical revenue.', '解释为何近期订单统计可复现，以及估算金额为何不是历史收入。'],
  ]),
  ai(25, '项目英语：MCP 与工具调用', '说明协议、客户端和本地子进程的职责', [
    ['protocol', '/ˈproʊtəˌkɔːl/', '协议', 'MCP is a protocol for connecting applications to tools.', 'MCP 是连接应用与工具的协议。'],
    ['MCP client', '/ˌɛm siː ˈpiː ˈklaɪənt/', 'MCP 客户端', 'The workflow calls tools through an MCP client.', '工作流通过 MCP 客户端调用工具。'],
    ['MCP server', '/ˌɛm siː ˈpiː ˈsɝːvər/', 'MCP 服务端', 'The MCP server exposes two query tools.', 'MCP 服务端提供两个查询工具。'],
    ['subprocess', '/ˈsʌbˌprɑːsɛs/', '子进程', 'The server runs as a local subprocess.', '服务端作为本地子进程运行。'],
    ['standard input', '/ˈstændərd ˈɪnˌpʊt/', '标准输入', 'The process receives messages through standard input.', '进程通过标准输入接收消息。'],
    ['standard output', '/ˈstændərd ˈaʊtˌpʊt/', '标准输出', 'The process sends protocol messages through standard output.', '进程通过标准输出发送协议消息。'],
    ['tool boundary', '/tuːl ˈbaʊndəri/', '工具边界', 'SQL validation stays inside the tool boundary.', 'SQL 校验保留在工具边界内。'],
    ['module path', '/ˈmɑːdʒuːl pæθ/', '模块路径', 'The module path is app.mcp.server.', '模块路径是 app.mcp.server。'],
  ], [
    ['MCP stands for Model Context Protocol.', 'MCP 的全称是 Model Context Protocol。', 'MCP 按 M、C、P 三个字母读；全称逐词清楚说。'],
    ['The workflow uses an MCP client to call business and knowledge query tools.', '工作流用 MCP 客户端调用业务查询和知识查询工具。'],
    ['The MCP server runs as a local subprocess and communicates over standard input and output.', 'MCP 服务端作为本地子进程运行，通过标准输入输出通信。'],
    ['FastAPI handles HTTP, while the MCP server provides tool access.', 'FastAPI 处理 HTTP，而 MCP 服务端提供工具访问。'],
  ], [
    ['A', 'How do you start the MCP server?', '你如何启动 MCP 服务端？'],
    ['B', 'The client starts the app.mcp.server Python module as a subprocess.', '客户端把 app.mcp.server Python 模块作为子进程启动。'],
    ['A', 'Does it have a separate HTTP port?', '它有单独的 HTTP 端口吗？'],
    ['B', 'No. This project uses the standard input and output transport.', '没有。本项目使用标准输入输出传输。'],
  ], [
    ['Explain the roles of FastAPI, the MCP client, and the MCP server.', '解释 FastAPI、MCP 客户端和 MCP 服务端各自的职责。'],
    ['Describe how the local MCP subprocess communicates without an HTTP port.', '描述本地 MCP 子进程如何在没有 HTTP 端口的情况下通信。'],
  ]),
  ai(26, '项目英语：鉴权、隔离与状态', '解释谁能调用接口、谁能访问会话和状态如何保存', [
    ['authentication', '/ɔːˌθɛntɪˈkeɪʃən/', '身份认证', 'Authentication checks the request credentials.', '身份认证检查请求凭证。'],
    ['API key', '/ˌeɪ piː ˈaɪ kiː/', '应用接口密钥', 'Protected endpoints require an API key.', '受保护的接口需要 API Key。'],
    ['session key', '/ˈsɛʃən kiː/', '会话密钥', 'A session key maps to a demo user.', 'Session Key 对应一个演示用户。'],
    ['thread ownership', '/θrɛd ˈoʊnərˌʃɪp/', '会话线程归属', 'The server checks thread ownership before access.', '服务端在访问前检查会话线程归属。'],
    ['checkpoint', '/ˈtʃɛkˌpɔɪnt/', '状态检查点', 'A SQLite checkpoint stores the latest graph state.', 'SQLite checkpoint 保存最新工作流状态。'],
    ['access control', '/ˈæksɛs kənˈtroʊl/', '访问控制', 'Access control stops cross-user thread access.', '访问控制阻止跨用户访问会话线程。'],
    ['concurrency', '/kənˈkɝːənsi/', '并发', 'A semaphore limits concurrency within one process.', '信号量限制单个进程内的并发。'],
    ['rate limit', '/reɪt ˈlɪmɪt/', '请求频率限制', 'The rate limit is tracked per application key.', '请求频率限制按应用密钥记录。'],
  ], [
    ['Thread endpoints require both an API key and a session key.', '会话线程接口同时需要 API Key 和 Session Key。'],
    ['The server checks ownership before reading or updating a thread.', '服务端在读取或更新会话线程前检查归属。'],
    ['A checkpoint stores the latest state; it does not guarantee full conversational memory.', 'checkpoint 保存最新状态；它不保证完整的多轮对话记忆。'],
    ['The current rate limit and concurrency controls work within one process.', '当前的限流和并发控制在单个进程内工作。'],
  ], [
    ['A', 'What if one user requests another user\'s thread?', '如果一个用户请求另一个用户的会话线程呢？'],
    ['B', 'The server checks ownership and returns not found.', '服务端检查归属并返回未找到。'],
    ['A', 'Will the rate limit work across several replicas?', '限流能覆盖多个副本吗？'],
    ['B', 'Not yet. That would need shared state for rate limiting.', '目前还不能。那需要共享限流状态。'],
  ], [
    ['Explain how API keys, session keys, and thread ownership protect different boundaries.', '解释 API Key、Session Key 和会话归属分别保护哪些边界。'],
    ['Describe what checkpoints save and what changes are needed for multiple replicas.', '描述 checkpoint 保存什么，以及多个副本需要哪些改进。'],
  ]),
  ai(27, '项目英语：可观测性与故障说明', '看懂耗时、错误码和 Token，并准确说明未知项', [
    ['request ID', '/rɪˈkwɛst ˌaɪ ˈdiː/', '请求标识', 'A request ID links the response to the logs.', '请求标识把响应与日志关联起来。'],
    ['latency', '/ˈleɪtənsi/', '耗时；延迟', 'Backend latency is measured in seconds.', '后端耗时以秒计量。'],
    ['error code', '/ˈɛrər koʊd/', '错误码', 'Check the error code as well as the HTTP status.', '除了 HTTP 状态，还要检查错误码。'],
    ['token usage', '/ˈtoʊkən ˈjuːsɪdʒ/', 'Token 用量', 'The UI shows observed token usage.', '界面显示已观测到的 Token 用量。'],
    ['log', '/lɔːɡ/', '日志', 'I use logs to investigate a failed request.', '我用日志调查失败的请求。'],
    ['correlation', '/ˌkɔːrəˈleɪʃən/', '关联', 'The request ID supports correlation across workflow logs.', '请求标识帮助关联工作流日志。'],
    ['unknown', '/ˌʌnˈnoʊn/', '未知', 'Missing usage is shown as unknown, not zero.', '缺失的用量显示为未知，而不是零。'],
    ['billing', '/ˈbɪlɪŋ/', '计费', 'Observed tokens do not represent complete billing data.', '已观测 Token 不代表完整计费数据。'],
  ], [
    ['I use a request ID to follow a request through HTTP and workflow logs.', '我用请求标识在 HTTP 和工作流日志中跟踪一次请求。'],
    ['The field named total_cost means backend time in seconds, not money.', '名为 total_cost 的字段表示后端耗时，单位是秒，不是金额。'],
    ['A response can have HTTP status two hundred and still contain a business error.', '响应可能是 HTTP 200，但仍然包含业务错误。'],
    ['Observed chat tokens exclude unavailable embedding usage, so they are not a full bill.', '已观测聊天 Token 不含无法取得的 Embedding 用量，因此不是完整账单。'],
  ], [
    ['A', 'The answer took a long time. How would you investigate?', '回答耗时很长，你会如何调查？'],
    ['B', 'I would check its request ID, route, error code, and timing logs.', '我会检查它的请求标识、路由、错误码和计时日志。'],
    ['A', 'What does an unknown token count mean?', '未知 Token 数量意味着什么？'],
    ['B', 'The usage was unavailable. It does not mean the request used zero tokens.', '用量数据无法取得，不意味着请求没有使用 Token。'],
  ], [
    ['Explain the metrics shown in your demo without treating time as money.', '解释演示中的指标，注意不要把耗时说成金额。'],
    ['Describe how you would investigate a failed request with its request ID.', '描述如何用请求标识调查失败请求。'],
  ]),
  ai(28, '项目英语：测试、Docker 与面试追问', '用证据展示项目，并说明原型边界和下一步', [
    ['regression test', '/rɪˈɡrɛʃən tɛst/', '回归测试', 'Regression tests check that changes preserve behavior.', '回归测试检查改动是否保留原有行为。'],
    ['mock', '/mɑːk/', '模拟对象；模拟', 'Offline tests mock the model and HTTP services.', '离线测试模拟模型和 HTTP 服务。'],
    ['continuous integration', '/kənˈtɪnjuəs ˌɪntəˈɡreɪʃən/', '持续集成', 'GitHub Actions defines the offline continuous integration checks.', 'GitHub Actions 定义离线持续集成检查。'],
    ['container', '/kənˈteɪnər/', '容器', 'Docker runs the backend in a container.', 'Docker 在容器中运行后端。'],
    ['persistent volume', '/pərˈsɪstənt ˈvɑːljuːm/', '持久化数据卷', 'A persistent volume stores runtime database files.', '持久化数据卷保存运行数据库文件。'],
    ['readiness check', '/ˈrɛdinəs tʃɛk/', '就绪检查', 'The readiness check verifies SQLite access and model key configuration.', '就绪检查验证 SQLite 访问和模型密钥配置。'],
    ['trade-off', '/ˈtreɪd ɔːf/', '权衡', 'SQLite offers a simple setup with deployment trade-offs.', 'SQLite 提供简单的配置，也存在部署方面的权衡。'],
    ['next step', '/nɛkst stɛp/', '下一步', 'My next step would be broader evaluation and shared rate limiting.', '我的下一步会是更广的评测和共享限流。'],
  ], [
    ['Offline regression tests verify behavior, not overall model accuracy.', '离线回归测试验证程序行为，而不是模型的总体正确率。'],
    ['I also check real SQL and RAG requests through FastAPI.', '我也通过 FastAPI 验证真实 SQL 和 RAG 请求。'],
    ['Docker initializes demo data and stores runtime database files in a persistent volume.', 'Docker 初始化演示数据，并把运行数据库文件存入持久化数据卷。'],
    ['This is a single-machine prototype; readiness does not check the full external model pipeline.', '这是单机原型；就绪检查不验证完整的外部模型链路。'],
  ], [
    ['A', 'How would you demonstrate the project in an interview?', '你会如何在面试中演示项目？'],
    ['B', 'I would show one SQL question, one refund question, and their routes and sources.', '我会展示一个 SQL 问题、一个退款问题，以及它们的路由和来源。'],
    ['A', 'What would you improve before production?', '投入生产前你会改进什么？'],
    ['B', 'I would expand evaluation, review access control, and design shared rate limiting.', '我会扩大评测、审查访问控制，并设计共享限流。'],
  ], [
    ['Give a one-minute walkthrough: one SQL result, one RAG source, one test, and one limitation.', '做一分钟演示：一个 SQL 结果、一个 RAG 来源、一项测试和一个局限。'],
    ['Explain a design trade-off and a concrete improvement before production.', '解释一项设计权衡，以及生产使用前的一项具体改进。'],
  ]),
];
