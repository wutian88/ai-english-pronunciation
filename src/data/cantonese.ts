import type { Lesson, WordItem } from '../types/wordbook';

// Original beginner exercises, using LSHK Jyutping with ASCII tone numbers.
// Pronunciation references:
// https://lshk.org/jyutping-scheme/
// https://jyutping.org/en/jyutping/
// https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/OnlineTutorial/courseList_b1.aspx
// https://words.hk/zidin/廣東話
// https://words.hk/zidin/邊度
// https://words.hk/zidin/再見
// https://words.hk/zidin/埋單
// The examples below are composed for this course; source audio is not redistributed.

type WordRow = [word: string, jyutping: string, zh: string, example: string, exampleJyutping: string, exampleZh: string, note: string];
type SentenceRow = [en: string, jyutping: string, zh: string, notes: string];
type DialogueRow = [speaker: 'A' | 'B', en: string, jyutping: string, zh: string];
type PromptRow = [en: string, jyutping: string, zh: string];

function cantoneseLesson(
  order: number,
  title: string,
  subtitle: string,
  wordRows: WordRow[],
  sentenceRows: SentenceRow[],
  dialogueRows: DialogueRow[],
  promptRows: PromptRow[],
): Lesson {
  const prefix = `c${String(order).padStart(2, '0')}`;
  const words: WordItem[] = wordRows.map(([word, phonetic, translation, en, jyutping, zh, linkingNotes], index) => ({
    id: `${prefix}-w${String(index + 1).padStart(2, '0')}`,
    word,
    phonetic,
    translation,
    category: 'cantonese',
    linkingNotes,
    examples: [{ en, zh, jyutping }],
  }));

  return {
    id: prefix,
    track: 'cantonese',
    order,
    week: Math.ceil(order / 5),
    title,
    subtitle,
    words,
    sentences: sentenceRows.map(([en, jyutping, zh, notes], index) => ({
      id: `${prefix}-s${String(index + 1).padStart(2, '0')}`,
      en,
      zh,
      jyutping,
      notes,
    })),
    dialogue: dialogueRows.map(([speaker, en, jyutping, zh]) => ({ speaker, en, zh, jyutping })),
    practicePrompts: promptRows.map(([en, jyutping, zh]) => ({ en, zh, jyutping })),
  };
}

export const cantoneseTones = [
  { number: 1, name: '阴平 · 高平', example: '詩', jyutping: 'si1', description: '保持较高而平稳的音高；数字 1 是调号。' },
  { number: 2, name: '阴上 · 高升', example: '史', jyutping: 'si2', description: '从中音区明显升到高音区。' },
  { number: 3, name: '阴去 · 中平', example: '試', jyutping: 'si3', description: '保持中等音高，比第 1 调低。' },
  { number: 4, name: '阳平 · 低降', example: '時', jyutping: 'si4', description: '从较低音区往下走，不读成普通话第四声的高降调。' },
  { number: 5, name: '阳上 · 低升', example: '市', jyutping: 'si5', description: '从低音区上升，起点和终点都比第 2 调低。' },
  { number: 6, name: '阳去 · 低平', example: '事', jyutping: 'si6', description: '保持低而平的音高，注意与第 3 调区分。' },
];

