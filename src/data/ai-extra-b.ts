import { ai } from './ai';
import type { Lesson } from '../types/wordbook';

export const aiLessonsExtraB: Lesson[] = [
  ai(13, 'AI 英语：编程助手', '用英语描述代码问题和修改要求', [
    ['code', '/koʊd/', '代码', 'Please explain this code.', '请解释这段代码。'],
    ['function', '/ˈfʌŋkʃən/', '函数', 'This function returns a list.', '这个函数返回一个列表。'],
    ['bug', '/bʌɡ/', '程序错误', 'There is a bug in the login flow.', '登录流程中有一个错误。'],
    ['error message', '/ˈɛrər ˌmɛsɪdʒ/', '错误信息', 'Copy the full error message.', '复制完整的错误信息。'],
    ['debug', '/ˌdiːˈbʌɡ/', '调试', 'Help me debug this script.', '帮我调试这个脚本。'],
    ['test case', '/tɛst keɪs/', '测试用例', 'Add a test case for an empty input.', '为空输入添加一个测试用例。'],
    ['refactor', '/ˌriːˈfæktər/', '重构', 'Refactor the code to make it clearer.', '重构代码使其更清晰。'],
    ['documentation', '/ˌdɑːkjəmɛnˈteɪʃən/', '文档', 'Update the documentation after the change.', '修改后更新文档。'],
  ], [
    ['Explain what this function does in simple English.', '用简单英语解释这个函数的作用。'],
    ['Find the cause of the error before changing the code.', '修改代码前先找出错误原因。'],
    ['Add test cases for empty and invalid input.', '为空输入和无效输入添加测试用例。'],
    ['Refactor this code without changing its behavior.', '在不改变行为的情况下重构代码。'],
  ], [
    ['A', 'The script fails, but I do not know why.', '脚本失败了，但我不知道原因。'],
    ['B', 'Share the code and the full error message.', '提供代码和完整错误信息。'],
    ['A', 'Should I ask AI to rewrite everything?', '我应该让 AI 全部重写吗？'],
    ['B', 'No. Ask it to explain the bug and make a small fix.', '不用，让它解释错误并做小范围修复。'],
  ], [
    ['Describe a bug and ask AI to diagnose it.', '描述一个程序错误并请 AI 诊断。'],
    ['Ask AI to add tests without changing behavior.', '请 AI 在不改变行为的情况下添加测试。'],
  ]),
  ai(14, 'AI 英语：模型与训练', '理解常见的 AI 模型基础术语', [
    ['model', '/ˈmɑːdəl/', '模型', 'The model can process text and images.', '这个模型可以处理文本和图片。'],
    ['training data', '/ˈtreɪnɪŋ ˈdeɪtə/', '训练数据', 'Training data affects model behavior.', '训练数据会影响模型行为。'],
    ['parameter', '/pəˈræmɪtər/', '参数', 'A large model has many parameters.', '大型模型有很多参数。'],
    ['train', '/treɪn/', '训练', 'It takes time to train a model.', '训练模型需要时间。'],
    ['fine-tune', '/ˌfaɪn ˈtuːn/', '微调', 'The team fine-tuned the model for support.', '团队为客服场景微调了模型。'],
    ['inference', '/ˈɪnfərəns/', '推理', 'Inference happens when the model answers.', '模型回答时会进行推理。'],
    ['input', '/ˈɪnˌpʊt/', '输入', 'The model needs clear input.', '模型需要清楚的输入。'],
    ['output', '/ˈaʊtˌpʊt/', '输出', 'Review the output before using it.', '使用前检查输出。'],
  ], [
    ['A model learns patterns from training data.', '模型从训练数据中学习规律。'],
    ['Fine-tuning can adapt a model to a specific task.', '微调可以让模型适应特定任务。'],
    ['The same input may not always produce the same output.', '相同输入不一定总会产生相同输出。'],
    ['Inference is the process of generating an answer.', '推理是生成答案的过程。'],
  ], [
    ['A', 'What is the difference between training and inference?', '训练和推理有什么区别？'],
    ['B', 'Training teaches the model, while inference uses it.', '训练让模型学习，推理则使用模型。'],
    ['A', 'What does fine-tuning do?', '微调有什么作用？'],
    ['B', 'It adapts a model to a narrower task or style.', '它让模型适应更具体的任务或风格。'],
  ], [
    ['Explain training and inference in your own words.', '用自己的话解释训练和推理。'],
    ['Describe how input affects model output.', '描述输入如何影响模型输出。'],
  ]),
  ai(15, 'AI 英语：大语言模型', '掌握生成式 AI 的高频术语', [
    ['language model', '/ˈlæŋɡwɪdʒ ˈmɑːdəl/', '语言模型', 'A language model predicts text.', '语言模型预测文本。'],
    ['token', '/ˈtoʊkən/', '词元', 'The text is divided into tokens.', '文本会被分成词元。'],
    ['context window', '/ˈkɑːntɛkst ˈwɪndoʊ/', '上下文窗口', 'The document exceeds the context window.', '文档超出了上下文窗口。'],
    ['response', '/rɪˈspɑːns/', '回答', 'The response is clear but incomplete.', '回答很清楚但不完整。'],
    ['hallucination', '/həˌluːsəˈneɪʃən/', '幻觉；虚构信息', 'The citation may be a hallucination.', '这条引用可能是模型虚构的。'],
    ['temperature', '/ˈtɛmprətʃər/', '温度参数', 'A higher temperature can add variety.', '更高的温度可以增加多样性。'],
    ['multimodal', '/ˌmʌltiˈmoʊdəl/', '多模态的', 'A multimodal model can understand images.', '多模态模型可以理解图片。'],
    ['reasoning', '/ˈriːzənɪŋ/', '推理过程', 'This task requires careful reasoning.', '这项任务需要仔细推理。'],
  ], [
    ['The context window limits how much text the model can use.', '上下文窗口限制模型可使用的文本量。'],
    ['A confident response can still contain a hallucination.', '听起来很自信的回答仍可能包含幻觉。'],
    ['A multimodal model can work with more than text.', '多模态模型处理的不只是文本。'],
    ['Token usage affects the length and cost of a request.', '词元用量会影响请求长度和成本。'],
  ], [
    ['A', 'Why did the model forget the start of the document?', '模型为什么忘了文档开头？'],
    ['B', 'The document may exceed its context window.', '文档可能超出了它的上下文窗口。'],
    ['A', 'Can I trust a confident answer?', '我能相信一个很自信的回答吗？'],
    ['B', 'Check the facts because hallucinations can sound convincing.', '要核实事实，因为幻觉也可能听起来很可信。'],
  ], [
    ['Explain what a context window is.', '解释什么是上下文窗口。'],
    ['Describe why hallucinations need fact-checking.', '描述为什么模型幻觉需要事实核查。'],
  ]),
  ai(16, 'AI 英语：搜索与知识库', '检索文件并根据可靠资料回答', [
    ['search query', '/sɝːtʃ ˈkwɪri/', '搜索查询', 'Make the search query more specific.', '让搜索查询更具体。'],
    ['keyword', '/ˈkiːˌwɝːd/', '关键词', 'Use the product name as a keyword.', '把产品名称作为关键词。'],
    ['retrieve', '/rɪˈtriːv/', '检索', 'The system retrieves relevant documents.', '系统检索相关文档。'],
    ['relevant', '/ˈrɛləvənt/', '相关的', 'Only show relevant results.', '只显示相关结果。'],
    ['knowledge base', '/ˈnɑːlɪdʒ beɪs/', '知识库', 'The answer comes from our knowledge base.', '答案来自我们的知识库。'],
    ['document', '/ˈdɑːkjəmənt/', '文档', 'Open the original document.', '打开原始文档。'],
    ['citation', '/saɪˈteɪʃən/', '引用', 'Add a citation to each claim.', '为每项说法添加引用。'],
    ['evidence', '/ˈɛvɪdəns/', '证据', 'The evidence does not support that claim.', '证据不支持那项说法。'],
  ], [
    ['Search the knowledge base for the latest policy.', '在知识库中搜索最新政策。'],
    ['Answer only from the provided documents.', '只根据提供的文档回答。'],
    ['Add a citation after every important claim.', '在每项重要说法后添加引用。'],
    ['Tell me when the evidence is missing or unclear.', '证据缺失或不清楚时告诉我。'],
  ], [
    ['A', 'Where did this answer come from?', '这个答案来自哪里？'],
    ['B', 'It was retrieved from our knowledge base.', '它是从我们的知识库中检索出来的。'],
    ['A', 'Can I see the evidence?', '我能查看证据吗？'],
    ['B', 'Yes. Each claim includes a citation to the source document.', '可以，每项说法都带有原始文档引用。'],
  ], [
    ['Ask AI to search a knowledge base with clear keywords.', '请 AI 使用清楚的关键词搜索知识库。'],
    ['Ask for an answer with citations and evidence.', '要求回答包含引用和证据。'],
  ]),
  ai(17, 'AI 英语：智能体与工具', '理解 AI 如何分步骤调用工具完成任务', [
    ['agent', '/ˈeɪdʒənt/', '智能体', 'The agent can complete several steps.', '智能体可以完成多个步骤。'],
    ['tool call', '/tuːl kɔːl/', '工具调用', 'The agent made a tool call.', '智能体进行了一次工具调用。'],
    ['task', '/tæsk/', '任务', 'Break the task into smaller steps.', '把任务拆成更小的步骤。'],
    ['plan', '/plæn/', '计划', 'Review the plan before execution.', '执行前检查计划。'],
    ['execute', '/ˈɛksəˌkjuːt/', '执行', 'The agent is ready to execute the plan.', '智能体准备执行计划。'],
    ['approval', '/əˈpruːvəl/', '批准；确认', 'Ask for approval before sending the email.', '发送邮件前请求确认。'],
    ['permission', '/pərˈmɪʃən/', '权限', 'The tool does not have permission.', '这个工具没有权限。'],
    ['result', '/rɪˈzʌlt/', '结果', 'Check the result after every step.', '每一步之后都检查结果。'],
  ], [
    ['The agent should make a plan before using tools.', '智能体使用工具前应该制定计划。'],
    ['Some actions require permission or approval.', '有些操作需要权限或确认。'],
    ['Check the result before moving to the next step.', '进入下一步前检查结果。'],
    ['Stop the task if an important step fails.', '如果重要步骤失败，就停止任务。'],
  ], [
    ['A', 'Can the agent send the email automatically?', '智能体能自动发送邮件吗？'],
    ['B', 'It can prepare it, but it should ask for approval first.', '它可以准备邮件，但应该先请求确认。'],
    ['A', 'What if a tool call fails?', '如果工具调用失败怎么办？'],
    ['B', 'It should report the failure and avoid unsafe next steps.', '它应该报告失败，并避免不安全的后续操作。'],
  ], [
    ['Describe a task an AI agent could complete in steps.', '描述一项 AI 智能体可分步完成的任务。'],
    ['Explain when an agent should ask for approval.', '解释智能体何时应该请求确认。'],
  ]),
  ai(18, 'AI 英语：评估与改进', '判断输出质量并持续优化', [
    ['evaluate', '/ɪˈvæljuˌeɪt/', '评估', 'We need to evaluate the model.', '我们需要评估这个模型。'],
    ['quality', '/ˈkwɑːləti/', '质量', 'The answer quality has improved.', '回答质量已经提高。'],
    ['criteria', '/kraɪˈtɪriə/', '标准', 'Define the evaluation criteria first.', '先定义评估标准。'],
    ['score', '/skɔːr/', '评分', 'Give each answer a score from one to five.', '给每个回答打一到五分。'],
    ['benchmark', '/ˈbɛntʃˌmɑːrk/', '基准测试', 'Run the model on the same benchmark.', '让模型运行相同的基准测试。'],
    ['edge case', '/ɛdʒ keɪs/', '边缘情况', 'This edge case causes a failure.', '这个边缘情况会导致失败。'],
    ['consistent', '/kənˈsɪstənt/', '一致的', 'The results are not consistent yet.', '结果还不够一致。'],
    ['improve', '/ɪmˈpruːv/', '改进', 'How can we improve the prompt?', '我们如何改进提示词？'],
  ], [
    ['Define clear criteria before evaluating the answers.', '评估回答前先定义清楚的标准。'],
    ['Test normal examples and difficult edge cases.', '测试普通示例和困难的边缘情况。'],
    ['Use the same benchmark when comparing models.', '比较模型时使用相同基准测试。'],
    ['Look for consistent quality, not one good result.', '关注稳定质量，而不是一次好结果。'],
  ], [
    ['A', 'This model gave one excellent answer.', '这个模型给出了一次很好的回答。'],
    ['B', 'One answer is not enough to evaluate it.', '一个回答不足以评估它。'],
    ['A', 'What else should we test?', '我们还应该测试什么？'],
    ['B', 'Use clear criteria, more examples, and edge cases.', '使用明确标准、更多示例和边缘情况。'],
  ], [
    ['Create three criteria for a good AI answer.', '为优秀的 AI 回答制定三项标准。'],
    ['Explain why edge cases matter in evaluation.', '解释边缘情况为何对评估很重要。'],
  ]),
  ai(19, 'AI 英语：偏见与公平', '讨论数据偏差、公平和包容性', [
    ['bias', '/ˈbaɪəs/', '偏见；偏差', 'The results may contain bias.', '结果可能包含偏差。'],
    ['fairness', '/ˈfɛrnəs/', '公平性', 'Fairness is important in this system.', '公平性在这个系统中很重要。'],
    ['balanced', '/ˈbælənst/', '平衡的', 'Use a more balanced dataset.', '使用更平衡的数据集。'],
    ['representation', '/ˌrɛprɪzɛnˈteɪʃən/', '代表性', 'The data lacks broad representation.', '数据缺少广泛的代表性。'],
    ['inclusive', '/ɪnˈkluːsɪv/', '包容的', 'Use inclusive language in the message.', '在消息中使用包容性语言。'],
    ['assumption', '/əˈsʌmpʃən/', '假设', 'The answer makes an unfair assumption.', '这个回答做出了不公平的假设。'],
    ['impact', '/ˈɪmˌpækt/', '影响', 'We should study the impact on different groups.', '我们应研究它对不同群体的影响。'],
    ['human review', '/ˈhjuːmən rɪˈvjuː/', '人工审核', 'High-impact decisions need human review.', '高影响决策需要人工审核。'],
  ], [
    ['Training data can introduce bias into a model.', '训练数据可能把偏差带入模型。'],
    ['Check the impact on different groups of people.', '检查它对不同人群的影响。'],
    ['Use inclusive language and avoid unfair assumptions.', '使用包容性语言并避免不公平假设。'],
    ['Important decisions should include human review.', '重要决策应该包含人工审核。'],
  ], [
    ['A', 'The model works well for most users.', '模型对大多数用户表现很好。'],
    ['B', 'We should also check smaller groups.', '我们也应该检查较小群体。'],
    ['A', 'What if the results are different?', '如果结果不同怎么办？'],
    ['B', 'Investigate the bias and add human review.', '调查偏差并加入人工审核。'],
  ], [
    ['Explain one way bias can enter an AI system.', '解释偏差进入 AI 系统的一种方式。'],
    ['Describe why human review matters for important decisions.', '描述人工审核为何对重要决策很重要。'],
  ]),
  ai(20, 'AI 英语：项目与未来趋势', '介绍 AI 项目并讨论下一步发展', [
    ['use case', '/juːs keɪs/', '使用场景', 'Customer support is our first use case.', '客户支持是我们的第一个使用场景。'],
    ['prototype', '/ˈproʊtəˌtaɪp/', '原型', 'We built a small prototype.', '我们构建了一个小型原型。'],
    ['pilot', '/ˈpaɪlət/', '试点', 'The pilot will run for one month.', '试点将运行一个月。'],
    ['launch', '/lɔːntʃ/', '发布；上线', 'We plan to launch in June.', '我们计划六月上线。'],
    ['adoption', '/əˈdɑːpʃən/', '采用情况', 'User adoption is growing slowly.', '用户采用率在缓慢增长。'],
    ['benefit', '/ˈbɛnəfɪt/', '益处', 'The main benefit is faster service.', '主要益处是服务更快。'],
    ['limitation', '/ˌlɪməˈteɪʃən/', '局限', 'Every model has limitations.', '每个模型都有局限。'],
    ['future', '/ˈfjuːtʃər/', '未来', 'AI tools will continue to change.', 'AI 工具会继续变化。'],
  ], [
    ['Start with a clear use case and a small prototype.', '从明确的使用场景和小型原型开始。'],
    ['Run a pilot before a full launch.', '全面上线前先进行试点。'],
    ['Measure the benefits, risks, and user adoption.', '衡量益处、风险和用户采用情况。'],
    ['Be clear about the limitations of the system.', '清楚说明系统的局限。'],
  ], [
    ['A', 'Are we ready to launch the AI assistant?', '我们准备好上线 AI 助手了吗？'],
    ['B', 'Not yet. We should run a small pilot first.', '还没有，我们应该先做小规模试点。'],
    ['A', 'What should we measure?', '我们应该衡量什么？'],
    ['B', 'Measure quality, time saved, risks, and user adoption.', '衡量质量、节省时间、风险和用户采用情况。'],
  ], [
    ['Introduce an AI use case and its main benefit.', '介绍一个 AI 使用场景及其主要益处。'],
    ['Describe one AI limitation and a safe next step.', '描述一个 AI 局限和安全的下一步。'],
  ]),
];
