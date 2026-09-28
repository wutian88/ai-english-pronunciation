import type { Lesson, WordItem } from '../types/wordbook';

type WordRow = [word: string, ipa: string, zh: string, exampleEn: string, exampleZh: string, linkingNotes?: string];
type SentenceRow = [en: string, zh: string, notes: string];
type DialogueRow = [speaker: 'A' | 'B', en: string, zh: string];
type PromptRow = [en: string, zh: string];

function dailyLesson(
  order: number,
  title: string,
  subtitle: string,
  wordRows: WordRow[],
  sentenceRows: SentenceRow[],
  dialogueRows: DialogueRow[],
  promptRows: PromptRow[],
): Lesson {
  const prefix = `d${String(order).padStart(2, '0')}`;
  const words: WordItem[] = wordRows.map(([word, phonetic, translation, en, zh, linkingNotes], index) => ({
    id: `${prefix}-w${String(index + 1).padStart(2, '0')}`,
    word,
    phonetic,
    translation,
    category: 'daily',
    ...(linkingNotes ? { linkingNotes } : {}),
    examples: [{ en, zh }],
  }));

  return {
    id: prefix,
    track: 'daily',
    order,
    week: Math.ceil(order / 5),
    title,
    subtitle,
    words,
    sentences: sentenceRows.map(([en, zh, notes], index) => ({
      id: `${prefix}-s${String(index + 1).padStart(2, '0')}`,
      en,
      zh,
      notes,
    })),
    dialogue: dialogueRows.map(([speaker, en, zh]) => ({ speaker, en, zh })),
    practicePrompts: promptRows.map(([en, zh]) => ({ en, zh })),
  };
}