export const cantoneseLessons: Lesson[] = [
  cantoneseLesson(1, '声调与日常招呼', '先听六声，再用五句常用招呼开口', [
    ['你好', 'nei5 hou2', '你好', '你好，早晨。', 'nei5 hou2 zou2 san4', '你好，早上好。', 'nei5 从低处上升，hou2 升得更高；不要套用普通话三声。'],
    ['早晨', 'zou2 san4', '早上好', '早晨，你好。', 'zou2 san4 nei5 hou2', '早上好，你好。', 'zou2 高升，san4 低降；san 的 n 收尾要保留。'],
    ['唔該', 'm4 goi1', '谢谢；劳驾（接受帮助或服务时）', '唔該你。', 'm4 goi1 nei5', '谢谢你帮忙。', 'm4 闭唇发鼻音，本身就是一个音节，不加“呣啊”。'],
    ['多謝', 'do1 ze6', '谢谢（接受礼物或好意时）', '多謝你。', 'do1 ze6 nei5', '谢谢你。', 'do1 高平，ze6 低平；z 不送气，不读英语字母 z。'],
    ['再見', 'zoi3 gin3', '再见', '再見，多謝你。', 'zoi3 gin3 do1 ze6 nei5', '再见，谢谢你。', '两个字都用第 3 调，中等音高保持平稳。'],
  ], [
    ['你好，早晨。', 'nei5 hou2 zou2 san4', '你好，早上好。', '逐字听 5、2、2、4 调，再把招呼连起来。'],
    ['唔該你。', 'm4 goi1 nei5', '谢谢你帮忙。', '唔該常用于服务、帮助和引起对方注意；多謝常用于礼物或好意。'],
    ['多謝你，再見。', 'do1 ze6 nei5 zoi3 gin3', '谢谢你，再见。', '句子语气可以自然变化，但先保留每个字的声调轮廓。'],
  ], [
    ['A', '早晨。', 'zou2 san4', '早上好。'],
    ['B', '早晨，你好。', 'zou2 san4 nei5 hou2', '早上好，你好。'],
    ['A', '多謝你。', 'do1 ze6 nei5', '谢谢你。'],
    ['B', '再見。', 'zoi3 gin3', '再见。'],
  ], [
    ['早晨。再見。', 'zou2 san4 zoi3 gin3', '用粤语向对方问早，并说再见。'],
    ['唔該你。多謝你。', 'm4 goi1 nei5 do1 ze6 nei5', '分别用“唔該”和“多謝”道谢，想一想各自适合的场景。'],
  ]),

  cantoneseLesson(2, '介绍自己', '用我、你、佢和係说出简单介绍', [
    ['我', 'ngo5', '我', '我係學生。', 'ngo5 hai6 hok6 saang1', '我是学生。', 'ng 是一个声母；舌后部轻触软腭，保留起始鼻音。'],
    ['你', 'nei5', '你', '你住喺邊度？', 'nei5 zyu6 hai2 bin1 dou6', '你住在哪里？', 'nei5 用第 5 调，n 声母和 l 声母先分开练习。'],
    ['佢', 'keoi5', '他／她', '佢係我朋友。', 'keoi5 hai6 ngo5 pang4 jau5', '他／她是我的朋友。', 'eoi 不是普通话“ui”；嘴唇微圆，整段韵母连贯发出。'],
    ['係', 'hai6', '是', '我係學生。', 'ngo5 hai6 hok6 saang1', '我是学生。', '係 hai6 表示“是”；喺 hai2 表示“在”，声调不同。'],
    ['廣東話', 'gwong2 dung1 waa2', '粤语、广东话', '我學廣東話。', 'ngo5 hok6 gwong2 dung1 waa2', '我学粤语。', 'gw 起音时嘴唇略圆；“話”在这个词里读 waa2。'],
  ], [
    ['我係學生。', 'ngo5 hai6 hok6 saang1', '我是学生。', 'hok6 的 k 韵尾短促收住，不在后面补一个元音。'],
    ['我住喺香港。', 'ngo5 zyu6 hai2 hoeng1 gong2', '我住在香港。', '喺读 hai2；“我住喺……”可以换成自己的城市。'],
    ['我學廣東話。', 'ngo5 hok6 gwong2 dung1 waa2', '我学粤语。', '逐个读清 ng、k、gw，再把整句连接。'],
  ], [
    ['A', '你好，你住喺邊度？', 'nei5 hou2 nei5 zyu6 hai2 bin1 dou6', '你好，你住在哪里？'],
    ['B', '我住喺香港。', 'ngo5 zyu6 hai2 hoeng1 gong2', '我住在香港。'],
    ['A', '你學廣東話？', 'nei5 hok6 gwong2 dung1 waa2', '你学粤语吗？'],
    ['B', '係，我學廣東話。', 'hai6 ngo5 hok6 gwong2 dung1 waa2', '是的，我学粤语。'],
  ], [
    ['我係學生。', 'ngo5 hai6 hok6 saang1', '用“我係……”介绍自己的身份，可以替换示范中的“学生”。'],
    ['我住喺香港。', 'ngo5 zyu6 hai2 hoeng1 gong2', '用“我住喺……”介绍自己住的地方，可以替换示范中的城市。'],
  ]),

  cantoneseLesson(3, '点餐与结账', '说出饮品、主食，并礼貌结账', [
    ['水', 'seoi2', '水', '唔該，一杯水。', 'm4 goi1 jat1 bui1 seoi2', '麻烦给我一杯水。', 'seoi2 的韵母微圆唇；第 2 调明显上升。'],
    ['茶', 'caa4', '茶', '我想飲茶。', 'ngo5 soeng2 jam2 caa4', '我想喝茶。', 'c 是送气声母，aa 比 a 开口更大，茶读低降调。'],
    ['飯', 'faan6', '米饭；饭', '我想食飯。', 'ngo5 soeng2 sik6 faan6', '我想吃饭。', 'faan6 是低平调；保留 n 韵尾，不读成 ng。'],
    ['麵', 'min6', '面条', '我想食麵。', 'ngo5 soeng2 sik6 min6', '我想吃面。', 'min6 低平，i 后面接 n，收尾时舌尖轻触上齿龈。'],
    ['埋單', 'maai4 daan1', '结账', '唔該，埋單。', 'm4 goi1 maai4 daan1', '麻烦结账。', 'maai4 低降、daan1 高平；这里用“埋單”表示结账。'],
  ], [
    ['唔該，一杯水。', 'm4 goi1 jat1 bui1 seoi2', '麻烦给我一杯水。', 'jat1 的 t 收住即可，不加“特”之类的额外音节。'],
    ['我想食麵。', 'ngo5 soeng2 sik6 min6', '我想吃面。', '想 soeng2、食 sik6；sik6 要有短促的 k 韵尾。'],
    ['唔該，埋單。', 'm4 goi1 maai4 daan1', '麻烦结账。', '先用唔該引起店员注意，再说埋單。'],
  ], [
    ['A', '你想飲咩？', 'nei5 soeng2 jam2 me1', '你想喝什么？'],
    ['B', '唔該，一杯茶。', 'm4 goi1 jat1 bui1 caa4', '麻烦给我一杯茶。'],
    ['A', '你想食咩？', 'nei5 soeng2 sik6 me1', '你想吃什么？'],
    ['B', '我想食麵。', 'ngo5 soeng2 sik6 min6', '我想吃面。'],
  ], [
    ['唔該，一杯茶。', 'm4 goi1 jat1 bui1 caa4', '扮演顾客，礼貌地要一杯茶。'],
    ['唔該，埋單。', 'm4 goi1 maai4 daan1', '用餐结束后，请店员结账。'],
  ]),

  cantoneseLesson(4, '问路与方向', '分清这里、那里、左边和右边', [
    ['邊度', 'bin1 dou6', '哪里', '車站喺邊度？', 'ce1 zaam6 hai2 bin1 dou6', '车站在哪里？', 'bin1 高平、dou6 低平；“邊度”是一个常用问地点的词。'],
    ['呢度', 'ni1 dou6', '这里', '車站喺呢度。', 'ce1 zaam6 hai2 ni1 dou6', '车站在这里。', '呢这里取常见读音 ni1；不要读成普通话的“呢”。'],
    ['嗰度', 'go2 dou6', '那里', '車站喺嗰度。', 'ce1 zaam6 hai2 go2 dou6', '车站在那里。', 'go2 高升；对比 ni1 dou6 和 go2 dou6。'],
    ['左邊', 'zo2 bin1', '左边', '車站喺左邊。', 'ce1 zaam6 hai2 zo2 bin1', '车站在左边。', 'zo2 的 z 不送气，随后 bin1 保持高平。'],
    ['右邊', 'jau6 bin1', '右边', '車站喺右邊。', 'ce1 zaam6 hai2 jau6 bin1', '车站在右边。', 'j 接近普通话拼音 y 的起音，不读英语的 j。'],
  ], [
    ['唔該，車站喺邊度？', 'm4 goi1 ce1 zaam6 hai2 bin1 dou6', '请问，车站在哪里？', '問地点用喺 hai2，注意与“是”的係 hai6 区分。'],
    ['車站喺左邊。', 'ce1 zaam6 hai2 zo2 bin1', '车站在左边。', '先读清楚地点和方向，再自然连读。'],
    ['車站喺嗰度。', 'ce1 zaam6 hai2 go2 dou6', '车站在那里。', '嗰度用来指较远的位置，可配合手势练习。'],
  ], [
    ['A', '唔該，車站喺邊度？', 'm4 goi1 ce1 zaam6 hai2 bin1 dou6', '请问，车站在哪里？'],
    ['B', '車站喺右邊。', 'ce1 zaam6 hai2 jau6 bin1', '车站在右边。'],
    ['A', '喺嗰度？', 'hai2 go2 dou6', '在那里吗？'],
    ['B', '係，喺嗰度。', 'hai6 hai2 go2 dou6', '是的，在那里。'],
  ], [
    ['唔該，車站喺邊度？', 'm4 goi1 ce1 zaam6 hai2 bin1 dou6', '向别人礼貌询问车站的位置。'],
    ['左邊。右邊。', 'zo2 bin1 jau6 bin1', '指一指左边和右边，再分别用粤语说出来。'],
  ]),

  cantoneseLesson(5, '购物与选择', '问价钱，说清楚要哪一个', [
    ['幾多錢', 'gei2 do1 cin2', '多少钱', '呢個幾多錢？', 'ni1 go3 gei2 do1 cin2', '这个多少钱？', '錢在这个常用词中读 cin2，c 要送气。'],
    ['呢個', 'ni1 go3', '这个', '我想要呢個。', 'ngo5 soeng2 jiu3 ni1 go3', '我想要这个。', '呢 ni1 高平、個 go3 中平；不要把個读成 go2。'],
    ['嗰個', 'go2 go3', '那个', '嗰個幾多錢？', 'go2 go3 gei2 do1 cin2', '那个多少钱？', '两个 go 的声调不同：嗰 go2 上升、個 go3 平稳。'],
    ['要', 'jiu3', '要', '我要呢個。', 'ngo5 jiu3 ni1 go3', '我要这个。', 'jiu3 用第 3 调；j 接近拼音 y 的起音。'],
    ['唔要', 'm4 jiu3', '不要', '我唔要嗰個。', 'ngo5 m4 jiu3 go2 go3', '我不要那个。', 'm4 是完整音节，和后面的 jiu3 连贯但不合并。'],
  ], [
    ['唔該，呢個幾多錢？', 'm4 goi1 ni1 go3 gei2 do1 cin2', '请问，这个多少钱？', '问价钱用幾多錢；先熟悉 2、1、2 的声调组合。'],
    ['我要呢個，唔要嗰個。', 'ngo5 jiu3 ni1 go3 m4 jiu3 go2 go3', '我要这个，不要那个。', '比较呢個和嗰個，保留每个词的完整声调。'],
    ['十蚊，唔該。', 'sap6 man1 m4 goi1', '十元，谢谢。', '蚊 man1 是口语金额单位；sap6 的 p 韵尾闭唇收住。'],
  ], [
    ['A', '唔該，呢個幾多錢？', 'm4 goi1 ni1 go3 gei2 do1 cin2', '请问，这个多少钱？'],
    ['B', '十蚊。', 'sap6 man1', '十元。'],
    ['A', '好，我要呢個。', 'hou2 ngo5 jiu3 ni1 go3', '好，我要这个。'],
    ['B', '多謝你。', 'do1 ze6 nei5', '谢谢你。'],
  ], [
    ['唔該，呢個幾多錢？', 'm4 goi1 ni1 go3 gei2 do1 cin2', '选一个身边的物品，用粤语询问价钱。'],
    ['我要呢個，唔要嗰個。', 'ngo5 jiu3 ni1 go3 m4 jiu3 go2 go3', '在两个物品之间作选择，说清要这个还是那个。'],
  ]),

  cantoneseLesson(6, '请求帮助与复述', '听不懂时，也能把对话继续下去', [
    ['唔明', 'm4 ming4', '不明白', '唔好意思，我唔明。', 'm4 hou2 ji3 si1 ngo5 m4 ming4', '不好意思，我不明白。', 'ming4 的 ng 韵尾用舌后部收音，区别于 n 韵尾。'],
    ['慢啲', 'maan6 di1', '慢一点', '唔該，講慢啲。', 'm4 goi1 gong2 maan6 di1', '麻烦说慢一点。', 'maan6 低平、di1 高平；啲读 di1。'],
    ['再講', 'zoi3 gong2', '再说', '唔該，再講一次。', 'm4 goi1 zoi3 gong2 jat1 ci3', '麻烦再说一次。', 'gong2 保留 ng 韵尾，jat1 保留短促的 t 韵尾。'],
    ['幫手', 'bong1 sau2', '帮忙', '唔該你幫手。', 'm4 goi1 nei5 bong1 sau2', '麻烦你帮忙。', 'bong1 高平，sau2 高升；两字的韵尾不同。'],
    ['唔好意思', 'm4 hou2 ji3 si1', '不好意思', '唔好意思，我唔明。', 'm4 hou2 ji3 si1 ngo5 m4 ming4', '不好意思，我不明白。', '分成 m4 / hou2 / ji3 / si1 四个音节，再连起来。'],
  ], [
    ['唔好意思，我唔明。', 'm4 hou2 ji3 si1 ngo5 m4 ming4', '不好意思，我不明白。', '不明白时直接用唔明；m4 和 ming4 都有鼻音。'],
    ['唔該，講慢啲。', 'm4 goi1 gong2 maan6 di1', '麻烦说慢一点。', '语速放慢时保持声调，不把所有字拖成同一音高。'],
    ['唔該，再講一次。', 'm4 goi1 zoi3 gong2 jat1 ci3', '麻烦再说一次。', 'jat1 的 t 只收住，不增加额外音节。'],
  ], [
    ['A', '唔好意思，我唔明。', 'm4 hou2 ji3 si1 ngo5 m4 ming4', '不好意思，我不明白。'],
    ['B', '好，我再講一次。', 'hou2 ngo5 zoi3 gong2 jat1 ci3', '好，我再说一次。'],
    ['A', '唔該，講慢啲。', 'm4 goi1 gong2 maan6 di1', '麻烦说慢一点。'],
    ['B', '好。', 'hou2', '好的。'],
  ], [
    ['唔該，講慢啲。', 'm4 goi1 gong2 maan6 di1', '请对方说慢一点。'],
    ['唔好意思，我唔明。唔該，再講一次。', 'm4 hou2 ji3 si1 ngo5 m4 ming4 m4 goi1 zoi3 gong2 jat1 ci3', '扮演听不懂的学习者，礼貌地请求对方再说一次。'],
  ]),
];
