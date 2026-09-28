window.LESSONS_B = [
  {
    id: 11,
    week: 3,
    title: "评估与测试",
    subtitle: "用清楚的英语说明如何判断 AI 助手有没有做好任务。",
    words: [
      ["benchmark", "/ˈbentʃmɑrk/", "基准测试", "We use a benchmark to compare two models.", "BENCH-mark，重音在前"],
      ["dataset", "/ˈdeɪtəˌset/", "数据集", "The test dataset contains real user questions.", "DAY-tuh-set，data 的首音也可读 /dæ/"],
      ["expected", "/ɪkˈspektɪd/", "预期的", "Write down the expected answer first.", "重音在 SPEC"],
      ["actual", "/ˈæktʃuəl/", "实际的", "Compare the actual answer with the expected one.", "AC-tual，开头 /æ/ 要张口"],
      ["accuracy", "/ˈækjərəsi/", "准确率", "Measure accuracy on the labeled questions.", "AC-cu-ra-cy，重音在前"],
      ["coverage", "/ˈkʌvərɪdʒ/", "覆盖范围", "Our tests need better coverage of edge cases.", "COV-er-age，首音 /ʌ/"],
      ["rubric", "/ˈruːbrɪk/", "评分标准", "Use a rubric to review answer quality.", "ROO-bric，重音在前"],
      ["score", "/skɔr/", "分数；评分", "Give each answer a score from one to five.", "一个音节，末尾 r 要卷舌"],
      ["compare", "/kəmˈper/", "比较", "Compare the new result with the old result.", "重音在 PARE"],
      ["regression", "/rɪˈɡreʃən/", "功能退化；回归问题", "A regression made the assistant miss simple questions.", "重音在 GRESH，不读成 re-GRESS-ion"]
    ],
    sentences: [
      { text: "We tested the assistant on fifty common customer questions.", translation: "我们用五十个常见客户问题测试了这个助手。" },
      { text: "The new version is more accurate, but it still misses some edge cases.", translation: "新版本更准确，但仍会漏掉一些边界情况。" },
      { text: "Please compare the actual answer with the expected answer.", translation: "请把实际回答与预期回答进行比较。" }
    ]
  },
  {
    id: 12,
    week: 3,
    title: "排错与可靠性",
    subtitle: "描述错误出现、定位和恢复的过程。",
    words: [
      ["trace", "/treɪs/", "追踪；调用轨迹", "The trace shows where the request failed.", "一个音节，末尾 /s/ 要清楚"],
      ["log", "/lɔɡ/", "日志", "Check the server log for the error.", "一个音节，末尾是 /ɡ/"],
      ["failure", "/ˈfeɪljər/", "失败；故障", "This failure happens only on long inputs.", "FAIL-ure，重音在前"],
      ["retry", "/riˈtraɪ/", "重试", "Retry the request after a short wait.", "作动词时重音在 TRY"],
      ["timeout", "/ˈtaɪmaʊt/", "超时", "Set a timeout for slow API calls.", "TIME-out，重音在前"],
      ["fallback", "/ˈfɔlˌbæk/", "备用方案", "Show a helpful message as a fallback.", "FALL-back，重音在前"],
      ["exception", "/ɪkˈsepʃən/", "异常", "Catch the exception and log its details.", "重音在 SEP"],
      ["reproduce", "/ˌriːprəˈduːs/", "复现", "Can you reproduce the bug with this input?", "重音在 DOO，结尾 /s/"],
      ["stable", "/ˈsteɪbəl/", "稳定的", "The service stayed stable during the demo.", "STAY-bul，重音在前"],
      ["recover", "/rɪˈkʌvər/", "恢复", "The service should recover after a network error.", "重音在 COV" ]
    ],
    sentences: [
      { text: "I can reproduce the bug when the input is very long.", translation: "输入很长时，我可以复现这个错误。" },
      { text: "The request timed out, so the app showed a fallback message.", translation: "请求超时了，所以应用显示了一条备用提示。" },
      { text: "We added logs to find the cause and prevent another failure.", translation: "我们增加了日志，用来查找原因并避免再次故障。" }
    ]
  },
  {
    id: 13,
    week: 3,
    title: "安全与隐私",
    subtitle: "练习解释用户数据怎样获得授权并受到保护。",
    words: [
      ["privacy", "/ˈpraɪvəsi/", "隐私", "Privacy matters when users upload documents.", "PRI-va-cy，重音在前"],
      ["consent", "/kənˈsent/", "同意；授权", "Ask for consent before recording audio.", "重音在 SENT"],
      ["sensitive", "/ˈsensətɪv/", "敏感的", "Do not send sensitive data to a public endpoint.", "SEN-si-tive，重音在前"],
      ["redact", "/rɪˈdækt/", "遮盖；删去敏感信息", "Redact names before sharing the logs.", "重音在 DACT，/æ/ 要张口"],
      ["permission", "/pərˈmɪʃən/", "权限；许可", "The app asks for microphone permission.", "重音在 MIS"],
      ["access", "/ˈækses/", "访问权限", "Only the support team has access to these records.", "名词重音在 AC"],
      ["encrypt", "/ɪnˈkrɪpt/", "加密", "Encrypt the file before storing it.", "重音在 CRYPT"],
      ["retention", "/rɪˈtenʃən/", "数据保留", "Set a clear data retention period.", "重音在 TEN"],
      ["anonymous", "/əˈnɑnəməs/", "匿名的", "Use anonymous examples in the demo.", "重音在 NON"],
      ["audit", "/ˈɔdɪt/", "审计；检查", "Keep an audit record of important changes.", "AW-dit，重音在前"]
    ],
    sentences: [
      { text: "We remove personal details before using support tickets for testing.", translation: "我们在使用客服工单测试前，会移除个人信息。" },
      { text: "The app asks for permission before it starts recording.", translation: "应用开始录音前会请求许可。" },
      { text: "Only approved team members can access the uploaded documents.", translation: "只有获得授权的团队成员可以访问上传的文档。" }
    ]
  },
  {
    id: 14,
    week: 3,
    title: "成本与速度",
    subtitle: "讨论调用量、预算和让应用响应更快的方法。",
    words: [
      ["budget", "/ˈbʌdʒɪt/", "预算", "We have a monthly budget for API calls.", "BUD-get，重音在前"],
      ["usage", "/ˈjuːsɪdʒ/", "使用量", "Track usage by feature and by user.", "YOO-sij，重音在前"],
      ["estimate", "/ˈestəmət/", "估算值", "This is a rough estimate of the monthly cost.", "这里作名词，重音在 ES"],
      ["rate", "/reɪt/", "速率；费率", "Check the API rate before scaling up.", "一个音节，和 eight 押韵"],
      ["limit", "/ˈlɪmɪt/", "限制；上限", "Set a daily limit for each account.", "LIM-it，重音在前"],
      ["cache", "/kæʃ/", "缓存", "Cache repeated answers to save time.", "读作 cash，不读 cachey"],
      ["batch", "/bætʃ/", "批次；批量处理", "Process old reports in a batch.", "一个音节，结尾 /tʃ/"],
      ["throughput", "/ˈθruːˌpʊt/", "吞吐量", "Measure throughput during peak hours.", "THROO-put，开头咬舌 /θ/"],
      ["delay", "/dɪˈleɪ/", "延迟；耽搁", "A network delay slowed down the answer.", "重音在 LAY"],
      ["optimize", "/ˈɑptəˌmaɪz/", "优化", "Optimize the prompt to use fewer tokens.", "OP-ti-mize，重音在前"]
    ],
    sentences: [
      { text: "We set a daily usage limit to stay within the budget.", translation: "我们设置了每日使用上限，以控制在预算内。" },
      { text: "Caching common answers can make the app faster.", translation: "缓存常见回答可以让应用更快。" },
      { text: "Our cost estimate includes both model calls and hosting.", translation: "我们的成本估算同时包含模型调用和托管费用。" }
    ]
  },
  {
    id: 15,
    week: 3,
    title: "上线与监控",
    subtitle: "练习汇报版本发布、运行状态和故障处理。",
    words: [
      ["deploy", "/dɪˈplɔɪ/", "部署", "Deploy the update after the final test.", "重音在 PLOY"],
      ["release", "/rɪˈliːs/", "发布；版本", "The next release includes better search.", "重音在 LEASE"],
      ["staging", "/ˈsteɪdʒɪŋ/", "预发布测试环境", "Test the change in staging first.", "STAY-jing，重音在前"],
      ["production", "/prəˈdʌkʃən/", "生产环境", "The feature is now live in production.", "重音在 DUC"],
      ["monitor", "/ˈmɑnɪtər/", "监控", "Monitor errors after the release.", "MON-i-tor，重音在前"],
      ["alert", "/əˈlɜrt/", "告警", "An alert warned us about high error rates.", "重音在 LERT，末尾卷舌"],
      ["uptime", "/ˈʌpˌtaɪm/", "正常运行时间", "The dashboard shows service uptime.", "UP-time，重音在前"],
      ["rollback", "/ˈroʊlˌbæk/", "版本回退", "A rollback restored the previous version.", "ROLL-back，重音在前"],
      ["version", "/ˈvɜrʒən/", "版本", "Which version is running now?", "VER-sion，/v/ 要咬下唇"],
      ["dashboard", "/ˈdæʃˌbɔrd/", "监控看板", "Open the dashboard to check the error rate.", "DASH-board，重音在前"]
    ],
    sentences: [
      { text: "We tested the new version in staging before the release.", translation: "发布前，我们在预发布环境测试了新版本。" },
      { text: "After deployment, I monitor the error rate and response time.", translation: "部署后，我会监控错误率和响应时间。" },
      { text: "If the error rate rises, we can roll back the release.", translation: "如果错误率升高，我们可以回退这个版本。" }
    ]
  },
  {
    id: 16,
    week: 4,
    title: "AI SQL 与 BI 助手",
    subtitle: "用英文说明自然语言查询怎样变成可检查的 SQL 结果。",
    words: [
      ["schema", "/ˈskiːmə/", "数据库结构", "Show the assistant the database schema.", "SKEE-ma，开头是 /sk/"],
      ["table", "/ˈteɪbəl/", "数据表", "The sales table has one row per order.", "TAY-bul，重音在前"],
      ["column", "/ˈkɑləm/", "列；字段", "This column stores the order date.", "COL-um，字母 n 不发音"],
      ["join", "/dʒɔɪn/", "表连接", "Join orders with customer records.", "一个音节，开头 /dʒ/"],
      ["filter", "/ˈfɪltər/", "筛选", "Filter the data by month.", "FIL-ter，重音在前"],
      ["aggregate", "/ˈæɡrɪˌɡeɪt/", "聚合；汇总", "Aggregate sales by region.", "作动词末尾读 /ɡeɪt/"],
      ["dimension", "/dɪˈmenʃən/", "分析维度", "Region is a useful dimension for this report.", "重音在 MEN"],
      ["measure", "/ˈmeʒər/", "度量指标", "Total sales is the main measure.", "MEH-zher，中间是 /ʒ/"],
      ["read-only", "/ˌriːd ˈoʊnli/", "只读的", "Use a read-only database account.", "READ-only，read 读长音 /iː/"],
      ["chart", "/tʃɑrt/", "图表", "Show the monthly trend in a chart.", "一个音节，末尾卷舌"]
    ],
    sentences: [
      { text: "The assistant turns a business question into a read-only SQL query.", translation: "助手把业务问题转成只读 SQL 查询。" },
      { text: "It checks the table schema before choosing columns and joins.", translation: "它会先检查数据表结构，再选择列和表连接。" },
      { text: "The result includes a short explanation and a simple chart.", translation: "结果包含简短解释和一张简单图表。" }
    ]
  },
  {
    id: 17,
    week: 4,
    title: "指标与数据分析",
    subtitle: "练习用英文描述趋势、分组和异常。",
    words: [
      ["metric", "/ˈmetrɪk/", "指标", "Choose one metric for the main chart.", "MET-ric，重音在前"],
      ["trend", "/trend/", "趋势", "The chart shows an upward trend.", "一个音节，/tr/ 连在一起"],
      ["baseline", "/ˈbeɪsˌlaɪn/", "基准值", "Compare this week with the baseline.", "BASE-line，重音在前"],
      ["segment", "/ˈseɡmənt/", "用户群；分组", "Compare each customer segment separately.", "作名词重音在 SEG"],
      ["conversion", "/kənˈvɜrʒən/", "转化；转化率", "Conversion improved after the page update.", "重音在 VER"],
      ["cohort", "/ˈkoʊhɔrt/", "同期用户群", "Analyze the cohort that joined in July.", "CO-hort，重音在前"],
      ["outlier", "/ˈaʊtˌlaɪər/", "异常值", "One large order is an outlier.", "OUT-li-er，重音在前"],
      ["sample", "/ˈsæmpəl/", "样本", "This sample is too small for a strong claim.", "SAM-ple，重音在前"],
      ["insight", "/ˈɪnˌsaɪt/", "洞察；发现", "The report highlights one useful insight.", "IN-sight，重音在前"],
      ["breakdown", "/ˈbreɪkˌdaʊn/", "细分数据", "Show a breakdown by region and product.", "BREAK-down，重音在前"]
    ],
    sentences: [
      { text: "Sales rose overall, but the trend differs by region.", translation: "销售额总体上升，但各地区趋势不同。" },
      { text: "The assistant should explain the metric before showing a chart.", translation: "助手在展示图表前应先解释指标。" },
      { text: "This outlier comes from one unusually large order.", translation: "这个异常值来自一笔特别大的订单。" }
    ]
  },
  {
    id: 18,
    week: 4,
    title: "文档与团队协作",
    subtitle: "练习在需求讨论、评审和交接时表达清楚。",
    words: [
      ["requirement", "/rɪˈkwaɪərmənt/", "需求", "Write the user requirement in plain language.", "重音在 QUIRE"],
      ["scope", "/skoʊp/", "工作范围", "Keep the first release within scope.", "一个音节，开头 /sk/"],
      ["handoff", "/ˈhændˌɔf/", "工作交接", "Prepare a handoff note for the next developer.", "HAND-off，重音在前"],
      ["feedback", "/ˈfiːdˌbæk/", "反馈", "We used user feedback to improve the search.", "FEED-back，重音在前"],
      ["review", "/rɪˈvjuː/", "评审；检查", "Ask a teammate to review the change.", "重音在 VIEW"],
      ["draft", "/dræft/", "草稿", "I wrote a draft of the setup guide.", "一个音节，/æ/ 要张口"],
      ["checklist", "/ˈtʃekˌlɪst/", "检查清单", "Follow the release checklist.", "CHECK-list，重音在前"],
      ["owner", "/ˈoʊnər/", "负责人", "Who is the owner of this task?", "OWN-er，重音在前"],
      ["deadline", "/ˈdedˌlaɪn/", "截止时间", "The deadline is Friday afternoon.", "DEAD-line，重音在前"],
      ["clarify", "/ˈklerəˌfaɪ/", "澄清", "Clarify the question before changing the code.", "CLAR-i-fy，重音在前"]
    ],
    sentences: [
      { text: "Let me clarify the requirement before I start coding.", translation: "开始编码前，我先确认一下需求。" },
      { text: "I added a short setup guide so the team can run the project.", translation: "我加了一份简短的安装指南，方便团队运行项目。" },
      { text: "Please review the draft and share your feedback by Friday.", translation: "请评审这份草稿，并在周五前提出反馈。" }
    ]
  },
  {
    id: 19,
    week: 4,
    title: "产品演示",
    subtitle: "学会向非技术听众展示 AI 应用的价值与边界。",
    words: [
      ["demo", "/ˈdemoʊ/", "演示", "Start the demo with a real user question.", "DEM-o，重音在前"],
      ["scenario", "/səˈnerioʊ/", "使用场景", "This scenario is common in customer support.", "重音在第二音节，末尾 /oʊ/"],
      ["walkthrough", "/ˈwɔkˌθruː/", "分步演示", "Give a short walkthrough of the workflow.", "WALK-through，walk 的 l 不发音"],
      ["feature", "/ˈfiːtʃər/", "功能", "This feature turns questions into charts.", "FEE-chur，重音在前"],
      ["benefit", "/ˈbenəfɪt/", "好处；收益", "The main benefit is faster reporting.", "BEN-e-fit，重音在前"],
      ["limitation", "/ˌlɪmɪˈteɪʃən/", "局限", "Explain one limitation during the demo.", "重音在 TAY"],
      ["evidence", "/ˈevədəns/", "证据；依据", "Use a test result as evidence.", "EV-i-dence，重音在前"],
      ["highlight", "/ˈhaɪˌlaɪt/", "突出展示", "Highlight the time saved for the user.", "HIGH-light，重音在前"],
      ["audience", "/ˈɔdiəns/", "听众", "Keep the audience in mind when you explain SQL.", "AW-di-ence，重音在前"],
      ["question", "/ˈkwestʃən/", "问题；提问", "Leave time for questions at the end.", "QUES-tion，重音在前"]
    ],
    sentences: [
      { text: "I will show how the assistant answers a sales question in seconds.", translation: "我将演示助手如何在几秒内回答销售问题。" },
      { text: "The main benefit is that analysts spend less time writing routine SQL.", translation: "主要好处是分析师花在编写常规 SQL 上的时间更少。" },
      { text: "The assistant can make mistakes, so users can inspect the query.", translation: "助手可能出错，因此用户可以检查生成的查询。" }
    ]
  },
  {
    id: 20,
    week: 4,
    title: "面试与项目介绍",
    subtitle: "用自然的英文介绍项目目标、取舍和成果。",
    words: [
      ["pitch", "/pɪtʃ/", "简短介绍；推介", "Keep your project pitch under two minutes.", "一个音节，结尾 /tʃ/"],
      ["challenge", "/ˈtʃælɪndʒ/", "挑战", "The main challenge was unclear user input.", "CHAL-lenge，重音在前"],
      ["approach", "/əˈproʊtʃ/", "方法；方案", "Our approach combines search with a language model.", "重音在 PROACH"],
      ["impact", "/ˈɪmpækt/", "影响；成效", "Explain the impact with one clear number.", "作名词重音在 IM"],
      ["trade-off", "/ˈtreɪdˌɔf/", "取舍", "The trade-off was speed versus answer detail.", "TRADE-off，重音在前"],
      ["contribute", "/kənˈtrɪbjuːt/", "做出贡献", "I contributed the API and test cases.", "重音在 TRIB"],
      ["collaborate", "/kəˈlæbəˌreɪt/", "协作", "I collaborated with an analyst on the metrics.", "重音在 LAB"],
      ["prioritize", "/praɪˈɔrəˌtaɪz/", "确定优先级", "We prioritized reliable answers over extra features.", "重音在 OR"],
      ["iterate", "/ˈɪtəˌreɪt/", "迭代改进", "We iterated after each round of user feedback.", "IT-er-ate，重音在前"],
      ["outcome", "/ˈaʊtˌkʌm/", "结果", "The outcome was a faster reporting workflow.", "OUT-come，重音在前"]
    ],
    sentences: [
      { text: "I built an AI SQL assistant that helps analysts explore sales data.", translation: "我开发了一个 AI SQL 助手，帮助分析师探索销售数据。" },
      { text: "My main contribution was the API, query checks, and evaluation tests.", translation: "我主要负责 API、查询检查和评估测试。" },
      { text: "We chose a read-only design because reliable results mattered most.", translation: "我们选择了只读设计，因为可靠的结果最重要。" }
    ]
  }
];