export const dailyLessonsA: Lesson[] = [
  dailyLesson(1, '自然打招呼', '从寒暄开始，不必想复杂句子', [
    ['hello', '/həˈloʊ/', '你好', 'Hello, I am Mia.', '你好，我是米娅。'],
    ['good morning', '/ɡʊd ˈmɔrnɪŋ/', '早上好', 'Good morning! Did you sleep well?', '早上好！你睡得好吗？'],
    ["How's it going?", '/haʊz ɪt ˈɡoʊɪŋ/', '最近怎么样？', "Hey, how's it going?", '嘿，最近怎么样？', 'How is 常缩成 How\'s，it 与 going 连起来读。'],
    ['pretty good', '/ˈprɪti ɡʊd/', '挺好的', "I'm pretty good, thanks.", '我挺好的，谢谢。'],
    ['nice to meet you', '/naɪs tə ˈmit ju/', '很高兴认识你', 'Nice to meet you, Alex.', '很高兴认识你，亚历克斯。', 'to 常弱读 /tə/。'],
    ['my name is', '/maɪ neɪm ɪz/', '我的名字是', 'My name is Chen.', '我叫陈。'],
    ['I work in', '/aɪ wɝk ɪn/', '我在……行业工作', 'I work in education.', '我在教育行业工作。'],
    ["I'm from", '/aɪm frəm/', '我来自', "I'm from Shanghai.", '我来自上海。'],
  ], [
    ["Hi, how's it going?", '嗨，最近怎么样？', '先重读 how 与 go，going 的末尾轻一些。'],
    ["Pretty good, thanks. How about you?", '挺好的，谢谢。你呢？', 'How about you 中 about 的 t 可与 you 轻连读。'],
    ["I'm from China, and I work in education.", '我来自中国，在教育行业工作。', 'and 在句中常弱读 /ən/。'],
    ['Nice to meet you. What do you do?', '很高兴认识你。你做什么工作？', 'to、do 都可弱读；重点放 meet 与 what。'],
  ], [
    ['A', "Hi, I'm Alex. What's your name?", '嗨，我是亚历克斯。你叫什么名字？'],
    ['B', "I'm Chen. Nice to meet you.", '我叫陈。很高兴认识你。'],
    ['A', 'Nice to meet you, too. Where are you from?', '我也很高兴认识你。你来自哪里？'],
    ['B', "I'm from Shanghai. How about you?", '我来自上海。你呢？'],
    ['A', "I'm from Seattle. I work in education.", '我来自西雅图，在教育行业工作。'],
    ['B', "That's interesting! I work in design.", '真有意思！我做设计工作。'],
  ], [
    ['Introduce yourself to someone you just met.', '向刚认识的人介绍自己的名字、家乡和工作。'],
    ['Ask the other person where they are from and what they do.', '问对方来自哪里、做什么工作。'],
  ]),

  dailyLesson(2, '介绍现在的自己', '说近况，不必背一长段自我介绍', [
    ['I live in', '/aɪ lɪv ɪn/', '我住在', 'I live in Beijing now.', '我现在住在北京。'],
    ['I used to', '/aɪ ˈjust tə/', '我过去常常', 'I used to play basketball.', '我以前常打篮球。', 'used to 常连读成 /ˈjust tə/。'],
    ['these days', '/ðiz deɪz/', '最近、如今', "I'm busy these days.", '我最近很忙。'],
    ["I'm learning", '/aɪm ˈlɝnɪŋ/', '我正在学', "I'm learning English again.", '我又开始学英语了。'],
    ['in my free time', '/ɪn maɪ fri taɪm/', '在空闲时间', 'I read in my free time.', '我空闲时看书。'],
    ['a little rusty', '/ə ˈlɪtəl ˈrʌsti/', '有点生疏', 'My English is a little rusty.', '我的英语有点生疏。'],
    ['what about you', '/wʌt əˈbaʊt ju/', '你呢', 'I like hiking. What about you?', '我喜欢徒步。你呢？', 'what about 可轻连读，重音在 you。'],
    ["that's interesting", '/ðæts ˈɪntrəstɪŋ/', '真有意思', "That's interesting. Tell me more.", '真有意思。再讲讲吧。'],
  ], [
    ["I used to speak English more often.", '我以前更常说英语。', 'used to 连读；重读 speak 和 often。'],
    ["These days, I'm learning it again.", '最近我又开始学英语了。', 'it again 可连读 /ɪtəˈɡɛn/。'],
    ['My English is a little rusty, but I can practice.', '我的英语有点生疏，但我可以练习。', 'a little 轻读，重点放 rusty 与 practice。'],
    ['I like walking in my free time. What about you?', '我空闲时喜欢散步。你呢？', '问句末尾 you 稍抬高语调。'],
  ], [
    ['A', 'What do you like to do in your free time?', '你空闲时喜欢做什么？'],
    ['B', 'I like walking and reading. What about you?', '我喜欢散步和阅读。你呢？'],
    ['A', "I'm learning to cook these days.", '我最近在学做饭。'],
    ['B', "That's interesting. What can you cook?", '真有意思。你会做什么？'],
    ['A', 'Just simple meals. I am still a little rusty.', '就是些简单饭菜。我还不太熟练。'],
    ['B', 'That is okay. Practice makes it easier.', '没关系。练习会让它变容易。'],
  ], [
    ['Say where you live and one thing you are learning now.', '说出你住在哪里、最近在学什么。'],
    ['Describe one past habit, then ask the other person about theirs.', '说出自己过去的一个习惯，再反问对方。'],
  ]),

  dailyLesson(3, '聊一天的安排', '用时间和习惯描述普通的一天', [
    ['wake up', '/weɪk ʌp/', '醒来', 'I wake up at seven.', '我七点醒来。', 'wake up 的 k 与 up 连起来。'],
    ['get ready', '/ɡɛt ˈrɛdi/', '做准备', 'I get ready for work.', '我准备上班。'],
    ['commute', '/kəˈmjut/', '通勤', 'My commute takes half an hour.', '我的通勤要半小时。'],
    ['usually', '/ˈjuʒuəli/', '通常', 'I usually take the train.', '我通常坐火车。'],
    ['around', '/əˈraʊnd/', '大约', 'I eat lunch around noon.', '我大约中午吃午饭。'],
    ['take a break', '/teɪk ə breɪk/', '休息一下', "Let's take a break.", '我们休息一下吧。', 'take a 可连成 /ˈteɪkə/。'],
    ['get off work', '/ɡɛt ɔf wɝk/', '下班', 'I get off work at six.', '我六点下班。'],
    ['go to bed', '/ɡoʊ tə bɛd/', '上床睡觉', 'I go to bed before midnight.', '我午夜前睡觉。', 'to 弱读 /tə/。'],
  ], [
    ['I usually wake up around seven.', '我通常七点左右醒来。', 'usually 与 wake up 为信息重点。'],
    ['My commute takes about thirty minutes.', '我的通勤大约要三十分钟。', 'takes about 中的 s 与 about 连读。'],
    ['I take a short break after lunch.', '午饭后我短暂休息一下。', 'take a 连读，重读 short break。'],
    ['I get off work at six and go to bed at eleven.', '我六点下班，十一点睡觉。', 'at 六点与 at 十一点都轻读。'],
  ], [
    ['A', 'What time do you usually wake up?', '你通常几点醒来？'],
    ['B', 'Around seven. Then I get ready for work.', '七点左右。然后我准备上班。'],
    ['A', 'How long is your commute?', '你通勤多久？'],
    ['B', 'About thirty minutes by train.', '坐火车大约三十分钟。'],
    ['A', 'When do you get off work?', '你什么时候下班？'],
    ['B', 'Usually at six, but sometimes later.', '通常六点，不过有时更晚。'],
  ], [
    ['Describe your morning in three short sentences.', '用三个短句说你的早晨安排。'],
    ['Ask someone about their commute and workday.', '询问对方的通勤和下班时间。'],
  ]),

  dailyLesson(4, '没听清时怎么说', '听不懂也能把对话继续下去', [
    ['sorry', '/ˈsɑri/', '抱歉；没听清时的开场', 'Sorry, I missed the last word.', '抱歉，我没听清最后一个词。'],
    ['Could you say that again?', '/kʊd ju seɪ ðæt əˈɡɛn/', '你能再说一遍吗？', 'Could you say that again, please?', '请再说一遍，好吗？', 'Could you 常连成 /kʊdʒu/。'],
    ['a bit slower', '/ə bɪt ˈsloʊər/', '慢一点', 'Could you speak a bit slower?', '你能说慢一点吗？'],
    ["I didn't catch that", '/aɪ ˈdɪdənt kætʃ ðæt/', '我没听清', "I didn't catch that. What was the name?", '我没听清。名字是什么？'],
    ['What does ... mean?', '/wʌt dʌz min/', '……是什么意思？', 'What does “refund” mean?', '“退款”是什么意思？'],
    ['How do you spell it?', '/haʊ du ju spɛl ɪt/', '怎么拼写？', 'How do you spell your last name?', '你的姓怎么拼写？'],
    ['Let me make sure', '/lɛt mi meɪk ʃʊr/', '让我确认一下', 'Let me make sure I got it right.', '让我确认我理解对了。'],
    ['got it', '/ɡɑt ɪt/', '明白了', 'Got it. Thank you for explaining.', '明白了。谢谢你解释。', 'got it 中的 t 可轻闪音化。'],
  ], [
    ["Sorry, I didn't catch the last part.", '抱歉，最后一部分我没听清。', 'didn\'t catch 重读 catch；句末自然下降。'],
    ['Could you say that again a bit slower?', '你能再慢一点说一遍吗？', 'Could you 连读；slower 为重点。'],
    ['How do you spell your name?', '你的名字怎么拼写？', 'do you 可弱化为 /dʒə/。'],
    ['Let me make sure: we meet at three, right?', '我确认一下：我们三点见，对吗？', 'right 用上扬语调表示确认。'],
  ], [
    ['A', 'The meeting is at three in Room B.', '会议三点在 B 室。'],
    ['B', "Sorry, I didn't catch that. Could you say it again?", '抱歉，我没听清。你能再说一遍吗？'],
    ['A', 'Sure. Three o’clock, Room B.', '当然。三点，B 室。'],
    ['B', 'Let me make sure: three, in Room B?', '我确认一下：三点，B 室？'],
    ['A', "That's right.", '对。'],
    ['B', 'Got it. Thank you!', '明白了。谢谢！'],
  ], [
    ['Ask someone to repeat a time or address more slowly.', '请对方慢一点重复时间或地址。'],
    ['Confirm what you heard in your own words.', '用自己的话确认刚才听到的信息。'],
  ]),

  dailyLesson(5, '自然结束对话', '不突兀地道别并约定下次联系', [
    ['I should get going', '/aɪ ʃʊd ɡɛt ˈɡoʊɪŋ/', '我该走了', 'I should get going. It is getting late.', '我该走了。时间不早了。'],
    ['It was nice talking to you', '/ɪt wəz naɪs ˈtɔkɪŋ tə ju/', '和你聊天很开心', 'It was nice talking to you today.', '今天和你聊天很开心。', 'to 弱读 /tə/。'],
    ["let's keep in touch", '/lɛts kip ɪn tʌtʃ/', '保持联系', "Let's keep in touch after the class.", '课后保持联系。'],
    ['see you later', '/si ju ˈleɪtər/', '回头见', 'See you later, Maya.', '回头见，玛雅。'],
    ['take care', '/teɪk kɛr/', '保重', 'Take care on your way home.', '回家的路上保重。'],
    ['have a good one', '/hæv ə ɡʊd wʌn/', '祝你过得愉快', 'Thanks for your help. Have a good one!', '谢谢你的帮助。祝你愉快！'],
    ['talk to you soon', '/tɔk tə ju sun/', '回头聊', 'Talk to you soon about the plan.', '关于计划回头聊。'],
    ['sounds good', '/saʊndz ɡʊd/', '听起来不错；就这么定', 'Friday at two? Sounds good.', '周五两点？就这么定。'],
  ], [
    ['I should get going, but it was nice talking to you.', '我该走了，不过和你聊天很开心。', 'but 轻读，重读 nice talking。'],
    ["Let's keep in touch. Do you have my number?", '保持联系。你有我的号码吗？', 'keep in 可连读。'],
    ['Friday at two sounds good to me.', '周五两点我觉得可以。', 'good to 连读时 to 弱化。'],
    ['Take care, and talk to you soon.', '保重，回头聊。', '两处短暂停顿让告别更自然。'],
  ], [
    ['A', 'I should get going. It is getting late.', '我该走了。时间不早了。'],
    ['B', 'Of course. It was nice talking to you.', '当然。和你聊天很开心。'],
    ['A', 'You too. Let’s keep in touch.', '我也是。我们保持联系。'],
    ['B', 'How about coffee next Friday?', '下周五喝咖啡怎么样？'],
    ['A', 'Friday sounds good. Talk to you soon!', '周五可以。回头聊！'],
    ['B', 'Take care!', '保重！'],
  ], [
    ['End a conversation politely because you need to leave.', '因为你需要离开，礼貌地结束对话。'],
    ['Suggest a time to talk again and say goodbye.', '提议下次聊天的时间，然后道别。'],
  ]),

  dailyLesson(6, '在咖啡店点单', '从点单到确认价格', [
    ["I'd like", '/aɪd laɪk/', '我想要', "I'd like a small coffee, please.", '我想要一小杯咖啡。'],
    ['a small latte', '/ə smɔl ˈlɑteɪ/', '一小杯拿铁', "I'd like a small latte.", '我想要一小杯拿铁。'],
    ['hot or iced', '/hɑt ɔr aɪst/', '热的还是冰的', 'Is it hot or iced?', '它是热的还是冰的？'],
    ['for here or to go', '/fɔr hɪr ɔr tə ɡoʊ/', '店内喝还是带走', 'For here or to go?', '店内喝还是带走？', 'to 弱读 /tə/。'],
    ['with oat milk', '/wɪð oʊt mɪlk/', '加燕麦奶', 'Can I have it with oat milk?', '可以帮我加燕麦奶吗？'],
    ['anything else', '/ˈɛniθɪŋ ɛls/', '还要别的吗', 'Would you like anything else?', '你还要别的吗？'],
    ["that's all", '/ðæts ɔl/', '就这些', "That's all, thanks.", '就这些，谢谢。'],
    ['how much is it', '/haʊ mʌtʃ ɪz ɪt/', '多少钱', 'How much is it altogether?', '总共多少钱？'],
  ], [
    ["I'd like a small iced latte, please.", '我想要一小杯冰拿铁。', 'I\'d like 连读；重读 small iced latte。'],
    ['Can I have it with oat milk?', '可以帮我加燕麦奶吗？', 'have it 可连读；oat milk 为信息重点。'],
    ['To go, please. That is all.', '带走，谢谢。就这些。', 'to go 的 to 轻读。'],
    ['How much is it altogether?', '总共多少钱？', 'much is 可连读；句末自然下降。'],
  ], [
    ['A', 'Hi! What can I get for you?', '你好！要点什么？'],
    ['B', "I'd like a small latte, please.", '我想要一小杯拿铁。'],
    ['A', 'Hot or iced?', '热的还是冰的？'],
    ['B', 'Iced, with oat milk, please.', '冰的，加燕麦奶，谢谢。'],
    ['A', 'For here or to go? Anything else?', '店内喝还是带走？还要别的吗？'],
    ['B', "To go. That's all. How much is it?", '带走。就这些。多少钱？'],
  ], [
    ['Order a drink with your preferred size, temperature, and milk.', '说出你要的杯型、冷热和奶的种类。'],
    ['Answer whether your drink is for here or to go, then ask the price.', '回答店内喝还是带走，再询问价格。'],
  ]),

  dailyLesson(7, '买衣服与退换', '询问尺码、试穿和退货', [
    ["I'm looking for", '/aɪm ˈlʊkɪŋ fɔr/', '我在找', "I'm looking for a light jacket.", '我在找一件薄外套。'],
    ['do you have this in', '/du ju hæv ðɪs ɪn/', '这款有……的吗', 'Do you have this in blue?', '这款有蓝色的吗？'],
    ['try it on', '/traɪ ɪt ɑn/', '试穿', 'Can I try it on?', '我能试穿吗？', 'try it on 三词连读。'],
    ['size', '/saɪz/', '尺码', 'What size do you need?', '你需要什么尺码？'],
    ['fit', '/fɪt/', '合身', 'This shirt does not fit me.', '这件衬衫不合身。'],
    ['on sale', '/ɑn seɪl/', '在打折', 'These shoes are on sale.', '这些鞋正在打折。'],
    ['return', '/rɪˈtɝn/', '退货', 'Can I return it if it does not fit?', '如果不合身，我能退货吗？'],
    ['receipt', '/rɪˈsit/', '收据', 'Please keep the receipt.', '请保留收据。', 'p 不发音。'],
  ], [
    ["I'm looking for a jacket in a medium size.", '我在找一件中码外套。', 'looking for 中 for 可弱读。'],
    ['Do you have this in blue?', '这款有蓝色的吗？', 'have this 的 v 与 th 分清。'],
    ['Can I try it on before I buy it?', '买之前我可以试穿吗？', 'try it on 连读；句末语调上扬。'],
    ['Can I return it if it does not fit?', '如果不合身我可以退吗？', 'return it 连读；重读 return 和 fit。'],
  ], [
    ['A', 'Can I help you find something?', '需要帮你找什么吗？'],
    ['B', "I'm looking for a blue jacket. Do you have this in medium?", '我在找蓝色外套。这款有中码吗？'],
    ['A', 'Yes. You can try it on over there.', '有。你可以在那边试穿。'],
    ['B', 'It fits well. Is it on sale?', '很合身。它打折吗？'],
    ['A', 'Yes, it is twenty percent off.', '是的，打八折。'],
    ['B', 'Great. Can I have the receipt, please?', '太好了。能给我收据吗？'],
  ], [
    ['Ask a shop worker for an item in another color and size.', '向店员询问另一种颜色和尺码。'],
    ['Ask to try it on and check the return policy.', '询问能否试穿，以及是否可以退货。'],
  ]),

  dailyLesson(8, '问路与指路', '抓住直走、转弯和地标', [
    ['excuse me', '/ɪkˈskjuz mi/', '打扰一下', 'Excuse me, is there a bank nearby?', '打扰一下，附近有银行吗？'],
    ['where is', '/wɛr ɪz/', '……在哪里', 'Where is the nearest pharmacy?', '最近的药店在哪里？'],
    ['go straight', '/ɡoʊ streɪt/', '直走', 'Go straight for two blocks.', '直走两个街区。'],
    ['turn left', '/tɝn lɛft/', '左转', 'Turn left at the light.', '在红绿灯处左转。'],
    ['at the corner', '/æt ðə ˈkɔrnər/', '在拐角处', 'The store is at the corner.', '商店在拐角处。'],
    ['across from', '/əˈkrɔs frəm/', '在……对面', 'The cafe is across from the station.', '咖啡店在车站对面。'],
    ['next to', '/nɛkst tə/', '挨着', 'The bank is next to the bookstore.', '银行在书店旁边。', 'to 弱读 /tə/。'],
    ['how far', '/haʊ fɑr/', '有多远', 'How far is it from here?', '从这里有多远？'],
  ], [
    ['Excuse me, where is the nearest station?', '打扰一下，最近的车站在哪里？', 'Excuse me 后短暂停顿。'],
    ['Go straight, then turn left at the corner.', '直走，然后在拐角左转。', 'straight、left、corner 重读。'],
    ['It is across from the bank.', '它在银行对面。', 'across from 连成一个意群。'],
    ['How far is it from here?', '从这里有多远？', 'far 和 here 是重点。'],
  ], [
    ['A', 'Excuse me, where is the nearest pharmacy?', '打扰一下，最近的药店在哪里？'],
    ['B', 'Go straight for one block, then turn left.', '直走一个街区，然后左转。'],
    ['A', 'Is it at the corner?', '在拐角处吗？'],
    ['B', 'No, it is next to the bookstore.', '不，在书店旁边。'],
    ['A', 'How far is it from here?', '从这里有多远？'],
    ['B', 'About five minutes on foot.', '步行大约五分钟。'],
  ], [
    ['Ask for directions to a station or pharmacy.', '问去车站或药店的路。'],
    ['Give directions using a turn and one landmark.', '用一个转弯和一个地标为别人指路。'],
  ]),

  dailyLesson(9, '坐公交和地铁', '确认路线、换乘与下车', [
    ['which bus', '/wɪtʃ bʌs/', '哪路公交', 'Which bus goes to the museum?', '哪路公交去博物馆？'],
    ['get on', '/ɡɛt ɑn/', '上车', 'Get on at the next stop.', '在下一站上车。'],
    ['get off', '/ɡɛt ɔf/', '下车', 'Get off at Central Station.', '在中心站下车。'],
    ['transfer', '/trænsˈfɝ/', '换乘', 'You need to transfer to Line Two.', '你需要换乘二号线。'],
    ['stop', '/stɑp/', '站点', 'The next stop is Main Street.', '下一站是主街。'],
    ['fare', '/fɛr/', '车费', 'The fare is two dollars.', '车费是两美元。'],
    ['one-way ticket', '/ˈwʌn weɪ ˈtɪkɪt/', '单程票', 'I need a one-way ticket.', '我需要一张单程票。'],
    ['running late', '/ˈrʌnɪŋ leɪt/', '要迟到了', "I'm running late because the bus is slow.", '公交慢，我要迟到了。'],
  ], [
    ['Which bus goes to the museum?', '哪路公交去博物馆？', 'which bus 为重点；goes to 轻读。'],
    ['Get on here and get off at the third stop.', '在这里上车，第三站下车。', '对比重读 get on 与 get off。'],
    ['Do I need to transfer to Line Two?', '我需要换乘二号线吗？', 'transfer to 连读；问句末尾上扬。'],
    ["I'm running late. Is the train on time?", '我要迟到了。火车准点吗？', 'running late 和 on time 形成对比。'],
  ], [
    ['A', 'Which bus goes to the museum?', '哪路公交去博物馆？'],
    ['B', 'Take the number eight bus.', '坐八路公交。'],
    ['A', 'Where do I get off?', '我在哪里下车？'],
    ['B', 'Get off at the third stop. It is across from the museum.', '第三站下车。车站在博物馆对面。'],
    ['A', 'How much is the fare?', '车费多少？'],
    ['B', 'Two dollars for a one-way ride.', '单程两美元。'],
  ], [
    ['Ask which bus to take and where to get off.', '询问坐哪路公交、在哪站下车。'],
    ['Explain that you are running late and ask about the train.', '说明你快迟到了，并询问列车情况。'],
  ]),

  dailyLesson(10, '预约与改时间', '商定双方都方便的时间', [
    ['make an appointment', '/meɪk ən əˈpɔɪntmənt/', '预约', "I'd like to make an appointment.", '我想预约。', 'make an 中 k 与元音相连。'],
    ['available', '/əˈveɪləbəl/', '有空的；可预约的', 'Are you available on Tuesday?', '你周二有空吗？'],
    ['works for me', '/wɝks fɔr mi/', '我可以；适合我', 'Three o’clock works for me.', '三点我可以。'],
    ['reschedule', '/riˈskɛdʒul/', '重新安排时间', 'Can we reschedule our meeting?', '我们能改一下会议时间吗？'],
    ['confirm', '/kənˈfɝm/', '确认', 'Please confirm the time by text.', '请发短信确认时间。'],
    ['on time', '/ɑn taɪm/', '准时', 'I will be there on time.', '我会准时到。'],
    ['calendar', '/ˈkæləndər/', '日历；日程表', 'Let me check my calendar.', '我看一下日程表。'],
    ['see you then', '/si ju ðɛn/', '到时见', 'Friday at ten? See you then.', '周五十点？到时见。'],
  ], [
    ["I'd like to make an appointment for Friday.", '我想预约周五。', 'to 弱读；重读 appointment 与 Friday。'],
    ['Are you available at three?', '你三点有空吗？', 'available 多音节，重音在第二音节。'],
    ['Could we reschedule for next Tuesday?', '我们能改到下周二吗？', 'reschedule for 连成一个意群。'],
    ['Three o’clock works for me. See you then.', '三点我可以。到时见。', 'works for me 自然连读，重点在 three。'],
  ], [
    ['A', "I'd like to make an appointment this week.", '我想预约这周的时间。'],
    ['B', 'Are you available on Thursday at three?', '你周四三点有空吗？'],
    ['A', 'Let me check my calendar. Could we do Friday instead?', '我看一下日程。可以改成周五吗？'],
    ['B', 'Friday at ten works for me.', '周五十点我可以。'],
    ['A', 'Great. I will be there on time.', '好。我会准时到。'],
    ['B', 'Confirmed. See you then!', '确认了。到时见！'],
  ], [
    ['Make an appointment and suggest a time.', '预约并提出一个时间。'],
    ['Politely reschedule it and confirm the new time.', '礼貌地改期并确认新时间。'],
  ]),

  dailyLesson(11, '聊兴趣爱好', '说喜欢什么，也问别人为什么喜欢', [
    ['be into', '/bi ˈɪntu/', '喜欢；对……感兴趣', "I'm into photography.", '我喜欢摄影。'],
    ['hobby', '/ˈhɑbi/', '爱好', 'Cooking is my new hobby.', '做饭是我的新爱好。'],
    ['go hiking', '/ɡoʊ ˈhaɪkɪŋ/', '去徒步', 'We go hiking on sunny days.', '晴天我们去徒步。'],
    ['watch a show', '/wɑtʃ ə ʃoʊ/', '看节目', 'I watch a show after dinner.', '我晚饭后看节目。'],
    ['try something new', '/traɪ ˈsʌmθɪŋ nu/', '尝试新事物', 'I want to try something new this month.', '这个月我想尝试新事物。'],
    ['how did you get into it', '/haʊ dɪd ju ɡɛt ˈɪntu ɪt/', '你怎么开始喜欢它的', 'How did you get into it?', '你是怎么开始喜欢它的？', 'did you 常连读成 /dɪdʒə/。'],
    ['for fun', '/fɔr fʌn/', '为了好玩；当作爱好', 'I draw for fun, not for work.', '我画画只是兴趣，不是工作。'],
    ['once in a while', '/wʌns ɪn ə waɪl/', '偶尔', 'I play tennis once in a while.', '我偶尔打网球。'],
  ], [
    ["I'm into photography, but I am still a beginner.", '我喜欢摄影，不过还是新手。', 'into 后接爱好，重读 photography 与 beginner。'],
    ['I go hiking once in a while.', '我偶尔去徒步。', 'once in a while 连成一个节奏组。'],
    ['How did you get into cooking?', '你怎么开始喜欢做饭的？', 'did you 轻连读；cooking 是焦点。'],
    ['I want to try something new this weekend.', '这个周末我想尝试点新鲜事。', 'want to 常连读；new 为重点。'],
  ], [
    ['A', 'What do you like to do for fun?', '你平时喜欢做什么？'],
    ['B', "I'm into photography. What about you?", '我喜欢摄影。你呢？'],
    ['A', 'I go hiking once in a while.', '我偶尔去徒步。'],
    ['B', 'That sounds fun. How did you get into it?', '听起来很有趣。你怎么开始喜欢的？'],
    ['A', 'A friend invited me last year.', '去年一位朋友邀请我去的。'],
    ['B', 'Maybe I should try it sometime.', '也许哪天我也该试试。'],
  ], [
    ['Tell a friend about one hobby and how often you do it.', '说一个爱好，以及你多久做一次。'],
    ['Ask how your friend became interested in a hobby.', '问朋友是怎么对某项爱好产生兴趣的。'],
  ]),

  dailyLesson(12, '聊周末和休息', '谈已经做的事和接下来想做的事', [
    ['weekend', '/ˈwikˌɛnd/', '周末', 'How was your weekend?', '你周末过得怎么样？'],
    ['stay in', '/steɪ ɪn/', '待在家里', 'I stayed in on Saturday.', '我周六待在家里。'],
    ['go out', '/ɡoʊ aʊt/', '出门', 'We went out for dinner.', '我们出去吃了晚饭。'],
    ['relax', '/rɪˈlæks/', '放松', 'I just want to relax today.', '我今天只想放松。'],
    ['catch up on', '/kætʃ ʌp ɑn/', '补上；处理积压的', 'I need to catch up on sleep.', '我需要补觉。'],
    ['spend time with', '/spɛnd taɪm wɪð/', '和……共度时间', 'I spent time with my family.', '我和家人待在一起。'],
    ['plan to', '/plæn tə/', '计划做', 'I plan to visit my parents.', '我打算去看父母。'],
    ['looking forward to', '/ˈlʊkɪŋ ˈfɔrwərd tə/', '期待', "I'm looking forward to the weekend.", '我很期待周末。', 'to 后接名词或动词 -ing。'],
  ], [
    ['I stayed in and caught up on sleep.', '我待在家里补了觉。', 'stayed in 连读，caught up on 连成一组。'],
    ['We went out for dinner on Saturday.', '我们周六出去吃了晚饭。', 'went out 连读；Saturday 重读。'],
    ['I plan to spend time with my family.', '我打算和家人待在一起。', 'plan to 的 to 弱读。'],
    ["I'm looking forward to a quiet weekend.", '我期待一个安静的周末。', 'looking forward to 作为一个表达整体说。'],
  ], [
    ['A', 'How was your weekend?', '你周末过得怎么样？'],
    ['B', 'Pretty good. I stayed in and relaxed.', '挺好的。我待在家里休息。'],
    ['A', 'That sounds nice. I went out with friends.', '听起来不错。我和朋友出去了。'],
    ['B', 'What did you do?', '你们做了什么？'],
    ['A', 'We had dinner and watched a movie.', '我们吃了晚饭，还看了电影。'],
    ['B', 'Sounds like a good weekend.', '听起来是个不错的周末。'],
  ], [
    ['Describe your last weekend in two or three sentences.', '用两三个句子说说你上个周末做了什么。'],
    ['Say what you plan to do next weekend.', '说说你下周末打算做什么。'],
  ]),

  dailyLesson(13, '邀请与回应', '会邀请，也会礼貌接受或拒绝', [
    ['Would you like to', '/wʊd ju laɪk tə/', '你想……吗', 'Would you like to join us?', '你想加入我们吗？', 'Would you 常连成 /wʊdʒu/。'],
    ['join us', '/dʒɔɪn ʌs/', '加入我们', 'Can you join us for lunch?', '你能和我们一起吃午饭吗？'],
    ['be free', '/bi fri/', '有空', 'Are you free this evening?', '你今晚有空吗？'],
    ['sounds great', '/saʊndz ɡreɪt/', '听起来很棒', 'Dinner at seven? Sounds great.', '七点吃饭？听起来很棒。'],
    ["I'd love to", '/aɪd lʌv tə/', '我很乐意', "I'd love to, thanks for asking.", '我很乐意，谢谢邀请。'],
    ["I can't make it", '/aɪ kænt meɪk ɪt/', '我去不了', "Sorry, I can't make it tonight.", '抱歉，我今晚去不了。'],
    ['maybe another time', '/ˈmeɪbi əˈnʌðər taɪm/', '改天吧', 'Maybe another time; I am busy today.', '改天吧，我今天很忙。'],
    ['how about', '/haʊ əˈbaʊt/', '……怎么样', 'How about Saturday instead?', '改成周六怎么样？'],
  ], [
    ['Would you like to have lunch with us?', '你想和我们一起吃午饭吗？', 'Would you 连读；重读 lunch。'],
    ["I'd love to. What time should we meet?", '我很乐意。我们几点见？', 'I\'d love to 连成一组，语气积极。'],
    ["I can't make it tonight, but thanks for inviting me.", '我今晚去不了，不过谢谢你邀请我。', 'can\'t 与 tonight 重读，but 轻读。'],
    ['How about Saturday instead?', '改成周六怎么样？', 'Saturday 重读，句末轻上扬。'],
  ], [
    ['A', 'Would you like to join us for dinner on Friday?', '周五要不要和我们一起吃晚饭？'],
    ['B', "I'd love to, but I can't make it on Friday.", '我很想去，但周五去不了。'],
    ['A', 'No problem. How about Saturday?', '没关系。周六怎么样？'],
    ['B', 'Saturday sounds great. What time?', '周六很好。几点？'],
    ['A', 'Around six at the new restaurant.', '六点左右在新开的那家餐厅。'],
    ['B', 'Perfect. See you there!', '太好了。到时见！'],
  ], [
    ['Invite a friend to a meal and suggest a time.', '邀请朋友吃饭并提议时间。'],
    ['Politely decline one time and suggest another.', '礼貌拒绝一个时间，再提出另一个时间。'],
  ]),

  dailyLesson(14, '表达偏好和理由', '说清楚选择，而不只说 yes 或 no', [
    ['prefer', '/prɪˈfɝ/', '更喜欢', 'I prefer tea to coffee.', '比起咖啡，我更喜欢茶。'],
    ['rather', '/ˈræðər/', '宁愿；更愿意', "I'd rather walk than drive.", '我宁愿步行也不想开车。'],
    ['either one', '/ˈiðər wʌn/', '哪个都可以', 'Either one is fine with me.', '我哪个都可以。'],
    ["I'm not a big fan of", '/aɪm nɑt ə bɪɡ fæn əv/', '我不太喜欢', "I'm not a big fan of spicy food.", '我不太喜欢辣的食物。'],
    ['because', '/bɪˈkɔz/', '因为', 'I like this place because it is quiet.', '我喜欢这里，因为很安静。'],
    ['more convenient', '/mɔr kənˈvinjənt/', '更方便', 'The train is more convenient for me.', '坐火车对我更方便。'],
    ['it depends', '/ɪt dɪˈpɛndz/', '看情况', 'It depends on the weather.', '这要看天气。'],
    ['what do you think', '/wʌt du ju θɪŋk/', '你怎么看', 'What do you think about this one?', '你觉得这个怎么样？'],
  ], [
    ['I prefer tea because it helps me relax.', '我更喜欢茶，因为它让我放松。', 'because 后解释理由；tea 与 relax 重读。'],
    ["I'd rather walk if the weather is good.", '如果天气好，我宁愿走路。', 'I\'d rather 连读，walk 重读。'],
    ['Either one is fine with me.', '我哪个都可以。', 'fine with me 连成一组，语气轻松。'],
    ['It depends. What do you think?', '看情况。你怎么看？', 'depends 下降；think 可上扬以邀请回应。'],
  ], [
    ['A', 'Do you want to take the bus or walk?', '你想坐公交还是走路？'],
    ['B', "I'd rather walk. It is a nice day.", '我宁愿走路。今天天气不错。'],
    ['A', 'I prefer the bus because it is faster.', '我更想坐公交，因为更快。'],
    ['B', 'That makes sense. How far is it?', '有道理。有多远？'],
    ['A', 'About twenty minutes on foot.', '步行大约二十分钟。'],
    ['B', 'Then the bus is more convenient.', '那还是公交更方便。'],
  ], [
    ['Compare two food or travel choices and explain why.', '比较两个食物或出行选项，并解释原因。'],
    ['Ask the other person for their preference.', '询问对方更喜欢哪一个。'],
  ]),

  dailyLesson(15, '表达感受与需要', '把不舒服、担心和需要帮助说出来', [
    ['feel tired', '/fil ˈtaɪərd/', '感到累', 'I feel tired after a long day.', '忙了一天我很累。'],
    ['be worried about', '/bi ˈwɝid əˈbaʊt/', '担心', "I'm worried about the test.", '我担心考试。'],
    ['need some help', '/nid səm hɛlp/', '需要一点帮助', 'I need some help with this form.', '我填写这张表需要帮助。'],
    ['take a moment', '/teɪk ə ˈmoʊmənt/', '稍等一下；缓一缓', 'Let me take a moment to think.', '让我想一想。'],
    ['feel better', '/fil ˈbɛtər/', '感觉好一些', 'I feel better after a short walk.', '散步一会儿后我感觉好多了。'],
    ['under pressure', '/ˈʌndər ˈprɛʃər/', '有压力', 'I am under pressure at work.', '我工作上压力很大。'],
    ['is everything okay', '/ɪz ˈɛvriθɪŋ oʊˈkeɪ/', '一切还好吗', 'Is everything okay? You seem quiet.', '一切还好吗？你好像很安静。'],
    ['thanks for asking', '/θæŋks fɔr ˈæskɪŋ/', '谢谢关心', 'I am okay. Thanks for asking.', '我还好。谢谢关心。'],
  ], [
    ["I'm a bit tired today. I need a short break.", '我今天有点累，需要休息一下。', 'tired 与 break 重读，a bit 轻读。'],
    ["I'm worried about tomorrow's meeting.", '我担心明天的会议。', 'worried about 连成一组。'],
    ['Could you help me with this form?', '你能帮我填这张表吗？', 'Could you 连读；help 与 form 重读。'],
    ['I feel better now. Thanks for asking.', '我现在感觉好些了。谢谢关心。', 'better、thanks 自然加重。'],
  ], [
    ['A', 'You seem quiet today. Is everything okay?', '你今天好像很安静。一切还好吗？'],
    ['B', "I'm a little tired and under pressure at work.", '我有点累，工作压力也大。'],
    ['A', 'Do you need some help?', '你需要帮忙吗？'],
    ['B', 'Maybe. Could you check this form for me?', '可能需要。你能帮我看看这张表吗？'],
    ['A', 'Of course. We can take a break after that.', '当然。之后我们可以休息一下。'],
    ['B', 'Thank you. I feel better already.', '谢谢。我已经感觉好些了。'],
  ], [
    ['Say how you feel and ask for one specific kind of help.', '说出你的感受，并提出一种具体帮助。'],
    ['Check how a friend is feeling and respond kindly.', '关心朋友的感受，并友善地回应。'],
  ]),

  dailyLesson(16, '打电话', '从接通到约定回电', [
    ['this is', '/ðɪs ɪz/', '我是……（电话用语）', 'Hi, this is Chen calling.', '你好，我是陈，打电话来。'],
    ['may I speak to', '/meɪ aɪ spik tə/', '我可以找……吗', 'May I speak to Maya?', '我可以找玛雅吗？'],
    ['speaking', '/ˈspikɪŋ/', '我就是（电话应答）', 'Speaking. How can I help?', '我就是。有什么事吗？'],
    ['hold on', '/hoʊld ɑn/', '稍等', 'Hold on for a moment, please.', '请稍等一下。'],
    ['call back', '/kɔl bæk/', '回电', 'I will call you back after lunch.', '午饭后我给你回电话。'],
    ['bad connection', '/bæd kəˈnɛkʃən/', '信号不好', 'Sorry, we have a bad connection.', '抱歉，信号不太好。'],
    ['speak up', '/spik ʌp/', '说大声点', 'Could you speak up a little?', '你能说大声一点吗？'],
    ['hang up', '/hæŋ ʌp/', '挂断电话', 'Please do not hang up yet.', '请先别挂电话。'],
  ], [
    ['Hi, this is Chen. May I speak to Maya?', '你好，我是陈。我可以找玛雅吗？', '电话中用 This is，不说 I am 也很自然。'],
    ['Hold on for a moment, please.', '请稍等一下。', 'hold on 连读；please 使语气更礼貌。'],
    ['The connection is bad. Could you speak up?', '信号不好。你能说大声一点吗？', 'speak up 连读；up 为重点。'],
    ["I'll call you back in ten minutes.", '我十分钟后回电话。', 'call you 连读，重读 ten minutes。'],
  ], [
    ['A', 'Hello, this is Maya.', '你好，我是玛雅。'],
    ['B', 'Hi, this is Chen. Is now a good time to talk?', '你好，我是陈。现在方便说话吗？'],
    ['A', 'I am on the bus. Could I call you back?', '我在公交上。我稍后回电话好吗？'],
    ['B', 'Sure. The connection is not great anyway.', '当然。信号也不太好。'],
    ['A', 'I will call back in twenty minutes.', '我二十分钟后回电话。'],
    ['B', 'Sounds good. Talk to you soon.', '好的。回头聊。'],
  ], [
    ['Call someone, say who you are, and ask if it is a good time.', '打电话说明自己是谁，并问对方现在是否方便。'],
    ['Explain the connection is bad and arrange a call back.', '说明信号不好，并约定回电。'],
  ]),

  dailyLesson(17, '留言与回电', '对方不在时也能讲清楚事情', [
    ['leave a message', '/liv ə ˈmɛsɪdʒ/', '留言', 'Can I leave a message for Alex?', '我能给亚历克斯留个言吗？'],
    ['not available', '/nɑt əˈveɪləbəl/', '不在；暂时不能接听', 'She is not available right now.', '她现在不方便接听。'],
    ['phone number', '/foʊn ˈnʌmbər/', '电话号码', 'Please leave your phone number.', '请留下你的电话号码。'],
    ['reach me at', '/ritʃ mi æt/', '通过……联系我', 'You can reach me at this number.', '你可以打这个号码联系我。'],
    ['as soon as possible', '/əz sun əz ˈpɑsəbəl/', '尽快', 'Please call me as soon as possible.', '请尽快给我回电话。'],
    ['regarding', '/rɪˈɡɑrdɪŋ/', '关于', 'I am calling regarding our appointment.', '我打电话是关于我们的预约。'],
    ['get back to', '/ɡɛt bæk tə/', '回复；回电给', 'I will get back to you this afternoon.', '我今天下午回复你。'],
    ['voicemail', '/ˈvɔɪsˌmeɪl/', '语音留言', 'I left you a voicemail.', '我给你留了语音消息。'],
  ], [
    ['Could I leave a message for her?', '我可以给她留个言吗？', 'leave a 连读；message 重读。'],
    ['I am calling regarding our appointment tomorrow.', '我打电话是关于明天的预约。', 'regarding 之后接主题。'],
    ['You can reach me at this number.', '你可以打这个号码联系我。', 'reach me at 连读，号码慢慢说清楚。'],
    ['Please get back to me when you have a moment.', '你有空时请回复我。', 'get back to 连成一个动词词组。'],
  ], [
    ['A', 'Hello. Alex is not available right now.', '你好。亚历克斯现在不方便接听。'],
    ['B', 'No problem. Could I leave a message?', '没关系。我可以留个言吗？'],
    ['A', 'Of course. What is it regarding?', '当然。是关于什么的？'],
    ['B', 'Our appointment tomorrow. Could he call me back?', '关于我们明天的预约。他能回我电话吗？'],
    ['A', 'Sure. What number can he reach you at?', '当然。他打哪个号码联系你？'],
    ['B', 'The number on his phone is fine. Thank you.', '他手机上的这个号码就可以。谢谢。'],
  ], [
    ['Leave a short voicemail with your name and reason for calling.', '留一段简短语音，说明姓名和来电原因。'],
    ['Ask someone to call you back and say when you are available.', '请对方回电，并说明你什么时候方便。'],
  ]),

  dailyLesson(18, '网上购物', '浏览商品并确认支付和退货', [
    ['add to cart', '/æd tə kɑrt/', '加入购物车', 'Add the book to your cart.', '把这本书加入购物车。'],
    ['check out', '/tʃɛk aʊt/', '结账', 'I am ready to check out.', '我准备结账了。'],
    ['shipping', '/ˈʃɪpɪŋ/', '运费；配送', 'Is shipping free for this item?', '这件商品包邮吗？'],
    ['discount code', '/ˈdɪsˌkaʊnt koʊd/', '优惠码', 'Can I use a discount code?', '我可以使用优惠码吗？'],
    ['payment method', '/ˈpeɪmənt ˈmɛθəd/', '支付方式', 'Which payment method do you accept?', '你们接受哪些支付方式？'],
    ['out of stock', '/aʊt əv stɑk/', '缺货', 'The black one is out of stock.', '黑色款缺货了。'],
    ['return policy', '/rɪˈtɝn ˈpɑləsi/', '退货政策', 'Please check the return policy.', '请查看退货政策。'],
    ['place an order', '/pleɪs ən ˈɔrdər/', '下单', 'I placed an order this morning.', '我今天早上下了单。'],
  ], [
    ['I added two items to my cart.', '我把两件商品加进购物车了。', 'added items 之间可轻连读。'],
    ['Is shipping free if I spend fifty dollars?', '如果消费五十美元，配送免费吗？', '重读 free 与 fifty dollars。'],
    ['The blue one is out of stock.', '蓝色款缺货了。', 'out of 常弱化为 /ˈaʊtəv/。'],
    ['I will check the return policy before I place the order.', '下单前我会查看退货政策。', 'return policy 与 place the order 为两组信息。'],
  ], [
    ['A', 'Did you find the headphones you wanted?', '你找到想要的耳机了吗？'],
    ['B', 'Yes, but the black ones are out of stock.', '找到了，但黑色款缺货了。'],
    ['A', 'What about the blue ones?', '蓝色款怎么样？'],
    ['B', 'They are available. I added them to my cart.', '有货。我已经放进购物车了。'],
    ['A', 'Check the shipping cost before you pay.', '付款前看看配送费。'],
    ['B', 'Good idea. I will check the return policy too.', '好主意。我也会看看退货政策。'],
  ], [
    ['Explain why you chose one item over another online.', '解释你在网上为什么选这一件而不是另一件。'],
    ['Ask about shipping cost and the return policy before ordering.', '下单前询问运费和退货政策。'],
  ]),

  dailyLesson(19, '包裹配送与问题', '查询进度、联系配送员和处理延误', [
    ['track a package', '/træk ə ˈpækɪdʒ/', '查询包裹', 'I want to track a package.', '我想查询一个包裹。'],
    ['tracking number', '/ˈtrækɪŋ ˈnʌmbər/', '物流单号', 'Here is my tracking number.', '这是我的物流单号。'],
    ['on the way', '/ɑn ðə weɪ/', '在路上', 'Your package is on the way.', '你的包裹正在配送中。'],
    ['delayed', '/dɪˈleɪd/', '延误了', 'My delivery is delayed.', '我的配送延误了。'],
    ['delivery address', '/dɪˈlɪvəri əˈdrɛs/', '收货地址', 'Can I change the delivery address?', '我能更改收货地址吗？'],
    ['drop off', '/drɑp ɔf/', '送到；放下', 'Please drop it off at the front desk.', '请把它放到前台。'],
    ['front desk', '/frʌnt dɛsk/', '前台', 'The package is at the front desk.', '包裹在前台。'],
    ['contact support', '/ˈkɑnˌtækt səˈpɔrt/', '联系客服', 'I will contact support about the delay.', '我会就延误问题联系客服。'],
  ], [
    ['My package says it is on the way.', '包裹状态显示正在配送中。', 'says it is 可轻连读；on the way 重读。'],
    ['Could you check the tracking number for me?', '你能帮我查一下物流单号吗？', 'tracking number 是整体。'],
    ['The delivery is delayed by one day.', '配送延误了一天。', 'delayed 与 one day 重读。'],
    ['Please drop it off at the front desk.', '请放在前台。', 'drop it off 三词连读。'],
  ], [
    ['A', 'Hello, I am calling about a package.', '你好，我打电话是想问一个包裹。'],
    ['B', 'Do you have the tracking number?', '你有物流单号吗？'],
    ['A', 'Yes. It says the delivery is delayed.', '有。它显示配送延误了。'],
    ['B', 'I see. It should arrive tomorrow.', '我看到了。应该明天到。'],
    ['A', 'Could you drop it off at the front desk?', '可以把它放在前台吗？'],
    ['B', 'Yes, I will add that note.', '可以，我会加上这个备注。'],
  ], [
    ['Ask for an update on a delayed package.', '询问延误包裹的最新情况。'],
    ['Tell the delivery person where to leave the package.', '告诉配送员把包裹放在哪里。'],
  ]),

  dailyLesson(20, '手机和设备求助', '用英语描述常见小故障', [
    ['not working', '/nɑt ˈwɝkɪŋ/', '不能用；不工作', 'My camera is not working.', '我的相机不能用了。'],
    ['battery', '/ˈbætəri/', '电池；电量', 'My battery is almost empty.', '我的电量快没了。'],
    ['charge', '/tʃɑrdʒ/', '充电', 'I need to charge my phone.', '我得给手机充电。'],
    ['restart', '/riˈstɑrt/', '重启', 'Try to restart the app.', '试着重启应用。'],
    ['connect to Wi-Fi', '/kəˈnɛkt tə ˈwaɪ faɪ/', '连接无线网络', 'I cannot connect to Wi-Fi.', '我连不上无线网络。'],
    ['password', '/ˈpæsˌwɝd/', '密码', 'I forgot my Wi-Fi password.', '我忘记无线网络密码了。'],
    ['screen', '/skrin/', '屏幕', 'The screen is frozen.', '屏幕卡住了。'],
    ['can you show me', '/kæn ju ʃoʊ mi/', '你能给我示范吗', 'Can you show me how to change this setting?', '你能示范怎么改这个设置吗？'],
  ], [
    ['My phone is not connecting to Wi-Fi.', '我的手机连不上无线网络。', 'not connecting 与 Wi-Fi 重读。'],
    ['The screen is frozen. Should I restart it?', '屏幕卡住了。我该重启吗？', 'screen、frozen、restart 是信息重点。'],
    ['Do you have a charger I could use?', '你有能借我用的充电器吗？', 'charger 重读；could use 轻连读。'],
    ['Could you show me how to change this setting?', '你能给我示范怎么改这个设置吗？', 'show me 与 change this setting 为两个节奏组。'],
  ], [
    ['A', 'Can you help me? My phone is not working properly.', '能帮我一下吗？我的手机不太正常。'],
    ['B', 'What seems to be the problem?', '具体是什么问题？'],
    ['A', 'I cannot connect to Wi-Fi, and the screen is slow.', '我连不上无线网络，屏幕反应也慢。'],
    ['B', 'Have you tried restarting it?', '你试过重启吗？'],
    ['A', 'Not yet. Can you show me how?', '还没有。你能教我怎么做吗？'],
    ['B', 'Sure. Hold this button for a few seconds.', '当然。按住这个按钮几秒钟。'],
  ], [
    ['Describe one phone problem and ask for help.', '描述一个手机问题并寻求帮助。'],
    ['Explain a simple fix, such as restarting or charging.', '说明一个简单解决办法，如重启或充电。'],
  ]),
];
