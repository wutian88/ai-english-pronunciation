import type { Lesson } from '../types/wordbook';

export type WordSeed = [word: string, phonetic: string, translation: string, exampleEn: string, exampleZh: string];
export type SentenceSeed = [en: string, zh: string, notes?: string];
export type DialogueSeed = [speaker: 'A' | 'B', en: string, zh: string];
export type PromptSeed = [en: string, zh: string];

export function ai(
  order: number,
  title: string,
  subtitle: string,
  words: WordSeed[],
  sentences: SentenceSeed[],
  dialogue: DialogueSeed[],
  prompts: PromptSeed[],
): Lesson {
  const id = `a${String(order).padStart(2, '0')}`;
  return {
    id,
    track: 'ai',
    order,
    week: Math.ceil(order / 4),
    title,
    subtitle,
    words: words.map(([word, phonetic, translation, en, zh], index) => ({
      id: `${id}-w${String(index + 1).padStart(2, '0')}`,
      word,
      phonetic,
      translation,
      category: 'ai',
      examples: [{ en, zh }],
    })),
    sentences: sentences.map(([en, zh, notes], index) => ({
      id: `${id}-s${String(index + 1).padStart(2, '0')}`,
      en,
      zh,
      ...(notes ? { notes } : {}),
    })),
    dialogue: dialogue.map(([speaker, en, zh]) => ({ speaker, en, zh })),
    practicePrompts: prompts.map(([en, zh]) => ({ en, zh })),
  };
}

