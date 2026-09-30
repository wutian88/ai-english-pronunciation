import { ai } from './ai';
import type { Lesson } from '../types/wordbook';

export const aiLessonsExtraA: Lesson[] = [
  ai(5, 'AI 英语：整理与提取信息', '从长内容中找到真正需要的信息', [
    ['extract', '/ɪkˈstrækt/', '提取', 'Extract the key points from this report.', '从这份报告中提取要点。'],
    ['key point', '/kiː pɔɪnt/', '要点', 'The first key point is about cost.', '第一个要点与成本有关。'],
    ['highlight', '/ˈhaɪˌlaɪt/', '突出；标出', 'Please highlight the main risks.', '请标出主要风险。'],
    ['organize', '/ˈɔːrɡəˌnaɪz/', '整理', 'Organize the notes by topic.', '按主题整理笔记。'],
    ['bullet point', '/ˈbʊlət pɔɪnt/', '项目符号；要点', 'Turn each idea into a bullet point.', '把每个想法写成一个要点。'],
    ['category', '/ˈkætəˌɡɔːri/', '类别', 'Put each request in the right category.', '把每项请求放入正确类别。'],
    ['compare', '/kəmˈpɛr/', '比较', 'Compare the two options for me.', '帮我比较这两个选项。'],
    ['table', '/ˈteɪbəl/', '表格', 'Show the results in a table.', '用表格展示结果。'],
  ], [
    ['Please extract the key points and list them clearly.', '请提取要点并清楚列出。'],
    ['Organize these notes into three categories.', '把这些笔记整理成三个类别。'],
    ['Compare the options in a simple table.', '用简单表格比较这些选项。'],
    ['Highlight anything that needs my attention.', '标出所有需要我注意的内容。'],
  ], [
    ['A', 'This report is too long. Can AI help?', '这份报告太长了，AI 能帮忙吗？'],
    ['B', 'Yes. Ask it to extract the key points.', '可以，让它提取要点。'],
    ['A', 'I also want to compare the options.', '我还想比较这些选项。'],
    ['B', 'Ask for a table with cost, time, and risk.', '让它生成包含成本、时间和风险的表格。'],
  ], [
    ['Ask AI to organize a long set of notes.', '请 AI 整理一组很长的笔记。'],
    ['Ask for a table comparing two choices.', '请 AI 用表格比较两个选择。'],
  ]),
  ai(6, 'AI 英语：邮件与消息', '用 AI 辅助写清楚而自然的工作消息', [
    ['email', '/ˈiːˌmeɪl/', '电子邮件', 'Please draft a short email.', '请起草一封简短邮件。'],
    ['subject line', '/ˈsʌbdʒɪkt laɪn/', '邮件主题', 'The subject line should be clear.', '邮件主题应该清楚。'],
    ['tone', '/toʊn/', '语气', 'Use a polite and friendly tone.', '使用礼貌友好的语气。'],
    ['polite', '/pəˈlaɪt/', '礼貌的', 'Make this request more polite.', '把这个请求写得更礼貌。'],
    ['concise', '/kənˈsaɪs/', '简洁的', 'Keep the message concise.', '让消息保持简洁。'],
    ['follow-up', '/ˈfɑːloʊ ʌp/', '后续消息', 'I need to send a follow-up.', '我需要发一条后续消息。'],
    ['confirm', '/kənˈfɝːm/', '确认', 'Please confirm the meeting time.', '请确认会议时间。'],
    ['call to action', '/kɔːl tu ˈækʃən/', '行动要求', 'Add a clear call to action.', '加入明确的行动要求。'],
  ], [
    ['Please draft a polite email with a clear subject line.', '请起草一封主题明确、语气礼貌的邮件。'],
    ['Keep it concise and end with a clear request.', '保持简洁，并以明确请求结尾。'],
    ['Rewrite this message in a warmer tone.', '用更温和的语气改写这条消息。'],
    ['Write a short follow-up to confirm the deadline.', '写一条简短的后续消息确认截止日期。'],
  ], [
    ['A', 'My email sounds too direct.', '我的邮件听起来太直接了。'],
    ['B', 'Ask AI to make the tone more polite.', '请 AI 把语气改得更礼貌。'],
    ['A', 'Should I make it longer?', '我应该把它写长一点吗？'],
    ['B', 'No. Keep it concise and add a clear request.', '不用，保持简洁并加上明确请求。'],
  ], [
    ['Ask AI to draft a meeting follow-up email.', '请 AI 起草一封会议后的跟进邮件。'],
    ['Ask AI to make a direct message sound more polite.', '请 AI 把一条直接的消息改得更礼貌。'],
  ]),
  ai(7, 'AI 英语：会议助手', '准备议程、记录决定并整理行动项', [
    ['agenda', '/əˈdʒɛndə/', '议程', 'Create an agenda for the meeting.', '为会议创建议程。'],
    ['meeting notes', '/ˈmiːtɪŋ noʊts/', '会议记录', 'Please clean up my meeting notes.', '请整理我的会议记录。'],
    ['action item', '/ˈækʃən ˌaɪtəm/', '行动项', 'Each action item needs an owner.', '每个行动项都需要负责人。'],
    ['deadline', '/ˈdɛdˌlaɪn/', '截止日期', 'The deadline is next Friday.', '截止日期是下周五。'],
    ['decision', '/dɪˈsɪʒən/', '决定', 'List the decisions we made.', '列出我们做出的决定。'],
    ['owner', '/ˈoʊnər/', '负责人', 'Who is the owner of this task?', '这项任务的负责人是谁？'],
    ['minutes', '/ˈmɪnɪts/', '会议纪要', 'Share the minutes after the call.', '通话后分享会议纪要。'],
    ['next step', '/nɛkst stɛp/', '下一步', 'What is the next step?', '下一步是什么？'],
  ], [
    ['Turn these notes into clear meeting minutes.', '把这些笔记整理成清楚的会议纪要。'],
    ['List every decision and action item.', '列出每项决定和行动项。'],
    ['Add an owner and deadline to each task.', '为每项任务添加负责人和截止日期。'],
    ['Create a short agenda for our next meeting.', '为下次会议创建简短议程。'],
  ], [
    ['A', 'Did we record the decisions?', '我们记录决定了吗？'],
    ['B', 'Yes, and AI organized the meeting notes.', '记录了，AI 还整理了会议笔记。'],
    ['A', 'What about the next steps?', '下一步呢？'],
    ['B', 'Each action item now has an owner and deadline.', '每个行动项现在都有负责人和截止日期。'],
  ], [
    ['Ask AI to turn rough notes into meeting minutes.', '请 AI 把粗略笔记整理成会议纪要。'],
    ['Describe one action item with an owner and deadline.', '描述一个包含负责人和截止日期的行动项。'],
  ]),
  ai(8, 'AI 英语：学习与研究', '让 AI 帮你解释、测验和制定学习计划', [
    ['concept', '/ˈkɑːnsɛpt/', '概念', 'Explain this concept in simple terms.', '用简单的话解释这个概念。'],
    ['analogy', '/əˈnælədʒi/', '类比', 'Use an analogy to explain it.', '用类比解释它。'],
    ['quiz', '/kwɪz/', '小测验', 'Create a five-question quiz.', '创建一个五题小测验。'],
    ['flashcard', '/ˈflæʃˌkɑːrd/', '闪卡', 'Turn these terms into flashcards.', '把这些术语做成闪卡。'],
    ['study plan', '/ˈstʌdi plæn/', '学习计划', 'Make a two-week study plan.', '制定一个两周学习计划。'],
    ['difficulty level', '/ˈdɪfɪkəlti ˈlɛvəl/', '难度等级', 'Adjust the difficulty level.', '调整难度等级。'],
    ['practice question', '/ˈpræktɪs ˌkwɛstʃən/', '练习题', 'Give me a practice question.', '给我一道练习题。'],
    ['feedback', '/ˈfiːdˌbæk/', '反馈', 'Give me feedback on my answer.', '对我的回答给出反馈。'],
  ], [
    ['Explain this concept with a simple analogy.', '用简单类比解释这个概念。'],
    ['Give me a short quiz and wait for my answers.', '给我一个简短测验，并等待我回答。'],
    ['Create a study plan for the next two weeks.', '为接下来两周制定学习计划。'],
    ['Check my answer and explain my mistakes.', '检查我的回答并解释错误。'],
  ], [
    ['A', 'I understand the words but not the concept.', '我认识这些词，但不理解概念。'],
    ['B', 'Ask AI for a simple analogy.', '请 AI 用简单类比解释。'],
    ['A', 'How can I check my understanding?', '我怎么检查自己是否理解？'],
    ['B', 'Ask for a quiz and feedback on your answers.', '让它出题并对你的答案给反馈。'],
  ], [
    ['Ask AI to teach you a new concept with an analogy.', '请 AI 用类比教你一个新概念。'],
    ['Ask for a one-week study plan and daily quiz.', '请 AI 制定一周学习计划和每日测验。'],
  ]),
  ai(9, 'AI 英语：图片与视觉内容', '描述想要的图片并调整视觉效果', [
    ['image', '/ˈɪmɪdʒ/', '图片', 'Generate an image for the article.', '为文章生成一张图片。'],
    ['illustration', '/ˌɪləˈstreɪʃən/', '插图', 'I need a simple illustration.', '我需要一幅简单插图。'],
    ['background', '/ˈbækˌɡraʊnd/', '背景', 'Use a clean white background.', '使用干净的白色背景。'],
    ['foreground', '/ˈfɔːrˌɡraʊnd/', '前景', 'Place the product in the foreground.', '把产品放在前景。'],
    ['style', '/staɪl/', '风格', 'Use a modern flat style.', '使用现代扁平风格。'],
    ['layout', '/ˈleɪˌaʊt/', '布局', 'Keep the layout simple.', '保持布局简洁。'],
    ['aspect ratio', '/ˈæspɛkt ˈreɪʃioʊ/', '宽高比', 'Use a square aspect ratio.', '使用正方形宽高比。'],
    ['remove', '/rɪˈmuːv/', '移除', 'Remove the text from the image.', '移除图片中的文字。'],
  ], [
    ['Create a clean illustration with a white background.', '创建一幅白色背景的简洁插图。'],
    ['Put the main object in the center of the image.', '把主体放在图片中央。'],
    ['Use a simple layout and a warm color palette.', '使用简单布局和暖色调。'],
    ['Keep the same style but change the aspect ratio.', '保持相同风格，但改变宽高比。'],
  ], [
    ['A', 'The image looks too busy.', '这张图片看起来太杂乱了。'],
    ['B', 'Ask for a simpler layout and background.', '要求更简单的布局和背景。'],
    ['A', 'I also need it for a phone screen.', '我还需要把它用于手机屏幕。'],
    ['B', 'Then specify a vertical aspect ratio.', '那就指定竖向宽高比。'],
  ], [
    ['Describe a simple image you want AI to create.', '描述一张你想让 AI 创建的简单图片。'],
    ['Ask AI to remove one object and change the background.', '请 AI 移除一个物体并更换背景。'],
  ]),
  ai(10, 'AI 英语：语音与转录', '处理录音、字幕和语音内容', [
    ['speech', '/spiːtʃ/', '语音', 'The speech is clear and natural.', '这段语音清晰自然。'],
    ['transcribe', '/trænˈskraɪb/', '转录', 'Please transcribe this recording.', '请转录这段录音。'],
    ['transcript', '/ˈtrænˌskrɪpt/', '文字稿', 'Check the transcript for errors.', '检查文字稿中的错误。'],
    ['subtitle', '/ˈsʌbˌtaɪtəl/', '字幕', 'Add English subtitles to the video.', '给视频添加英文字幕。'],
    ['speaker', '/ˈspiːkər/', '说话人', 'Label each speaker in the transcript.', '在文字稿中标记每位说话人。'],
    ['background noise', '/ˈbækˌɡraʊnd nɔɪz/', '背景噪音', 'There is too much background noise.', '背景噪音太大。'],
    ['voice', '/vɔɪs/', '声音；语音', 'Choose a calm English voice.', '选择平静的英文语音。'],
    ['pronunciation', '/prəˌnʌnsiˈeɪʃən/', '发音', 'The pronunciation sounds natural.', '这个发音听起来自然。'],
  ], [
    ['Please transcribe the recording and label each speaker.', '请转录录音并标记每位说话人。'],
    ['Turn the transcript into short meeting notes.', '把文字稿整理成简短会议笔记。'],
    ['Add clear English subtitles to the video.', '给视频添加清晰的英文字幕。'],
    ['Use a slower voice with natural pronunciation.', '使用更慢且发音自然的声音。'],
  ], [
    ['A', 'The transcript has several mistakes.', '这份文字稿有几个错误。'],
    ['B', 'The background noise may be the problem.', '可能是背景噪音造成的。'],
    ['A', 'Can AI separate the speakers?', 'AI 能区分说话人吗？'],
    ['B', 'Yes. Ask it to label each speaker.', '可以，让它标记每位说话人。'],
  ], [
    ['Ask AI to transcribe and summarize a recording.', '请 AI 转录并总结一段录音。'],
    ['Describe the English voice and speed you prefer.', '描述你喜欢的英文声音和速度。'],
  ]),
  ai(11, 'AI 英语：数据分析基础', '用简单英语讨论数据、趋势和图表', [
    ['data', '/ˈdeɪtə/', '数据', 'We need to clean the data first.', '我们需要先清理数据。'],
    ['dataset', '/ˈdeɪtəˌsɛt/', '数据集', 'This dataset has five columns.', '这个数据集有五列。'],
    ['trend', '/trɛnd/', '趋势', 'The chart shows an upward trend.', '图表显示上升趋势。'],
    ['pattern', '/ˈpætərn/', '模式；规律', 'I found a pattern in the sales data.', '我在销售数据中发现了规律。'],
    ['average', '/ˈævərɪdʒ/', '平均值', 'The average is higher this month.', '本月平均值更高。'],
    ['chart', '/tʃɑːrt/', '图表', 'Create a chart from these numbers.', '根据这些数字创建图表。'],
    ['column', '/ˈkɑːləm/', '列', 'Rename this column to total cost.', '把这一列重命名为总成本。'],
    ['insight', '/ˈɪnˌsaɪt/', '洞察', 'What is the main insight?', '主要洞察是什么？'],
  ], [
    ['Analyze the dataset and describe the main trend.', '分析数据集并描述主要趋势。'],
    ['Create a chart that compares monthly sales.', '创建比较月度销售额的图表。'],
    ['Calculate the average and explain the result.', '计算平均值并解释结果。'],
    ['Tell me which patterns are worth checking.', '告诉我哪些规律值得核查。'],
  ], [
    ['A', 'What does this chart show?', '这张图表说明了什么？'],
    ['B', 'It shows an upward trend in online sales.', '它显示线上销售呈上升趋势。'],
    ['A', 'Is there any unusual pattern?', '有异常规律吗？'],
    ['B', 'Yes. One month is far below the average.', '有，一个月的数据远低于平均值。'],
  ], [
    ['Ask AI to explain a chart in simple English.', '请 AI 用简单英语解释一张图表。'],
    ['Describe a trend and one possible reason for it.', '描述一个趋势及其一个可能原因。'],
  ]),
  ai(12, 'AI 英语：表格与自动化', '让重复的办公任务更省时间', [
    ['spreadsheet', '/ˈsprɛdˌʃiːt/', '电子表格', 'Open the data in a spreadsheet.', '在电子表格中打开数据。'],
    ['formula', '/ˈfɔːrmjələ/', '公式', 'Write a formula for the total.', '写一个计算总数的公式。'],
    ['row', '/roʊ/', '行', 'Delete the empty rows.', '删除空行。'],
    ['filter', '/ˈfɪltər/', '筛选', 'Filter the list by date.', '按日期筛选列表。'],
    ['sort', '/sɔːrt/', '排序', 'Sort the values from high to low.', '把数值从高到低排序。'],
    ['duplicate', '/ˈduːplɪkət/', '重复项', 'Remove duplicate records.', '删除重复记录。'],
    ['automate', '/ˈɔːtəˌmeɪt/', '自动化', 'We can automate this weekly task.', '我们可以自动化这项每周任务。'],
    ['workflow', '/ˈwɝːkˌfloʊ/', '工作流程', 'The new workflow saves time.', '新工作流程节省时间。'],
  ], [
    ['Write a formula that adds the values in this column.', '写一个把这一列数值相加的公式。'],
    ['Remove duplicates and sort the rows by date.', '删除重复项并按日期排序。'],
    ['Explain this spreadsheet formula step by step.', '逐步解释这个电子表格公式。'],
    ['Suggest a safe way to automate this workflow.', '建议一种安全的工作流程自动化方法。'],
  ], [
    ['A', 'I do the same spreadsheet task every Monday.', '我每周一都做同样的表格任务。'],
    ['B', 'It may be a good task to automate.', '这可能很适合自动化。'],
    ['A', 'What should I check first?', '我应该先检查什么？'],
    ['B', 'Write down each step and test the workflow on a copy.', '写下每一步，并在副本上测试流程。'],
  ], [
    ['Ask AI to explain a spreadsheet formula.', '请 AI 解释一个电子表格公式。'],
    ['Describe a repetitive task you want to automate.', '描述一项你想自动化的重复任务。'],
  ]),
];