// An independent elective track: no lesson or progress prerequisite from the daily track.
export const aiLessons: Lesson[] = [
  ai(1, 'AI 英语：工具与用途', '用简单英语介绍常见 AI 工具', [
    ['AI tool', '/ˌeɪ ˈaɪ tuːl/', 'AI 工具', 'I use an AI tool to study English.', '我用 AI 工具学英语。'],
    ['chatbot', '/ˈtʃætˌbɑːt/', '聊天机器人', 'The chatbot can answer simple questions.', '聊天机器人能回答简单问题。'],
    ['generate', '/ˈdʒɛnəˌreɪt/', '生成', 'It can generate a short draft.', '它能生成一份简短初稿。'],
    ['summarize', '/ˈsʌməˌraɪz/', '总结', 'Please summarize this article.', '请总结这篇文章。'],
    ['translate', '/trænzˈleɪt/', '翻译', 'It can translate this sentence.', '它能翻译这句话。'],
    ['draft', '/dræft/', '草稿', 'This is only a first draft.', '这只是一份初稿。'],
    ['helpful', '/ˈhɛlpfəl/', '有帮助的', 'This tool is helpful for writing.', '这个工具对写作有帮助。'],
    ['not always right', '/nɑːt ˈɔːlweɪz raɪt/', '并非总是正确', 'AI is not always right.', 'AI 并非总是正确。'],
  ], [
    ['I use an AI tool to practice English.', '我用 AI 工具练习英语。'],
    ['It can summarize a long article in a few lines.', '它能把长文章总结成几行。'],
    ['It can help me make a first draft.', '它能帮我写一份初稿。'],
    ['It is helpful, but it is not always right.', '它很有帮助，但并非总是正确。'],
  ], [
    ['A', 'Do you use any AI tools?', '你用 AI 工具吗？'],
    ['B', 'Yes. I use a chatbot to practice English.', '用。我用聊天机器人练习英语。'],
    ['A', 'What else can it do?', '它还能做什么？'],
    ['B', 'It can summarize text and help me write a draft.', '它能总结文本，还能帮我写初稿。'],
  ], [
    ['Describe one way you use an AI tool.', '说说你使用 AI 工具的一种方式。'],
    ['Explain one thing AI can do and one thing it cannot guarantee.', '说出 AI 能做的一件事和不能保证的一件事。'],
  ]),
  ai(2, 'AI 英语：清楚地提要求', '用自然英语写出更有效的提示', [
    ['prompt', '/prɑːmpt/', '提示词；请求', 'I wrote a clear prompt.', '我写了一条清楚的提示词。'],
    ['specific', '/spəˈsɪfɪk/', '具体的', 'Please be more specific.', '请更具体一些。'],
    ['context', '/ˈkɑːntɛkst/', '背景信息', 'Give the tool some context.', '给工具一些背景信息。'],
    ['example', '/ɪɡˈzæmpəl/', '例子', 'Can you give me an example?', '你能给我一个例子吗？'],
    ['step by step', '/stɛp baɪ stɛp/', '一步一步地', 'Explain it step by step.', '请一步一步解释。'],
    ['shorter', '/ˈʃɔːrtər/', '更短的', 'Could you make it shorter?', '你能把它写短一点吗？'],
    ['simple language', '/ˈsɪmpəl ˈlæŋɡwɪdʒ/', '简单的语言', 'Use simple language, please.', '请用简单的语言。'],
    ['rewrite', '/ˌriːˈraɪt/', '改写', 'Please rewrite this email.', '请改写这封邮件。'],
  ], [
    ['Please explain this in simple language.', '请用简单的语言解释这个。'],
    ['Could you give me a short example?', '你能给我一个简短的例子吗？'],
    ['Please rewrite this message in a friendly tone.', '请用友好的语气改写这条消息。'],
    ['Could you make the answer shorter and more specific?', '你能把答案写得更短、更具体吗？'],
  ], [
    ['A', 'The answer is too long. What should I ask?', '答案太长了。我该怎么问？'],
    ['B', 'Try saying, “Could you make it shorter?”', '试着说：“你能把它写短一点吗？”'],
    ['A', 'I also need a simple example.', '我还需要一个简单的例子。'],
    ['B', 'Then ask, “Can you explain it step by step with an example?”', '那就问：“你能结合例子一步一步解释吗？”'],
  ], [
    ['Ask an AI tool to explain a difficult idea in simple English.', '请 AI 工具用简单英语解释一个难懂的概念。'],
    ['Ask for a shorter, friendlier rewrite of a message.', '请 AI 把一条消息改写得更短、更友好。'],
  ]),
  ai(3, 'AI 英语：核实输出', '用英语检查事实与修正错误', [
    ['result', '/rɪˈzʌlt/', '结果', 'The result looks useful.', '结果看起来有用。'],
    ['accurate', '/ˈækjərət/', '准确的', 'Is this answer accurate?', '这个答案准确吗？'],
    ['fact', '/fækt/', '事实', 'We need to check the facts.', '我们需要核实事实。'],
    ['source', '/sɔːrs/', '来源', 'What is the source?', '来源是什么？'],
    ['mistake', '/mɪˈsteɪk/', '错误', 'I found a mistake.', '我发现一个错误。'],
    ['verify', '/ˈvɛrəˌfaɪ/', '核实', 'Please verify this information.', '请核实这条信息。'],
    ['out of date', '/aʊt əv deɪt/', '过时的', 'This information may be out of date.', '这条信息可能已经过时。'],
    ['cross-check', '/ˌkrɔːs ˈtʃɛk/', '交叉核对', 'I will cross-check the numbers.', '我会交叉核对数字。'],
  ], [
    ['This answer sounds good, but I need to check the facts.', '这个答案听起来不错，但我需要核实事实。'],
    ['Can you show me the source for that claim?', '你能告诉我那个说法的来源吗？'],
    ['The information may be out of date.', '这些信息可能已经过时。'],
    ['I found a mistake, so I will double-check the result.', '我发现了一个错误，所以会再次核对结果。'],
  ], [
    ['A', 'Can we use this AI summary in our report?', '我们能在报告中使用这份 AI 摘要吗？'],
    ['B', 'Maybe, but we should check the facts first.', '也许可以，但我们应该先核实事实。'],
    ['A', 'Good idea. One number looks out of date.', '好主意。有个数字看起来过时了。'],
    ['B', 'Let us find the original source and verify it.', '我们找原始来源核实一下吧。'],
  ], [
    ['Tell a friend why you would double-check an AI answer.', '告诉朋友为什么你会再次核对 AI 的答案。'],
    ['Ask for a source and explain that a fact may be out of date.', '询问来源，并说明某项事实可能已过时。'],
  ]),
  ai(4, 'AI 英语：隐私与负责任使用', '讨论安全输入和人工判断', [
    ['privacy', '/ˈpraɪvəsi/', '隐私', 'Privacy matters to me.', '隐私对我很重要。'],
    ['personal information', '/ˈpɝːsənəl ˌɪnfərˈmeɪʃən/', '个人信息', 'Do not share personal information.', '不要分享个人信息。'],
    ['sensitive', '/ˈsɛnsətɪv/', '敏感的', 'This file contains sensitive data.', '这个文件包含敏感数据。'],
    ['permission', '/pərˈmɪʃən/', '许可', 'Ask for permission first.', '先征求许可。'],
    ['share', '/ʃɛr/', '分享', 'I do not want to share my password.', '我不想分享密码。'],
    ['review', '/rɪˈvjuː/', '审查；检查', 'A person should review the final answer.', '最终答案应该由人检查。'],
    ['human judgment', '/ˈhjuːmən ˈdʒʌdʒmənt/', '人的判断', 'Human judgment still matters.', '人的判断仍然重要。'],
    ['responsible', '/rɪˈspɑːnsəbəl/', '负责任的', 'We should use AI in a responsible way.', '我们应该负责任地使用 AI。'],
  ], [
    ['I do not put passwords into an AI tool.', '我不会把密码输入 AI 工具。'],
    ['This document has personal information, so I should not share it.', '这份文件有个人信息，所以我不该分享。'],
    ['AI can help with a draft, but a person should review it.', 'AI 可以帮忙写初稿，但人应该检查。'],
    ['I use the tool for ideas and make the final decision myself.', '我用工具找思路，最终决定自己做。'],
  ], [
    ['A', 'Can I paste this customer file into an AI tool?', '我能把这份客户文件粘贴到 AI 工具里吗？'],
    ['B', 'It contains sensitive information, so do not share it.', '它包含敏感信息，所以不要分享。'],
    ['A', 'Could I use a version without personal details?', '我可以使用删掉个人信息的版本吗？'],
    ['B', 'Check the rules and get permission first.', '先确认规定并获得许可。'],
  ], [
    ['Explain one kind of information you should not share with an AI tool.', '说出一种不应分享给 AI 工具的信息，并解释原因。'],
    ['Explain why a person should review an AI-written draft.', '解释为什么人应该检查 AI 写的初稿。'],
  ]),
];
