import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Play, Volume2, Shuffle, ArrowLeft, CheckCircle2, XCircle, BookOpen, GraduationCap, Languages, Settings, Type } from 'lucide-react';

// --- Master Vocabulary Data ---
const masterQuizList = {
  "1": {
    title: "Lesson 1",
    subtitle: "自我介绍 (Introductions)",
    dialogue: [
      { word: "我", pinyin: "wǒ", meaning: "I; me" },
      { word: "自己", pinyin: "zì jǐ", meaning: "oneself" },
      { word: "你好", pinyin: "nǐ hǎo", meaning: "hello" },
      { word: "叫", pinyin: "jiào", meaning: "to be called" },
      { word: "名字", pinyin: "míng zi", meaning: "name" },
      { word: "姓", pinyin: "xìng", meaning: "surname" },
      { word: "是", pinyin: "shì", meaning: "to be" },
      { word: "大一", pinyin: "dà yī", meaning: "freshman" },
      { word: "学生", pinyin: "xué sheng", meaning: "student" },
      { word: "介绍", pinyin: "jiè shào", meaning: "to introduce" },
      { word: "什么", pinyin: "shén me", meaning: "what" },
      { word: "认识", pinyin: "rèn shi", meaning: "to know" },
      { word: "高兴", pinyin: "gāo xìng", meaning: "happy" },
      { word: "也", pinyin: "yě", meaning: "also" },
      { word: "很", pinyin: "hěn", meaning: "very" },
      { word: "吗", pinyin: "ma", meaning: "question particle" }
    ],
    reading: [
      { word: "跟", pinyin: "gēn", meaning: "with" },
      { word: "大家", pinyin: "dà jiā", meaning: "everyone" },
      { word: "来", pinyin: "lái", meaning: "to come" },
      { word: "年级", pinyin: "nián jí", meaning: "grade" },
      { word: "中文", pinyin: "zhōng wén", meaning: "Chinese" },
      { word: "一起", pinyin: "yì qǐ", meaning: "together" },
      { word: "主修", pinyin: "zhǔ xiū", meaning: "major" },
      { word: "她", pinyin: "tā", meaning: "she" }
    ],
    vocab: [
      { word: "自我", pinyin: "zì wǒ", meaning: "self" },
      { word: "介绍", pinyin: "jiè shào", meaning: "to introduce; introduction" },
      { word: "我", pinyin: "wǒ", meaning: "I; me" },
      { word: "自己", pinyin: "zì jǐ", meaning: "self" },
      { word: "嗨", pinyin: "hāi", meaning: "Hi" },
      { word: "你好", pinyin: "nǐ hǎo", meaning: "Hello" },
      { word: "叫", pinyin: "jiào", meaning: "to call; to be called (by the name of)" },
      { word: "什么", pinyin: "shén me", meaning: "what" },
      { word: "名字", pinyin: "míng zi", meaning: "name (full name or given name)" },
      { word: "姓", pinyin: "xìng", meaning: "to be surnamed; family name" },
      { word: "是", pinyin: "shì", meaning: "to be" },
      { word: "大二", pinyin: "dà èr", meaning: "college sophomore year" },
      { word: "呢", pinyin: "ne", meaning: "particle (used for reciprocal or rhetorical questions)" },
      { word: "大一", pinyin: "dà yī", meaning: "college freshman year" },
      { word: "学生", pinyin: "xué sheng", meaning: "student" },
      { word: "属", pinyin: "shǔ", meaning: "to belong; to be born in the lunar year of" },
      { word: "猴", pinyin: "hóu", meaning: "monkey" },
      { word: "的", pinyin: "de", meaning: "particle (indicates possession, modification, or softens speech)" },
      { word: "对", pinyin: "duì", meaning: "correct; right" },
      { word: "吧", pinyin: "ba", meaning: "particle (used to solicit agreement)" },
      { word: "呀", pinyin: "ya", meaning: "particle (used to soften speech forcefulness)" },
      { word: "羊", pinyin: "yáng", meaning: "ram/sheep" },
      { word: "吗", pinyin: "ma", meaning: "particle (used to form a yes/no question)" },
      { word: "今年", pinyin: "jīn nián", meaning: "this year" },
      { word: "岁", pinyin: "suì", meaning: "year of age" },
      { word: "商", pinyin: "shāng", meaning: "business" },
      { word: "医学", pinyin: "yī xué", meaning: "medical science" },
      { word: "专业", pinyin: "zhuān yè", meaning: "major" },
      { word: "认识", pinyin: "rèn shi", meaning: "to recognize; to get to know (someone)" },
      { word: "很", pinyin: "hěn", meaning: "very" },
      { word: "高兴", pinyin: "gāo xìng", meaning: "glad" },
      { word: "也", pinyin: "yě", meaning: "also" },
      { word: "大家", pinyin: "dà jiā", meaning: "everybody" },
      { word: "来", pinyin: "lái", meaning: "to come; to be about to" },
      { word: "一下", pinyin: "yī xià", meaning: "a little while" },
      { word: "大学", pinyin: "dà xué", meaning: "college; university" },
      { word: "年级", pinyin: "nián jí", meaning: "grade (year in school)" },
      { word: "主修", pinyin: "zhǔ xiū", meaning: "to major in" },
      { word: "能", pinyin: "néng", meaning: "can; to be able to" },
      { word: "这", pinyin: "zhè", meaning: "this" }, 
      { word: "她", pinyin: "tā", meaning: "she; her" }, 
      { word: "跟", pinyin: "gēn", meaning: "with" }, 
      { word: "一起", pinyin: "yì qǐ", meaning: "together" },
      { word: "中文", pinyin: "zhōng wén", meaning: "Chinese language" },
    ]
  },
  "2": {
    title: "Lesson 2",
    subtitle: "我的家庭 (My Family)",
    dialogue: [
      { word: "有", pinyin: "yǒu", meaning: "to have" },
      { word: "几口人", pinyin: "jǐ kǒu rén", meaning: "how many family members" },
      { word: "爸妈", pinyin: "bà mā", meaning: "parents (dad and mom)" },
      { word: "哥姐", pinyin: "gē jiě", meaning: "older siblings (brother and sister)" },
      { word: "爷奶", pinyin: "yé nǎi", meaning: "grandparents (grandpa and grandma)" },
      { word: "弟妹", pinyin: "dì mèi", meaning: "younger siblings (brother and sister)" },
      { word: "父母", pinyin: "fù mǔ", meaning: "parents" },
      { word: "是...的", pinyin: "shì...de", meaning: "emphasis structure" },
      { word: "在", pinyin: "zài", meaning: "at; in" },
      { word: "和", pinyin: "hé", meaning: "and" },
      { word: "做", pinyin: "zuò", meaning: "to do" },
      { word: "工作", pinyin: "gōng zuò", meaning: "work; job" },
      { word: "开", pinyin: "kāi", meaning: "to open; to drive" },
      { word: "说得", pinyin: "shuō de", meaning: "to speak (degree)" },
      { word: "还要", pinyin: "hái yào", meaning: "also want" }
    ],
    reading: [
      { word: "住在", pinyin: "zhù zài", meaning: "live in" },
      { word: "要", pinyin: "yào", meaning: "want" },
      { word: "已经", pinyin: "yǐ jīng", meaning: "already" },
      { word: "又", pinyin: "yòu", meaning: "again" },
      { word: "到", pinyin: "dào", meaning: "arrive" },
      { word: "都", pinyin: "dōu", meaning: "all" },
      { word: "从", pinyin: "cóng", meaning: "from" },
      { word: "移民", pinyin: "yí mín", meaning: "immigrate" },
      { word: "了", pinyin: "le", meaning: "particle" },
      { word: "们", pinyin: "men", meaning: "plural suffix" },
      { word: "早年", pinyin: "zǎo nián", meaning: "early years" },
      { word: "中国城", pinyin: "zhōng guó chéng", meaning: "Chinatown" },
    ],
    vocab: [
      { word: "家", pinyin: "jiā", meaning: "family; home" },
      { word: "几", pinyin: "jǐ", meaning: "how many; several" },
      { word: "有", pinyin: "yǒu", meaning: "to have" },
      { word: "口", pinyin: "kǒu", meaning: "mouth; (measure word for number of people in a family)" },
      { word: "人", pinyin: "rén", meaning: "person; people" },
      { word: "爸爸", pinyin: "bà ba", meaning: "father; dad" },
      { word: "妈妈", pinyin: "mā ma", meaning: "mom" },
      { word: "哥哥", pinyin: "gē ge", meaning: "older brother" },
      { word: "姐姐", pinyin: "jiě jie", meaning: "older sister" },
      { word: "和", pinyin: "hé", meaning: "and" },
      { word: "爷爷", pinyin: "yé ye", meaning: "grandpa (on the father’s side)" },
      { word: "奶奶", pinyin: "nǎi nai", meaning: "grandma (on the father’s side)" },
      { word: "弟弟", pinyin: "dì di", meaning: "younger brother" },
      { word: "妹妹", pinyin: "mèi mei", meaning: "younger sister" },
      { word: "做", pinyin: "zuò", meaning: "to do" },
      { word: "工作", pinyin: "gōng zuò", meaning: "job; to work" },
      { word: "开", pinyin: "kāi", meaning: "to open; to operate" },
      { word: "餐馆", pinyin: "cān guǎn", meaning: "restaurant" },
      { word: "会计", pinyin: "kuài jì", meaning: "accountant" },
      { word: "电脑", pinyin: "diàn nǎo", meaning: "computer (PC)" },
      { word: "工程师", pinyin: "gōng chéng shī", meaning: "engineer" },
      { word: "老师", pinyin: "lǎo shī", meaning: "teacher" },
      { word: "研究生", pinyin: "yán jiū shēng", meaning: "graduate student" },
      { word: "商业", pinyin: "shāng yè", meaning: "business; commerce" },
      { word: "管理", pinyin: "guǎn lǐ", meaning: "to manage; management" },
      { word: "护士", pinyin: "hù shi", meaning: "nurse" },
      { word: "在", pinyin: "zài", meaning: "at; in; on" },
      { word: "中学", pinyin: "zhōng xué", meaning: "secondary school" },
      { word: "念", pinyin: "niàn", meaning: "to attend school; to study; to read aloud" },
      { word: "小学", pinyin: "xiǎo xué", meaning: "primary school" },
      { word: "父母", pinyin: "fù mǔ", meaning: "parents" },
      { word: "从", pinyin: "cóng", meaning: "from" },
      { word: "哪里", pinyin: "nǎ lǐ", meaning: "where" },
      { word: "这么", pinyin: "zhè me", meaning: "so" },
      { word: "难怪", pinyin: "nán guài", meaning: "No wonder" },
      { word: "说", pinyin: "shuō", meaning: "to speak" },
      { word: "得", pinyin: "de", meaning: "particle (to introduce a degree complement)" },
      { word: "还", pinyin: "hái", meaning: "still; also" },
      { word: "多", pinyin: "duō", meaning: "many; much" },
      { word: "东西", pinyin: "dōng xi", meaning: "thing; stuff" },
      { word: "要", pinyin: "yào", meaning: "to want; to need; to be going to" },
      { word: "已经", pinyin: "yǐ jīng", meaning: "already" },
      { word: "退休", pinyin: "tuì xiū", meaning: "to retire" },
      { word: "了", pinyin: "le", meaning: "particle (to indicate completion or change of situation)" },
      { word: "住", pinyin: "zhù", meaning: "to reside; to live" },
      { word: "早年", pinyin: "zǎo nián", meaning: "long ago" },
      { word: "移民", pinyin: "yí mín", meaning: "to immigrate; immigrant" },
      { word: "到", pinyin: "dào", meaning: "to arrive; to reach; to" },
      { word: "又", pinyin: "yòu", meaning: "again (in the past)" },
      { word: "们", pinyin: "men", meaning: "plural suffix for personal pronouns" },
      { word: "老板", pinyin: "lǎo bǎn", meaning: "boss" },
      { word: "都", pinyin: "dōu", meaning: "all; both" },]
  },
  "3": {
    title: "Lesson 3",
    subtitle: "我的大学 (My College Life)",
    dialogue: [
      { word: "生活", pinyin: "shēng huó", meaning: "life" },
      { word: "学期", pinyin: "xué qī", meaning: "semester" },
      { word: "选", pinyin: "xuǎn", meaning: "choose" },
      { word: "几门课", pinyin: "jǐ mén kè", meaning: "how many courses" },
      { word: "个", pinyin: "gè", meaning: "measure word" },
      { word: "想", pinyin: "xiǎng", meaning: "want/think" },
      { word: "学校", pinyin: "xué xiào", meaning: "school" },
      { word: "为什么", pinyin: "wèi shén me", meaning: "why" },
      { word: "因为", pinyin: "yīn wèi", meaning: "because" },
      { word: "那", pinyin: "nà", meaning: "that" },
      { word: "去", pinyin: "qù", meaning: "go" },
      { word: "打", pinyin: "dǎ", meaning: "play" },
      { word: "喜欢", pinyin: "xǐ huān", meaning: "like" },
      { word: "玩", pinyin: "wán", meaning: "play" },
      { word: "时候", pinyin: "shí hou", meaning: "time" },
      { word: "一言为定", pinyin: "yì yán wéi dìng", meaning: "deal" },
    ],
    reading: [
      { word: "里边", pinyin: "lǐ biān", meaning: "inside" },
      { word: "美", pinyin: "měi", meaning: "beautiful" },
      { word: "校园", pinyin: "xiào yuán", meaning: "campus" },
      { word: "图书馆", pinyin: "tú shū guǎn", meaning: "library" },
      { word: "商店", pinyin: "shāng diàn", meaning: "store" },
      { word: "座", pinyin: "zuò", meaning: "measure word" },
      { word: "活动中心", pinyin: "huó dòng zhōng xīn", meaning: "activity center" },
      { word: "游泳池", pinyin: "yóu yǒng chí", meaning: "pool" },
      { word: "楼房", pinyin: "lóu fáng", meaning: "building" },
      { word: "球场", pinyin: "qiú chǎng", meaning: "field" },
      { word: "绿草坪", pinyin: "lǜ cǎo píng", meaning: "lawn" },
    ],
    vocab: [
      { word: "生活", pinyin: "shēng huó", meaning: "life; to live" },
      { word: "个", pinyin: "gè", meaning: "generic measure word" },
      { word: "学期", pinyin: "xué qī", meaning: "semester" },
      { word: "选", pinyin: "xuǎn", meaning: "to select" },
      { word: "门", pinyin: "mén", meaning: "measure word for school subjects" },
      { word: "课", pinyin: "kè", meaning: "school subject; lesson" },
      { word: "一些", pinyin: "yìxiē", meaning: "some; unspecified number" },
      { word: "为什么", pinyin: "wèi shén me", meaning: "why" },
      { word: "因为", pinyin: "yīn wèi", meaning: "because" },
      { word: "想", pinyin: "xiǎng", meaning: "want; to think; to miss" },
      { word: "快点", pinyin: "kuài diǎn", meaning: "faster" },
      { word: "早点", pinyin: "zǎo diǎn", meaning: "earlier, sooner" },
      { word: "毕业", pinyin: "bì yè", meaning: "to graduate; graduation" },
      { word: "那", pinyin: "nà", meaning: "in that case; that" },
      { word: "数学", pinyin: "shù xué", meaning: "math" },
      { word: "经济学", pinyin: "jīng jì xué", meaning: "economics" },
      { word: "会计学", pinyin: "kuài jì xué", meaning: "accounting" },
      { word: "历史", pinyin: "lì shǐ", meaning: "history" },
      { word: "文学", pinyin: "wén xué", meaning: "literature" },
      { word: "还有", pinyin: "hái yǒu", meaning: "also; in addition" },
      { word: "只", pinyin: "zhǐ", meaning: "only" },
      { word: "化学", pinyin: "huà xué", meaning: "chemistry" },
      { word: "生物学", pinyin: "shēng wù xué", meaning: "biology" },
      { word: "音乐", pinyin: "yīn yuè", meaning: "music" },
      { word: "喜欢", pinyin: "xǐ huan", meaning: "to like" },
      { word: "爱", pinyin: "ài", meaning: "to love" },
      { word: "唱歌", pinyin: "chàng gē", meaning: "to sing" },
      { word: "弹", pinyin: "tán", meaning: "to pluck; to play (musical instrument)" },
      { word: "钢琴", pinyin: "gāng qín", meaning: "piano" },
      { word: "打", pinyin: "dǎ", meaning: "to hit; to play (ball)" },
      { word: "篮球", pinyin: "lán qiú", meaning: "basketball" },
      { word: "玩", pinyin: "wán", meaning: "to play; to have fun" },
      { word: "电子", pinyin: "diàn zǐ", meaning: "electronic" },
      { word: "游戏", pinyin: "yóu xì", meaning: "games" },
      { word: "时候", pinyin: "shí hou", meaning: "time, when" },
      { word: "去", pinyin: "qù", meaning: "to go" },
      { word: "一言为定", pinyin: "yī yán wéi dìng", meaning: "It’s a deal" },
      { word: "学校", pinyin: "xué xiào", meaning: "school" },
      { word: "座", pinyin: "zuò", meaning: "measure word for buildings" },
      { word: "大学城", pinyin: "dà xué chéng", meaning: "college town" },
      { word: "里边", pinyin: "lǐ bian", meaning: "inside" },
      { word: "校园", pinyin: "xiào yuán", meaning: "campus" },
      { word: "大", pinyin: "dà", meaning: "big, large" },
      { word: "美", pinyin: "měi", meaning: "beautiful" },
      { word: "除了...以外", pinyin: "chú le... yǐ wài", meaning: "except; besides" },
      { word: "教学楼", pinyin: "jiào xué lóu", meaning: "classroom building" },
      { word: "图书馆", pinyin: "tú shū guǎn", meaning: "library" },
      { word: "体育馆", pinyin: "tǐ yù guǎn", meaning: "gymnasium" },
      { word: "活动", pinyin: "huó dòng", meaning: "activity" },
      { word: "中心", pinyin: "zhōng xīn", meaning: "center" },
      { word: "餐厅", pinyin: "cān tīng", meaning: "cafeteria; dining hall" },
      { word: "商店", pinyin: "shāng diàn", meaning: "store; shop" },
      { word: "礼堂", pinyin: "lǐ táng", meaning: "auditorium" },
      { word: "健身房", pinyin: "jiàn shēn fáng", meaning: "fitness room" },
      { word: "游泳池", pinyin: "yóu yǒng chí", meaning: "swimming pool" },
      { word: "球场", pinyin: "qiú chǎng", meaning: "ball court" },
      { word: "等等", pinyin: "děng děng", meaning: "so on; etc." },
      { word: "楼房", pinyin: "lóu fáng", meaning: "building" },
      { word: "到处", pinyin: "dào chù", meaning: "everywhere" },
      { word: "绿", pinyin: "lǜ", meaning: "green" },
      { word: "草坪", pinyin: "cǎo píng", meaning: "lawn" }
    ]
  },
  "4": {
    title: "Lesson 4",
    subtitle: "我的学生生活 (My Student Life)",
    dialogue: [
      { word: "经常", pinyin: "jīng cháng", meaning: "often" },
      { word: "就", pinyin: "jiù", meaning: "then" },
      { word: "每天", pinyin: "měi tiān", meaning: "every day" },
      { word: "三点一线", pinyin: "sān diǎn yī xiàn", meaning: "routine life" },
      { word: "吃", pinyin: "chī", meaning: "eat" },
      { word: "饭菜", pinyin: "fàn cài", meaning: "food" },
      { word: "没有", pinyin: "méi yǒu", meaning: "not have" },
      { word: "对了", pinyin: "duì le", meaning: "by the way" },
      { word: "请", pinyin: "qǐng", meaning: "please" },
      { word: "上课", pinyin: "shàng kè", meaning: "attend class" },
      { word: "会有意思", pinyin: "huì yǒu yì si", meaning: "will be interesting" },
      { word: "忘", pinyin: "wàng", meaning: "forget" },
      { word: "太忙了", pinyin: "tài máng le", meaning: "too busy" },
      { word: "教室", pinyin: "jiào shì", meaning: "classroom" },
      { word: "社团", pinyin: "shè tuán", meaning: "club" },
      { word: "自习", pinyin: "zì xí", meaning: "self-study" },
    ],
    reading: [
      { word: "除了…还…", pinyin: "chú le...hái...", meaning: "besides...also..." },
      { word: "除了…就是…", pinyin: "chú le...jiù shì...", meaning: "nothing but" },
      { word: "可以", pinyin: "kě yǐ", meaning: "can" },
      { word: "交", pinyin: "jiāo", meaning: "make (friends)" },
      { word: "新朋友", pinyin: "xīn péng you", meaning: "new friends" },
      { word: "聊天", pinyin: "liáo tiān", meaning: "chat" },
      { word: "不过", pinyin: "bú guò", meaning: "however" },
      { word: "特别", pinyin: "tè bié", meaning: "especially" },
      { word: "参加", pinyin: "cān jiā", meaning: "participate" },
      { word: "花钱", pinyin: "huā qián", meaning: "spend money" },
      { word: "月底", pinyin: "yuè dǐ", meaning: "end of month" },
    ],
    vocab: [
      { word: "哦", pinyin: "ó", meaning: "oh" },
      { word: "正好", pinyin: "zhèng hǎo", meaning: "to happen to" },
      { word: "走", pinyin: "zǒu", meaning: "to walk" },
      { word: "经常", pinyin: "jīng cháng", meaning: "often" },
      { word: "上课", pinyin: "shàng kè", meaning: "to attend class" },
      { word: "就", pinyin: "jiù", meaning: "as early as; precisely" },
      { word: "每天", pinyin: "měi tiān", meaning: "every day" },
      { word: "三点一线", pinyin: "sān diǎn yī xiàn", meaning: "to follow the same route" },
      { word: "宿舍", pinyin: "sù shè", meaning: "dorm" },
      { word: "教室", pinyin: "jiào shì", meaning: "classroom" },
      { word: "有时", pinyin: "yǒu shí", meaning: "sometimes" },
      { word: "吃", pinyin: "chī", meaning: "to eat" },
      { word: "饭菜", pinyin: "fàn cài", meaning: "food; meal" },
      { word: "一点也不", pinyin: "yī diǎn yě bù", meaning: "not at all" },
      { word: "没有", pinyin: "méi yǒu", meaning: "not have" },
      { word: "好吃", pinyin: "hǎo chī", meaning: "delicious" },
      { word: "对了", pinyin: "duì le", meaning: "by the way" },
      { word: "差点", pinyin: "chà diǎn", meaning: "nearly, almost" },
      { word: "忘", pinyin: "wàng", meaning: "to forget" },
      { word: "请", pinyin: "qǐng", meaning: "to invite" },
      { word: "一定", pinyin: "yī dìng", meaning: "certainly; definitely" },
      { word: "还好", pinyin: "hái hǎo", meaning: "it’s alright" },
      { word: "忙", pinyin: "máng", meaning: "busy" },
      { word: "自习", pinyin: "zì xí", meaning: "to study by oneself" },
      { word: "参加", pinyin: "cān jiā", meaning: "to join; participate" },
      { word: "社团", pinyin: "shè tuán", meaning: "club; association" },
      { word: "会", pinyin: "huì", meaning: "will; know how" },
      { word: "有意思", pinyin: "yǒu yì si", meaning: "interesting" },
      { word: "太好了", pinyin: "tài hǎo le", meaning: "great; terrific" },
      { word: "新", pinyin: "xīn", meaning: "new" },
      { word: "可以", pinyin: "kě yǐ", meaning: "may; can" },
      { word: "交", pinyin: "jiāo", meaning: "to make friends; to submit" },
      { word: "朋友", pinyin: "péng you", meaning: "friend" },
      { word: "聊天", pinyin: "liáo tiān", meaning: "to chat" },
      { word: "开心", pinyin: "kāi xīn", meaning: "happy" },
      { word: "不过", pinyin: "bù guò", meaning: "but" },
      { word: "特别", pinyin: "tè bié", meaning: "especially" },
      { word: "钱", pinyin: "qián", meaning: "money" },
      { word: "花", pinyin: "huā", meaning: "to spend" },
      { word: "不", pinyin: "bù", meaning: "no; not" },
      { word: "月底", pinyin: "yuè dǐ", meaning: "end of the month" },
      { word: "光", pinyin: "guāng", meaning: "finished completely; light" }
    ]
  },
  "5": {
    title: "Lesson 5",
    subtitle: "我的街区 (My Neighborhood)",
    dialogue: [],
    reading: [
      { word: "街区", pinyin: "jiē qū", meaning: "neighborhood" },
      { word: "市郊", pinyin: "shì jiāo", meaning: "suburbs" },
      { word: "半小时", pinyin: "bàn xiǎo shí", meaning: "half an hour" },
      { word: "周末", pinyin: "zhōu mò", meaning: "weekend" },
      { word: "全家", pinyin: "quán jiā", meaning: "whole family" },
      { word: "方便", pinyin: "fāng biàn", meaning: "convenient" },
      { word: "买东西", pinyin: "mǎi dōng xi", meaning: "shop; buy things" },
      { word: "医院", pinyin: "yī yuàn", meaning: "hospital" },
      { word: "公园", pinyin: "gōng yuán", meaning: "park" },
      { word: "邻居", pinyin: "lín jū", meaning: "neighbor" },
      { word: "安全", pinyin: "ān quán", meaning: "safe" },
      { word: "到处", pinyin: "dào chù", meaning: "everywhere" },
      { word: "友好", pinyin: "yǒu hǎo", meaning: "friendly" },
      { word: "虽然…但是…", pinyin: "suī rán...dàn shì...", meaning: "although...but..." },
    ],
    vocab: [
      { word: "社区", pinyin: "shè qū", meaning: "community" },
      { word: "街区", pinyin: "jiē qū", meaning: "neighborhood; block" },
      { word: "区", pinyin: "qū", meaning: "district; borough" },
      { word: "大道", pinyin: "dà dào", meaning: "avenue" },
      { word: "街", pinyin: "jiē", meaning: "street" },
      { word: "店", pinyin: "diàn", meaning: "store" },
      { word: "附近", pinyin: "fù jìn", meaning: "nearby" },
      { word: "当然", pinyin: "dāng rán", meaning: "of course" },
      { word: "超市", pinyin: "chāo shì", meaning: "supermarket" },
      { word: "洗衣店", pinyin: "xǐ yī diàn", meaning: "laundromat" },
      { word: "理发店", pinyin: "lǐ fà diàn", meaning: "barber shop" },
      { word: "交通", pinyin: "jiāo tōng", meaning: "traffic; transportation" },
      { word: "方便", pinyin: "fāng biàn", meaning: "convenient; convenience" },
      { word: "巴士", pinyin: "bā shì", meaning: "bus" },
      { word: "地铁", pinyin: "dì tiě", meaning: "subway" },
      { word: "站", pinyin: "zhàn", meaning: "station; stop; to stand" },
      { word: "分钟", pinyin: "fēn zhōng", meaning: "minute" },
      { word: "路", pinyin: "lù", meaning: "road" },
      { word: "停车", pinyin: "tíng chē", meaning: "to stop a car; to park" },
      { word: "停车场", pinyin: "tíng chē chǎng", meaning: "parking lot; parking garage" },
      { word: "虽然", pinyin: "suī rán", meaning: "although" },
      { word: "但是", pinyin: "dàn shì", meaning: "but; however" },
      { word: "总是", pinyin: "zǒng shì", meaning: "always" },
      { word: "满", pinyin: "mǎn", meaning: "full" },
      { word: "费", pinyin: "fèi", meaning: "fee" },
      { word: "蛮", pinyin: "mán", meaning: "quite; rather (colloq.)" },
      { word: "贵", pinyin: "guì", meaning: "expensive" },
      { word: "上街", pinyin: "shàng jiē", meaning: "to go shopping" },
      { word: "走路", pinyin: "zǒu lù", meaning: "to walk" },
      { word: "坐", pinyin: "zuò", meaning: "to sit; to ride (in a vehicle)" },
      { word: "坐车", pinyin: "zuò chē", meaning: "to ride in a car, bus, or train" },
      { word: "开车", pinyin: "kāi chē", meaning: "to drive" },
      { word: "不一定", pinyin: "bù yī dìng", meaning: "it depends; not necessarily" },
      { word: "近", pinyin: "jìn", meaning: "near" },
      { word: "远", pinyin: "yuǎn", meaning: "far" },
      { word: "一般", pinyin: "yī bān", meaning: "generally" },
      { word: "安静", pinyin: "ān jìng", meaning: "quiet" },
      { word: "比较", pinyin: "bǐ jiào", meaning: "relatively; comparatively" },
      { word: "安全", pinyin: "ān quán", meaning: "safe" },
      { word: "看", pinyin: "kàn", meaning: "to look; to watch; to read" },
      { word: "欢迎", pinyin: "huān yíng", meaning: "to welcome; welcome" },
      { word: "时间", pinyin: "shí jiān", meaning: "time" },
      { word: "做客", pinyin: "zuò kè", meaning: "to be a guest" },
      { word: "市郊", pinyin: "shì jiāo", meaning: "suburb" },
      { word: "离", pinyin: "lí", meaning: "away from" },
      { word: "市区", pinyin: "shì qū", meaning: "city proper; downtown" },
      { word: "半", pinyin: "bàn", meaning: "half" },
      { word: "小时", pinyin: "xiǎo shí", meaning: "hour" },
      { word: "周末", pinyin: "zhōu mò", meaning: "weekend" },
      { word: "全", pinyin: "quán", meaning: "all of; complete" },
      { word: "城里", pinyin: "chéng lǐ", meaning: "inner city" },
      { word: "买", pinyin: "mǎi", meaning: "to buy; to shop" },
      { word: "医院", pinyin: "yī yuàn", meaning: "hospital" },
      { word: "公园", pinyin: "gōng yuán", meaning: "park" },
      { word: "邻居", pinyin: "lín jū", meaning: "neighbor" },
      { word: "友好", pinyin: "yǒu hǎo", meaning: "friendly" }
    ]
  },
  "6": {
    title: "Lesson 6",
    subtitle: "中国城 (ChinaTown)",
    dialogue: [],
    reading: [
      { word: "离", pinyin: "lí", meaning: "distance from" },
      { word: "从早到晚", pinyin: "cóng zǎo dào wǎn", meaning: "from morning to night" },
      { word: "热闹", pinyin: "rè nao", meaning: "lively" },
      { word: "教堂", pinyin: "jiào táng", meaning: "church" },
      { word: "吵闹", pinyin: "chǎo nào", meaning: "noisy" },
      { word: "v.+着", pinyin: "v.+zhe", meaning: "ongoing action marker" },
      { word: "主要", pinyin: "zhǔ yào", meaning: "main; primary" },
      { word: "其他", pinyin: "qí tā", meaning: "other" },
      { word: "国家", pinyin: "guó jiā", meaning: "country" },
      { word: "华裔", pinyin: "huá yì", meaning: "ethnic Chinese" },
      { word: "菜市场", pinyin: "cài shì chǎng", meaning: "food market" },
      { word: "街心", pinyin: "jiē xīn", meaning: "street center" },
      { word: "地铁", pinyin: "dì tiě", meaning: "subway" },
      { word: "巴士", pinyin: "bā shì", meaning: "bus" },
      { word: "坐", pinyin: "zuò", meaning: "to sit; ride" },
    ],
    vocab: [
      { word: "哪", pinyin: "nǎ", meaning: "which" },
      { word: "条", pinyin: "tiáo", meaning: "measure word for street, road, river, pants" },
      { word: "交叉", pinyin: "jiāo chā", meaning: "cross; crossed" },
      { word: "路口", pinyin: "lù kǒu", meaning: "intersection; block" },
      { word: "大厦", pinyin: "dà shà", meaning: "high building" },
      { word: "上班", pinyin: "shàng bān", meaning: "to go to work" },
      { word: "过", pinyin: "guò", meaning: "to pass; (experiential particle)" },
      { word: "号", pinyin: "hào", meaning: "number" },
      { word: "下车", pinyin: "xià chē", meaning: "to get off (from a car, bus, train)" },
      { word: "最", pinyin: "zuì", meaning: "the most" },
      { word: "或者", pinyin: "huò zhě", meaning: "or (affirmative sentence)" },
      { word: "问题", pinyin: "wèn tí", meaning: "question; problem" },
      { word: "市中心", pinyin: "shì zhōng xīn", meaning: "city center; downtown" },
      { word: "早", pinyin: "zǎo", meaning: "early; morning" },
      { word: "晚", pinyin: "wǎn", meaning: "late; evening" },
      { word: "热闹", pinyin: "rè nao", meaning: "bustling with noise and excitement" },
      { word: "菜市场", pinyin: "cài shì chǎng", meaning: "vegetable stands; farmer’s market" },
      { word: "教堂", pinyin: "jiào táng", meaning: "church" },
      { word: "街心", pinyin: "jiē xīn", meaning: "street corner" },
      { word: "吵闹", pinyin: "chǎo nào", meaning: "noisy" },
      { word: "着", pinyin: "zhe", meaning: "(to indicate continuous or stationary status)" },
      { word: "主要", pinyin: "zhǔ yào", meaning: "main; mainly" },
      { word: "其他", pinyin: "qí tā", meaning: "other" },
      { word: "国家", pinyin: "guó jiā", meaning: "country; nation" },
      { word: "华裔", pinyin: "huá yì", meaning: "of Chinese descent" }
    ]
  },
  "7": {
    title: "Lesson 7",
    subtitle: "在中餐馆吃饭 (Eating out at a Chinese Restaurant)",
    dialogue: [
      { word: "生意", pinyin: "shēng yì", meaning: "business" },
      { word: "进", pinyin: "jìn", meaning: "enter" },
      { word: "服务员", pinyin: "fú wù yuán", meaning: "waiter/waitress" },
      { word: "欢迎", pinyin: "huān yíng", meaning: "welcome" },
      { word: "问", pinyin: "wèn", meaning: "to ask" },
      { word: "两位", pinyin: "liǎng wèi", meaning: "two (people, polite)" },
      { word: "喝茶", pinyin: "hē chá", meaning: "drink tea" },
      { word: "杯", pinyin: "bēi", meaning: "cup (measure word)" },
      { word: "点（菜）", pinyin: "diǎn (cài)", meaning: "order (food)" },
      { word: "不客气", pinyin: "bú kè qi", meaning: "you're welcome" },
      { word: "尝", pinyin: "cháng", meaning: "to taste" },
      { word: "慢用", pinyin: "màn yòng", meaning: "enjoy your meal" },
      { word: "请客", pinyin: "qǐng kè", meaning: "treat someone" },
      { word: "谢谢", pinyin: "xiè xie", meaning: "thank you" },
      { word: "炒", pinyin: "chǎo", meaning: "stir-fry" },
      { word: "口福", pinyin: "kǒu fú", meaning: "good luck with food" },
      { word: "买单", pinyin: "mǎi dān", meaning: "pay the bill" },
      { word: "下次", pinyin: "xià cì", meaning: "next time" },
    ],
    reading: [
      { word: "星期", pinyin: "xīng qī", meaning: "week" },
      { word: "所有", pinyin: "suǒ yǒu", meaning: "all" },
      { word: "桌子", pinyin: "zhuō zi", meaning: "table" },
      { word: "排队", pinyin: "pái duì", meaning: "line up" },
      { word: "红", pinyin: "hóng", meaning: "red" },
      { word: "各式各样", pinyin: "gè shì gè yàng", meaning: "various kinds" },
      { word: "五花八门", pinyin: "wǔ huā bā mén", meaning: "wide variety" },
      { word: "一边…一边…", pinyin: "yì biān...yì biān...", meaning: "simultaneously" },
      { word: "品尝", pinyin: "pǐn cháng", meaning: "to taste" },
      { word: "饺", pinyin: "jiǎo", meaning: "dumpling (part)" },
      { word: "包", pinyin: "bāo", meaning: "wrap; bun" },
    ],
    vocab: [
      { word: "哇", pinyin: "wā", meaning: "Wow" },
      { word: "生意", pinyin: "shēng yi", meaning: "business" },
      { word: "兴隆", pinyin: "xīng lóng", meaning: "brisk (business); prosperous" },
      { word: "进", pinyin: "jìn", meaning: "to enter" },
      { word: "服务员", pinyin: "fú wù yuán", meaning: "waiter; waitress; service person" },
      { word: "欢迎光临", pinyin: "huān yíng guāng lín", meaning: "Welcome (formal)" },
      { word: "问", pinyin: "wèn", meaning: "to ask" },
      { word: "位", pinyin: "wèi", meaning: "seat; (measure word for people)" },
      { word: "两", pinyin: "liǎng", meaning: "two (used before measure word)" },
      { word: "喝", pinyin: "hē", meaning: "to drink" },
      { word: "茶", pinyin: "chá", meaning: "tea" },
      { word: "奶", pinyin: "nǎi", meaning: "milk" },
      { word: "对不起", pinyin: "duì bu qǐ", meaning: "sorry; excuse me" },
      { word: "杯", pinyin: "bēi", meaning: "cup; (measure word for liquid)" },
      { word: "碟", pinyin: "dié", meaning: "plate; disc; (measure word for dish or disc)" },
      { word: "小菜", pinyin: "xiǎo cài", meaning: "side dishes" },
      { word: "菜单", pinyin: "cài dān", meaning: "Menu" },
      { word: "点", pinyin: "diǎn", meaning: "to order (food), to point; bit, dot, o’clock" },
      { word: "请客", pinyin: "qǐng kè", meaning: "to treat someone" },
      { word: "客气", pinyin: "kè qi", meaning: "polite" },
      { word: "尝", pinyin: "cháng", meaning: "to taste, to try" },
      { word: "慢用", pinyin: "màn yòng", meaning: "Bon appetite" },
      { word: "真", pinyin: "zhēn", meaning: "really" },
      { word: "拿手菜", pinyin: "ná shǒu cài", meaning: "special dish" },
      { word: "炒", pinyin: "chǎo", meaning: "to stir-fry" },
      { word: "让", pinyin: "ràng", meaning: "to let; to allow; to give in" },
      { word: "口福", pinyin: "kǒu fú", meaning: "gastronomic luck" },
      { word: "买单", pinyin: "mǎi dān", meaning: "to pay the bill" },
      { word: "谢谢", pinyin: "xiè xie", meaning: "thanks" },
      { word: "下次", pinyin: "xià cì", meaning: "next time" },
      { word: "次", pinyin: "cì", meaning: "measure word for ‘time’" },
      { word: "星期", pinyin: "xīng qī", meaning: "week" },
      { word: "星期天", pinyin: "xīng qī tiān", meaning: "Sunday" },
      { word: "上午", pinyin: "shàng wǔ", meaning: "morning" },
      { word: "早茶", pinyin: "zǎo chá", meaning: "morning tea" },
      { word: "所有", pinyin: "suǒ yǒu", meaning: "all" },
      { word: "桌子", pinyin: "zhuō zi", meaning: "table" },
      { word: "不少", pinyin: "bù shǎo", meaning: "quite a lot" },
      { word: "排队", pinyin: "pái duì", meaning: "to stand in line; to queue up" },
      { word: "品种", pinyin: "pǐn zhǒng", meaning: "variety" },
      { word: "红", pinyin: "hóng", meaning: "red" },
      { word: "点心", pinyin: "diǎn xin", meaning: "desserts; dim sum" },
      { word: "五花八门", pinyin: "wǔ huā bā mén", meaning: "multivarious; of a wide variety" },
      { word: "各式各样", pinyin: "gè shì gè yàng", meaning: "all kinds of; of different varieties" },
      { word: "小炒", pinyin: "xiǎo chǎo", meaning: "small stir-fried dish; side dishes" },
      { word: "一边", pinyin: "yī biān", meaning: "at the same time" },
      { word: "品尝", pinyin: "pǐn cháng", meaning: "to taste; to savor" }
    ]
  },
  "8":{
    title: "Lesson 8",
    subtitle: "在朋友家做客​ (Visiting a Friend’s Family)",
    dialogue:[
      { word: "您", pinyin: "nín", meaning: "you (polite)" },
      { word: "给", pinyin: "gěi", meaning: "to give" },
      { word: "怎么", pinyin: "zěn me", meaning: "how" },
      { word: "礼物", pinyin: "lǐ wù", meaning: "gift" },
      { word: "带", pinyin: "dài", meaning: "bring" },
      { word: "层", pinyin: "céng", meaning: "floor (measure word)" },
      { word: "浴室", pinyin: "yù shì", meaning: "bathroom" },
      { word: "客厅", pinyin: "kè tīng", meaning: "living room" },
      { word: "厨房", pinyin: "chú fáng", meaning: "kitchen" },
      { word: "洗手间", pinyin: "xǐ shǒu jiān", meaning: "restroom" },
      { word: "吃得/不惯", pinyin: "chī de/bù guàn", meaning: "used to eating/not used to" },
      { word: "家常便饭", pinyin: "jiā cháng biàn fàn", meaning: "home-style meal" },
      { word: "开始", pinyin: "kāi shǐ", meaning: "start" },
      { word: "几道菜", pinyin: "jǐ dào cài", meaning: "several dishes" },
      { word: "只是…而已", pinyin: "zhǐ shì...ér yǐ", meaning: "just...only" },
    ],
    reading: [
      { word: "地方特产", pinyin: "dì fāng tè chǎn", meaning: "local specialty" },
      { word: "换上", pinyin: "huàn shàng", meaning: "change into" },
      { word: "入座", pinyin: "rù zuò", meaning: "take a seat" },
      { word: "招待", pinyin: "zhāo dài", meaning: "entertain guests" },
      { word: "留", pinyin: "liú", meaning: "stay; keep" },
      { word: "长辈", pinyin: "zhǎng bèi", meaning: "elders" },
      { word: "应该", pinyin: "yīng gāi", meaning: "should" },
      { word: "帮", pinyin: "bāng", meaning: "help" },
      { word: "碗筷", pinyin: "wǎn kuài", meaning: "bowls and chopsticks" },
      { word: "送", pinyin: "sòng", meaning: "to give/send" },
      { word: "水果", pinyin: "shuǐ guǒ", meaning: "fruit" },
      { word: "收拾", pinyin: "shōu shi", meaning: "clean up" },
      { word: "才", pinyin: "cái", meaning: "only then" },
    ],
    vocab: [
      { word: "伯父", pinyin: "bó fù", meaning: "uncle (father’s older brother); respectful term for older men" },
      { word: "伯母", pinyin: "bó mǔ", meaning: "aunt (wife of father’s older brother); respectful term for older women" },
      { word: "您", pinyin: "nín", meaning: "you (honorific; singular and plural)" },
      { word: "一点", pinyin: "yī diǎn", meaning: "a little" },
      { word: "给", pinyin: "gěi", meaning: "to give" },
      { word: "礼物", pinyin: "lǐ wù", meaning: "gift" },
      { word: "怎么", pinyin: "zěn me", meaning: "how; how come" },
      { word: "带", pinyin: "dài", meaning: "to bring" },
      { word: "层", pinyin: "céng", meaning: "story (of building); layer" },
      { word: "而已", pinyin: "ér yǐ", meaning: "that’s all" },
      { word: "卧室", pinyin: "wò shì", meaning: "bedroom" },
      { word: "浴室", pinyin: "yù shì", meaning: "bathroom" },
      { word: "客厅", pinyin: "kè tīng", meaning: "living room" },
      { word: "厨房", pinyin: "chú fáng", meaning: "kitchen" },
      { word: "洗手间", pinyin: "xǐ shǒu jiān", meaning: "restroom; powder room" },
      { word: "厨艺", pinyin: "chú yì", meaning: "culinary art; cooking skills" },
      { word: "家常便饭", pinyin: "jiā cháng biàn fàn", meaning: "homely, simple meal; common occurrence" },
      { word: "刚", pinyin: "gāng", meaning: "just now" },
      { word: "开始", pinyin: "kāi shǐ", meaning: "to begin" },
      { word: "习惯", pinyin: "xí guàn", meaning: "habit; to get used to" },
      { word: "现在", pinyin: "xiàn zài", meaning: "now" },
      { word: "为", pinyin: "wèi", meaning: "for" },
      { word: "道", pinyin: "dào", meaning: "course; (measure word for dish)" },
      { word: "准备", pinyin: "zhǔ nèi", meaning: "to prepare" },
      { word: "如", pinyin: "rú", meaning: "such as; for example" },
      { word: "水果", pinyin: "shuǐ guǒ", meaning: "fruit" },
      { word: "茶叶", pinyin: "chá yè", meaning: "dried tea leaves" },
      { word: "地方", pinyin: "dì fang", meaning: "place; local" },
      { word: "特产", pinyin: "tè chǎn", meaning: "local special product; native produce" },
      { word: "客人", pinyin: "kè rén", meaning: "guest" },
      { word: "脱鞋", pinyin: "tuō xié", meaning: "to take off shoes" },
      { word: "换上", pinyin: "huàn shàng", meaning: "to change into" },
      { word: "主人", pinyin: "zhǔ rén", meaning: "host" },
      { word: "拖鞋", pinyin: "tuō xié", meaning: "slippers; sandals" },
      { word: "招待", pinyin: "zhāo dài", meaning: "to treat; to entertain" },
      { word: "留", pinyin: "liú", meaning: "to stay behind; to keep (a guest)" },
      { word: "长辈", pinyin: "zhǎng bèi", meaning: "older people; seniors" },
      { word: "先", pinyin: "xiān", meaning: "first" },
      { word: "入座", pinyin: "rù zuò", meaning: "to take a seat" },
      { word: "动筷", pinyin: "dòng kuài", meaning: "to start eating (lit. to move chopsticks)" },
      { word: "晚辈", pinyin: "wǎn bèi", meaning: "younger people; juniors" },
      { word: "应该", pinyin: "yīng gāi", meaning: "should" },
      { word: "夹菜", pinyin: "jiá cài", meaning: "to add food with chopsticks" },
      { word: "劝", pinyin: "quàn", meaning: "to urge" },
      { word: "完", pinyin: "wán", meaning: "to finish" },
      { word: "以后", pinyin: "yǐ hòu", meaning: "after" },
      { word: "离开", pinyin: "lí kāi", meaning: "to leave" },
      { word: "马上", pinyin: "mǎ shàng", meaning: "right away" },
      { word: "帮", pinyin: "bāng", meaning: "to help" },
      { word: "收拾", pinyin: "shōu shi", meaning: "to clean up" },
      { word: "碗筷", pinyin: "wǎn kuài", meaning: "bowls and chopsticks; empty dishes" },
      { word: "才", pinyin: "cái", meaning: "only then" },
      { word: "送", pinyin: "sòng", meaning: "to send; to see someone off" },
      { word: "门口", pinyin: "mén kǒu", meaning: "door; gate" },
      { word: "直到", pinyin: "zhí dào", meaning: "until" },
      { word: "看不见", pinyin: "kàn bu jiàn", meaning: "cannot be seen" },
      { word: "关", pinyin: "guān", meaning: "to close" }
    ],
  },
  "9": {
    title: "Lesson 9",
    subtitle: "音乐 (Music)",
    dialogue: [
      { word: "应有尽有", pinyin: "yīng yǒu jìn yǒu", meaning: "have everything one expects to find" },
      { word: "古典", pinyin: "gǔ diǎn", meaning: "classical" },
      { word: "首", pinyin: "shǒu", meaning: "measure word for songs" },
      { word: "经久不衰", pinyin: "jīng jiǔ bù shuāi", meaning: "unfailing; enduring" },
      { word: "觉得", pinyin: "jué de", meaning: "to feel; to think" },
      { word: "流行", pinyin: "liú xíng", meaning: "popular" },
      { word: "重要", pinyin: "zhòng yào", meaning: "important" },
      { word: "影响", pinyin: "yǐng xiǎng", meaning: "influence; to affect" },
      { word: "非常", pinyin: "fēi cháng", meaning: "extremely" },
      { word: "演唱会", pinyin: "yǎn chàng huì", meaning: "vocal concert" },
      { word: "作品", pinyin: "zuò pǐn", meaning: "works (of art/literature)" },
      { word: "经典", pinyin: "jīng diǎn", meaning: "classic" },
      { word: "歌手", pinyin: "gē shǒu", meaning: "singer" },
      { word: "由", pinyin: "yóu", meaning: "by; from" }
    ],
    reading: [
      { word: "发展成", pinyin: "fā zhǎn chéng", meaning: "to develop into" },
      { word: "特点", pinyin: "tè diǎn", meaning: "characteristic" },
      { word: "通俗易懂", pinyin: "tōng sú yì dǒng", meaning: "easy to understand" },
      { word: "轻松活泼", pinyin: "qīng sōng huó pō", meaning: "light and lively" },
      { word: "容易", pinyin: "róng yì", meaning: "easy" },
      { word: "被", pinyin: "bèi", meaning: "by (passive marker)" },
      { word: "听众", pinyin: "tīng zhòng", meaning: "audience" },
      { word: "接受", pinyin: "jiē shòu", meaning: "to accept" },
      { word: "世界", pinyin: "shì jiè", meaning: "world" },
      { word: "歌曲", pinyin: "gē qǔ", meaning: "song" },
      { word: "来自于", pinyin: "lái zì yú", meaning: "to come from" },
      { word: "不仅...而且...", pinyin: "bù jǐn...ér qiě...", meaning: "not only... but also..." }
    ],
    vocab: [
      { word: "应有尽有", pinyin: "yīng yǒu jìn yǒu", meaning: "to have everything one expects to find; all encompassing" },
      { word: "古典", pinyin: "gǔ diǎn", meaning: "classical" },
      { word: "之母", pinyin: "zhī mǔ", meaning: "mother of (archaic)" },
      { word: "好像", pinyin: "hǎo xiàng", meaning: "to seem; to be like" },
      { word: "经久不衰", pinyin: "jīng jiǔ bù shuāi", meaning: "everlasting; unfailing" },
      { word: "后来", pinyin: "hòu lái", meaning: "later" },
      { word: "流行", pinyin: "liú xíng", meaning: "popular; to be in vogue" },
      { word: "重要", pinyin: "zhòng yào", meaning: "important" },
      { word: "影响", pinyin: "yǐng xiǎng", meaning: "to influence; influence" },
      { word: "首", pinyin: "shǒu", meaning: "(measure word for music, songs, or poems)" },
      { word: "由", pinyin: "yóu", meaning: "by (somebody); from (some place or something)" },
      { word: "演唱", pinyin: "yǎn chàng", meaning: "to sing; to perform" },
      { word: "经典", pinyin: "jīng diǎn", meaning: "classical; classics" },
      { word: "作品", pinyin: "zuò pǐn", meaning: "composition; works (of art/literature)" },
      { word: "歌手", pinyin: "gē shǒu", meaning: "singer" },
      { word: "结合", pinyin: "jié hé", meaning: "to combine" },
      { word: "现代", pinyin: "xiàn dài", meaning: "modern; contemporary" },
      { word: "长处", pinyin: "cháng chu", meaning: "strength; forte" },
      { word: "非常", pinyin: "fēi cháng", meaning: "extremely" },
      { word: "听", pinyin: "tīng", meaning: "to listen" },
      { word: "动听", pinyin: "dòng tīng", meaning: "melodious; pleasant to listen to" },
      { word: "演唱会", pinyin: "yǎn chàng huì", meaning: "concert" },
      { word: "作为", pinyin: "zuò wéi", meaning: "as; to regard as" },
      { word: "雅俗共赏", pinyin: "yǎ sú gòng shǎng", meaning: "to appeal to both refined and popular tastes" },
      { word: "艺术", pinyin: "yì shù", meaning: "art" },
      { word: "通俗", pinyin: "tōng sú", meaning: "popular; easy to understand" },
      { word: "来自于", pinyin: "lái zì yú", meaning: "to come from (formal)" },
      { word: "发展", pinyin: "fā zhǎn", meaning: "to develop; development" },
      { word: "成", pinyin: "chéng", meaning: "to become" },
      { word: "特点", pinyin: "tè diǎn", meaning: "characteristics" },
      { word: "通俗易懂", pinyin: "tōng sú yì dǒng", meaning: "popular and easy to understand" },
      { word: "轻松活泼", pinyin: "qīng sōng huó pō", meaning: "light and spirited" },
      { word: "容易", pinyin: "róng yì", meaning: "easy" },
      { word: "被", pinyin: "bèi", meaning: "by (marker for passive voice)" },
      { word: "听众", pinyin: "tīng zhòng", meaning: "audience; listener" },
      { word: "接受", pinyin: "jiē shòu", meaning: "to receive; to accept" },
      { word: "不仅...而且", pinyin: "bù jǐn...ér qiě", meaning: "not only... but also" },
      { word: "世界", pinyin: "shì jiè", meaning: "world" },
      { word: "当今", pinyin: "dāng jīn", meaning: "at the present time; nowadays" },
      { word: "歌曲", pinyin: "gē qǔ", meaning: "song" }
    ],
  },
  "10": {
    title: "Lesson 10",
    subtitle: "购物 (Shopping)",
    dialogue: [
      { word: "购物", pinyin: "gòu wù", meaning: "shopping" },
      { word: "偶尔", pinyin: "ǒu ěr", meaning: "occasionally" },
      { word: "逛", pinyin: "guàng", meaning: "to stroll; to visit" },
      { word: "电商", pinyin: "diàn shāng", meaning: "e-commerce" },
      { word: "时尚", pinyin: "shí shàng", meaning: "fashion" },
      { word: "新款", pinyin: "xīn kuǎn", meaning: "new style" },
      { word: "爆款", pinyin: "bào kuǎn", meaning: "hit item; best-seller" },
      { word: "一件卫衣", pinyin: "yí jiàn wèi yī", meaning: "a hoodie" },
      { word: "一条牛仔裤", pinyin: "yì tiáo niú zǎi kù", meaning: "a pair of jeans" },
      { word: "裙子", pinyin: "qún zi", meaning: "skirt" },
      { word: "第", pinyin: "dì", meaning: "prefix for ordinal number" },
      { word: "帽子", pinyin: "mào zi", meaning: "hat" },
      { word: "围巾", pinyin: "wéi jīn", meaning: "scarf" },
      { word: "商场", pinyin: "shāng chǎng", meaning: "shopping mall" },
      { word: "产品", pinyin: "chǎn pǐn", meaning: "product" }
    ],
    reading: [
      { word: "称", pinyin: "chēng", meaning: "to call; to name" },
      { word: "信息", pinyin: "xìn xī", meaning: "information" },
      { word: "获取", pinyin: "huò qǔ", meaning: "obtain" },
      { word: "娱乐", pinyin: "yú lè", meaning: "entertainment" },
      { word: "随着", pinyin: "suí zhe", meaning: "along with" },
      { word: "高科技", pinyin: "gāo kē jì", meaning: "high technology" },
      { word: "越来越", pinyin: "yuè lái yuè", meaning: "more and more" },
      { word: "适可而止", pinyin: "shì kě ér zhǐ", meaning: "stop at the right point" },
      { word: "浪费", pinyin: "làng fèi", meaning: "waste" },
      { word: "互联网", pinyin: "hù lián wǎng", meaning: "internet" },
    ],
    vocab: [
      { word: "巧", pinyin: "qiǎo", meaning: "coincidental" },
      { word: "这里", pinyin: "zhè lǐ", meaning: "here" },
      { word: "碰到", pinyin: "pèng dào", meaning: "to run into" },
      { word: "逛", pinyin: "guàng", meaning: "to stroll; to wander" },
      { word: "商场", pinyin: "shāng chǎng", meaning: "mall; shopping center" },
      { word: "偶尔", pinyin: "ǒu ěr", meaning: "occasionally" },
      { word: "差不多", pinyin: "chà bu duō", meaning: "almost" },
      { word: "时装", pinyin: "shí zhuāng", meaning: "fashionable clothing" },
      { word: "新款", pinyin: "xīn kuǎn", meaning: "new-styled; fashionable" },
      { word: "衣服", pinyin: "yī fu", meaning: "clothes; shirt or blouse" },
      { word: "牛仔裤", pinyin: "niú zǎi kù", meaning: "jeans" },
      { word: "裙子", pinyin: "qún zi", meaning: "skirt; dress" },
      { word: "帽子", pinyin: "mào zi", meaning: "hat" },
      { word: "围巾", pinyin: "wéi jīn", meaning: "scarf" },
      { word: "首饰", pinyin: "shǒu shì", meaning: "jewelry; accessory" },
      { word: "更", pinyin: "gèng", meaning: "even more" },
      { word: "电子", pinyin: "diàn zǐ", meaning: "electronic" },
      { word: "产品", pinyin: "chǎn pǐn", meaning: "product" },
      { word: "游戏", pinyin: "yóu xì", meaning: "game" },
      { word: "功课", pinyin: "gōng kè", meaning: "homework; schoolwork" },
      { word: "夜", pinyin: "yè", meaning: "night" },
      { word: "钟", pinyin: "zhōng", meaning: "clock" },
      { word: "睡觉", pinyin: "shuì jiào", meaning: "to sleep" },
      { word: "一直", pinyin: "yī zhí", meaning: "all the time; always" },
      { word: "打瞌睡", pinyin: "dǎ kē shuì", meaning: "to feel drowsy; to doze off" },
      { word: "放松", pinyin: "fàng sōng", meaning: "to relax; relaxing; relaxed" },
      { word: "锻炼", pinyin: "duàn liàn", meaning: "to exercise; exercise" },
      { word: "大脑", pinyin: "dà nǎo", meaning: "brain" },
      { word: "陪", pinyin: "péi", meaning: "to accompany; to keep someone’s company" },
      { word: "上网", pinyin: "shàng wǎng", meaning: "to go on the internet" },
      { word: "冲浪", pinyin: "chōng làng", meaning: "to surf; surfing" },
      { word: "称", pinyin: "chēng", meaning: "to be known as (formal)" },
      { word: "意思", pinyin: "yì si", meaning: "meaning" },
      { word: "互联网", pinyin: "hù lián wǎng", meaning: "internet" },
      { word: "信息", pinyin: "xìn xī", meaning: "information" },
      { word: "交流", pinyin: "jiāo liú", meaning: "to exchange (ideas, information, feelings)" },
      { word: "获取", pinyin: "huò qǔ", meaning: "to obtain" },
      { word: "娱乐", pinyin: "yú lè", meaning: "to entertain; entertainment" },
      { word: "随着", pinyin: "suí zhe", meaning: "along with" },
      { word: "高", pinyin: "gāo", meaning: "high; tall" },
      { word: "科技", pinyin: "kē jì", meaning: "science and technology" },
      { word: "越来越", pinyin: "yuè lái yuè", meaning: "more and more" },
      { word: "寻找", pinyin: "xún zhǎo", meaning: "to seek; to search" },
      { word: "电视", pinyin: "diàn shì", meaning: "television" },
      { word: "与", pinyin: "yǔ", meaning: "with; and (formal)" },
      { word: "年轻人", pinyin: "nián qīng rén", meaning: "young people; youths" },
      { word: "时尚", pinyin: "shí shàng", meaning: "fashion; fashionable" },
      { word: "方式", pinyin: "fāng shì", meaning: "means; method" },
      { word: "浪费", pinyin: "làng fèi", meaning: "to waste" },
      { word: "适可而止", pinyin: "shì kě ér zhǐ", meaning: "to exercise control and discretion" },
      { word: "注意", pinyin: "zhù yì", meaning: "to pay attention" }
    ], 
  },
  "11": {
    title: "Lesson 11",
    subtitle: "农历新年 (Lunar New Year)",
    vocab: [ 
      { word: "传统", pinyin: "chuán tǒng", meaning: "traditional; tradition" },
      { word: "节日", pinyin: "jié rì", meaning: "holiday" },
      { word: "农历", pinyin: "nóng lì", meaning: "Lunar calendar" },
      { word: "新年", pinyin: "xīn nián", meaning: "new year" },
      { word: "恭喜发财", pinyin: "gōng xǐ fā cái", meaning: "Wishing you a prosperous new year" },
      { word: "除夕", pinyin: "chú xī", meaning: "eve" },
      { word: "回家", pinyin: "huí jiā", meaning: "to go home" },
      { word: "包", pinyin: "bāo", meaning: "to wrap; bag" },
      { word: "饺子", pinyin: "jiǎo zi", meaning: "Chinese dumplings" },
      { word: "可", pinyin: "kě", meaning: "quite; very" },
      { word: "春节", pinyin: "chūn jié", meaning: "Spring Festival; Chinese Lunar New Year" },
      { word: "大年初一", pinyin: "dà nián chū yī", meaning: "First Day of Lunar New Year" },
      { word: "顿", pinyin: "dùn", meaning: "measure of meals" },
      { word: "团圆饭", pinyin: "tuán yuán fàn", meaning: "family reunion dinner" },
      { word: "舞狮", pinyin: "wǔ shī", meaning: "lion dance" },
      { word: "放", pinyin: "fàng", meaning: "to set off; to let go; to place" },
      { word: "鞭炮", pinyin: "biān pào", meaning: "firecrackers" },
      { word: "极", pinyin: "jí", meaning: "extremely" },
      { word: "收到", pinyin: "shōu dào", meaning: "to receive" },
      { word: "红包", pinyin: "hóng bāo", meaning: "red envelope" },
      { word: "亲戚", pinyin: "qīn qi", meaning: "relative" },
      { word: "一共", pinyin: "yī gòng", meaning: "altogether" },
      { word: "块", pinyin: "kuài", meaning: "lump; measure word for ‘dollar’, ‘sugar/candy’" },
      { word: "够", pinyin: "gòu", meaning: "enough" },
      { word: "套", pinyin: "tào", meaning: "Measure word for ‘cloth’, ‘apartment’, and things that usually come in a set" },
      { word: "打算", pinyin: "dǎ suàn", meaning: "to plan" },
      { word: "压岁钱", pinyin: "yā suì qián", meaning: "lucky money" },
      { word: "剩下", pinyin: "shèng xià", meaning: "leftover" },
      { word: "存", pinyin: "cún", meaning: "to deposit" },
      { word: "银行", pinyin: "yín háng", meaning: "bank" },
      { word: "倒是", pinyin: "dào shì", meaning: "ironically; unexpectedly" },
      { word: "省钱", pinyin: "shěng qián", meaning: "to save money" },
      { word: "头款", pinyin: "tóu kuǎn", meaning: "first installment (of money)" },
      { word: "公司", pinyin: "gōng sī", meaning: "company" },
      { word: "祝", pinyin: "zhù", meaning: "to wish" },
      { word: "快乐", pinyin: "kuài lè", meaning: "happy" },
      { word: "心想事成", pinyin: "xīn xiǎng shì chéng", meaning: "All your wishes come true" },
      { word: "万事如意", pinyin: "wàn shì rú yì", meaning: "Everything goes your way" },
      { word: "前", pinyin: "qián", meaning: "former; prior; front" },
      { word: "星期", pinyin: "xīng qī", meaning: "week" },
      { word: "人们", pinyin: "rén men", meaning: "people" },
      { word: "打扫", pinyin: "dǎ sǎo", meaning: "to sweep and dust" },
      { word: "房间", pinyin: "fáng jiān", meaning: "room" },
      { word: "张灯结彩", pinyin: "zhāng dēng jié cǎi", meaning: "to decorate with lanterns and paper cuts" },
      { word: "购买", pinyin: "gòu mǎi", meaning: "to purchase" },
      { word: "年货", pinyin: "nián huò", meaning: "goods for new year" },
      { word: "过年", pinyin: "guò nián", meaning: "to celebrate new year" },
      { word: "外出", pinyin: "wài chū", meaning: "to travel outside" },
      { word: "家人", pinyin: "jiā rén", meaning: "family member" },
      { word: "赶", pinyin: "gǎn", meaning: "to rush" },
      { word: "守夜", pinyin: "shǒu yè", meaning: "to stay up all night" },
      { word: "拜年", pinyin: "bài nián", meaning: "to wish happy new year" },
      { word: "分", pinyin: "fēn", meaning: "to distribute; to share" },
      { word: "十分", pinyin: "shí fēn", meaning: "rather; quite" }
    ],
  },
  "12": {
    title: "Lesson 12",
    subtitle: "中秋节 (Mid-Autumn Festival)",
    vocab: [
      { word: "中秋节", pinyin: "zhōng qiū jié", meaning: "Mid-Autumn Festival" },
      { word: "功课", pinyin: "gōng kè", meaning: "homework; schoolwork" },
      { word: "可能", pinyin: "kě néng", meaning: "perhaps; possible" },
      { word: "次", pinyin: "cì", meaning: "measure word for ‘time’" },
      { word: "然后", pinyin: "rán hòu", meaning: "afterward; then" },
      { word: "院子", pinyin: "yuàn zi", meaning: "yard" },
      { word: "赏月", pinyin: "shǎng yuè", meaning: "to admire the moon" },
      { word: "少不了", pinyin: "shǎo bu liǎo", meaning: "cannot do without" },
      { word: "月饼", pinyin: "yuè bǐng", meaning: "moon cake" },
      { word: "甜", pinyin: "tián", meaning: "sweet" },
      { word: "蛋糕", pinyin: "dàn gāo", meaning: "cake" },
      { word: "没意思", pinyin: "méi yì si", meaning: "boring; bored" },
      { word: "举办", pinyin: "jǔ bàn", meaning: "to hold (an event)" },
      { word: "晚会", pinyin: "wǎn huì", meaning: "party; evening gala" },
      { word: "跳舞", pinyin: "tiào wǔ", meaning: "to dance" },
      { word: "可是", pinyin: "kě shì", meaning: "but" },
      { word: "俗话", pinyin: "sú huà", meaning: "old saying; proverb" },
      { word: "每逢佳节倍思亲", pinyin: "měi féng jiā jié bèi sī qīn", meaning: "one is especially homesick on holidays" },
      { word: "难道", pinyin: "nán dào", meaning: "could it be true that (rhetorical)..." },
      { word: "等", pinyin: "děng", meaning: "to wait" },
      { word: "一阵子", pinyin: "yī zhèn zi", meaning: "a while" },
      { word: "愉快", pinyin: "yú kuài", meaning: "pleasant; pleased" },
      { word: "月", pinyin: "yuè", meaning: "moon; month" },
      { word: "之一", pinyin: "zhī yī", meaning: "one of" },
      { word: "关于", pinyin: "guān yú", meaning: "about; regarding" },
      { word: "许多", pinyin: "xǔ duō", meaning: "many" },
      { word: "传说", pinyin: "chuán shuō", meaning: "legend" },
      { word: "月亮", pinyin: "yuè liang", meaning: "moon" },
      { word: "因为", pinyin: "yīn wèi", meaning: "because" },
      { word: "满月", pinyin: "mǎn yuè", meaning: "full moon" },
      { word: "圆", pinyin: "yuán", meaning: "round; circle" },
      { word: "亮", pinyin: "liàng", meaning: "bright" },
      { word: "所以", pinyin: "suǒ yǐ", meaning: "so; therefore" },
      { word: "晚上", pinyin: "wǎn shang", meaning: "evening; night" },
      { word: "出来", pinyin: "chū lái", meaning: "to come out" },
      { word: "庆祝", pinyin: "qìng zhù", meaning: "to celebrate" },
      { word: "祈求", pinyin: "qí qiú", meaning: "to pray for" },
      { word: "美满", pinyin: "měi mǎn", meaning: "perfect; happy" },
      { word: "幸福", pinyin: "xìng fú", meaning: "happy; blessed" },
      { word: "觉得", pinyin: "jué de", meaning: "to feel; to think" },
      { word: "有趣", pinyin: "yǒu qù", meaning: "interesting" }
    ],
  },
};

// --- Standard Audio Helper ---
const playBrowserAudio = (text, e) => {
  if (e) e.stopPropagation();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

const loadHanziWriter = () => {
  return new Promise((resolve) => {
    if (window.HanziWriter) {
      resolve(window.HanziWriter);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/hanzi-writer@3.5/dist/hanzi-writer.min.js';
    script.onload = () => resolve(window.HanziWriter);
    document.head.appendChild(script);
  });
};

// --- Components ---
const StrokeOrderAnimator = ({ word, showOutline = true, autoPlay = false, hideAnimateButton = false }) => {
  const containerRef = useRef(null);
  const writersRef = useRef([]);

  useEffect(() => {
    let isMounted = true;
    
    loadHanziWriter().then(HanziWriter => {
      if (!isMounted || !containerRef.current) return;
      
      containerRef.current.innerHTML = '';
      writersRef.current = [];

      const chars = word.split('');
      
      chars.forEach(char => {
        const charDiv = document.createElement('div');
        charDiv.className = `inline-block m-1 bg-white rounded-lg ${showOutline ? 'border-2 border-slate-100 shadow-sm' : ''}`;
        const size = chars.length > 3 ? 60 : 80;
        charDiv.style.width = `${size}px`;
        charDiv.style.height = `${size}px`;
        containerRef.current.appendChild(charDiv);

        try {
          const writer = HanziWriter.create(charDiv, char, {
            width: size,
            height: size,
            padding: 8,
            strokeAnimationSpeed: 1.5,
            delayBetweenStrokes: 50,
            showOutline: showOutline,
            strokeColor: '#4f46e5',
            outlineColor: '#e2e8f0',
          });
          writersRef.current.push(writer);
        } catch (err) {
          // If HanziWriter fails for punctuation like '...', fallback to text span safely
          charDiv.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:${size*0.6}px;color:#94a3b8;">${char}</span>`;
        }
      });

      if (autoPlay) {
        animateAllStrokes();
      }
    });

    return () => { isMounted = false; };
  }, [word, showOutline, autoPlay]);

  const animateAllStrokes = async (e) => {
    if (e) e.stopPropagation();
    for (const writer of writersRef.current) {
      await new Promise(resolve => writer.animateCharacter({ onComplete: resolve }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div 
        ref={containerRef} 
        className="flex flex-wrap justify-center items-center min-h-[90px]" 
      />
      {!hideAnimateButton && writersRef.current.length > 0 && (
        <button
          onClick={animateAllStrokes}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:scale-105 rounded-full transition-all font-semibold shadow-sm text-sm"
        >
          <Play size={16} fill="currentColor" />
          Animate Strokes
        </button>
      )}
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [appMode, setAppMode] = useState('menu'); 
  
  // Deck Selection State
  const [selectedUnits, setSelectedUnits] = useState(['6']);
  const [studyDialogue, setStudyDialogue] = useState(true);
  const [studyReading, setStudyReading] = useState(true);
  const [studyVocab, setStudyVocab] = useState(true);

  // Active Session State
  const [currentDeck, setCurrentDeck] = useState([]);
  
  // Settings
  const [quizAudioEnabled, setQuizAudioEnabled] = useState(false);
  const [showPinyinInStrokeQuiz, setShowPinyinInStrokeQuiz] = useState(true);
  const [showPinyinInReverseQuiz, setShowPinyinInReverseQuiz] = useState(true);

  // Flashcard State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz State
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);

  const buildDeck = () => {
    let deck = [];
    selectedUnits.forEach(unit => {
      if (studyDialogue && masterQuizList[unit]?.dialogue) {
        deck = [...deck, ...masterQuizList[unit].dialogue];
      }
      if (studyReading && masterQuizList[unit]?.reading) {
        deck = [...deck, ...masterQuizList[unit].reading];
      }
      if (studyVocab && masterQuizList[unit]?.vocab) {
        deck = [...deck, ...masterQuizList[unit].vocab];
      }
    });
    return deck;
  };

  const getGlobalVocab = () => {
    let allWords = [];
    Object.values(masterQuizList).forEach(unit => {
      if (unit.dialogue) allWords.push(...unit.dialogue);
      if (unit.reading) allWords.push(...unit.reading);
      if (unit.vocab) allWords.push(...unit.vocab);
    });
    return allWords;
  };

  const startMode = (mode) => {
    const deck = buildDeck();
    if (deck.length === 0) return;
    
    const shuffledDeck = [...deck].sort(() => Math.random() - 0.5);
    setCurrentDeck(shuffledDeck);
    
    if (mode === 'quiz' || mode === 'reverse_quiz' || mode === 'hanzi_quiz') {
      const globalVocab = getGlobalVocab();
      const questions = shuffledDeck.map(card => {
        const options = [card];
        const availableDistractors = globalVocab.filter(v => v.word !== card.word);
        const shuffledDistractors = [...availableDistractors].sort(() => Math.random() - 0.5);
        for (let i = 0; i < 3 && i < shuffledDistractors.length; i++) {
          options.push(shuffledDistractors[i]);
        }
        return { card, options: options.sort(() => Math.random() - 0.5) };
      });
      setQuizQuestions(questions);
      setQuizAnswers({});
      setQuizFinished(false);
    }
    
    setCurrentIndex(0);
    setIsFlipped(false);
    setAppMode(mode);
  };

  const startReviewMode = () => {
    const wrongQuestions = quizQuestions.filter((q, idx) => {
      const answer = quizAnswers[idx];
      return answer && !answer.isCorrect;
    });

    if (wrongQuestions.length > 0) {
      // Shuffle the wrong questions so the review feels fresh
      const shuffledQuestions = [...wrongQuestions].sort(() => Math.random() - 0.5);
      
      setQuizQuestions(shuffledQuestions);
      setQuizAnswers({});
      setCurrentIndex(0);
      setQuizFinished(false);
    }
  };

  const toggleUnit = (unit) => {
    setSelectedUnits(prev => 
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    );
  };

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % currentDeck.length), 150);
  }, [currentDeck.length]);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length), 150);
  }, [currentDeck.length]);

  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 < quizQuestions.length) setCurrentIndex(prev => prev + 1);
  }, [currentIndex, quizQuestions.length]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  }, [currentIndex]);

  useEffect(() => {
    if (appMode === 'menu') return;
    const handleKeyDown = (e) => {
      // Prevent keydown actions when typing in any inputs
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

      if (appMode === 'study') {
        if (e.key === 'ArrowRight') nextCard();
        else if (e.key === 'ArrowLeft') prevCard();
        else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); setIsFlipped((f) => !f); }
      } else if (appMode === 'quiz' || appMode === 'reverse_quiz' || appMode === 'hanzi_quiz') {
        if (!quizFinished) {
          if (e.key === 'ArrowRight') nextQuestion();
          else if (e.key === 'ArrowLeft') prevQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [appMode, nextCard, prevCard, nextQuestion, prevQuestion, quizFinished]);

  // --- Quiz Logic ---
  const handleQuizAnswer = (option) => {
    if (quizAnswers[currentIndex]) return; 
    
    const currentQ = quizQuestions[currentIndex];
    const isCorrect = option.word === currentQ.card.word;
    
    setQuizAnswers(prev => ({
      ...prev,
      [currentIndex]: { option, isCorrect }
    }));
    
    if (isCorrect && quizAudioEnabled) {
      playBrowserAudio(currentQ.card.word);
    }
  };

  const correctCount = Object.values(quizAnswers).filter(a => a.isCorrect).length;
  const totalAnswered = Object.keys(quizAnswers).length;
  
  // Checking if start is allowed
  const canStart = selectedUnits.length > 0 && (studyDialogue || studyReading || studyVocab) && buildDeck().length > 0;

  // --- Render Functions ---
  const renderMenu = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center w-full relative">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl max-w-4xl w-full border-t-8 border-indigo-500">
          <div className="flex flex-col items-center justify-center mb-8">
             <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
              <GraduationCap size={40} className="text-indigo-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">CHI 120 Study App</h1>
            <p className="text-slate-500 font-medium mt-2"> Chinese Interactive Flashcards & Quizze</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-slate-700 mb-4 uppercase tracking-wider text-sm">1. Select Unit(s)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-left">
              {Object.entries(masterQuizList).map(([unitKey, data]) => (
                <label 
                  key={unitKey} 
                  className={`flex items-center p-3 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedUnits.includes(unitKey) 
                    ? 'border-indigo-500 bg-indigo-50 shadow-sm' 
                    : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
                    checked={selectedUnits.includes(unitKey)}
                    onChange={() => toggleUnit(unitKey)}
                  />
                  <div>
                    <p className="font-bold text-slate-800">{data.title}</p>
                    <p className="text-xs text-slate-500 font-medium">{data.subtitle}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
             <h3 className="font-bold text-slate-700 mb-4 uppercase tracking-wider text-sm">2. Select Vocabulary Sections</h3>
             <div className="flex flex-wrap justify-center gap-4">
                <label className={`flex items-center cursor-pointer px-6 py-4 rounded-xl border-2 transition-all ${studyDialogue ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3"
                    checked={studyDialogue}
                    onChange={(e) => setStudyDialogue(e.target.checked)}
                  />
                  <span className="font-bold text-slate-800">Dialogue</span>
                </label>
                <label className={`flex items-center cursor-pointer px-6 py-4 rounded-xl border-2 transition-all ${studyReading ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500 mr-3"
                    checked={studyReading}
                    onChange={(e) => setStudyReading(e.target.checked)}
                  />
                  <span className="font-bold text-slate-800">Short Reading</span>
                </label>
                <label className={`flex items-center cursor-pointer px-6 py-4 rounded-xl border-2 transition-all ${studyVocab ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 text-amber-600 rounded focus:ring-amber-500 mr-3"
                    checked={studyVocab}
                    onChange={(e) => setStudyVocab(e.target.checked)}
                  />
                  <span className="font-bold text-slate-800">Vocabulary</span>
                </label>
             </div>
          </div>

          {/* Settings Area */}
          <div className="bg-slate-50 p-5 rounded-2xl mb-8 border border-slate-200 text-left">
            <h3 className="font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <Settings size={18} /> Preferences
            </h3>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3 border-slate-300"
                  checked={quizAudioEnabled} onChange={(e) => setQuizAudioEnabled(e.target.checked)} />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Auto-play audio</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3 border-slate-300"
                  checked={showPinyinInStrokeQuiz} onChange={(e) => setShowPinyinInStrokeQuiz(e.target.checked)} />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Show Pinyin in Stroke Quiz</span>
              </label>
              <label className="flex items-center cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mr-3 border-slate-300"
                  checked={showPinyinInReverseQuiz} onChange={(e) => setShowPinyinInReverseQuiz(e.target.checked)} />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Show Pinyin in Reverse Quiz</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button onClick={() => startMode('study')} disabled={!canStart}
              className="flex flex-col items-center justify-center py-5 px-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1">
              <BookOpen size={28} className="mb-2" />
              <span className="font-bold text-lg leading-tight">Flashcards</span>
              <span className="text-xs font-medium opacity-80 mt-1">Study Vocabulary</span>
            </button>
            <button onClick={() => startMode('quiz')} disabled={!canStart}
              className="flex flex-col items-center justify-center py-5 px-3 bg-emerald-500 text-white rounded-xl shadow-md hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1">
              <Play size={28} className="mb-2" />
              <span className="font-bold text-lg leading-tight">Stroke Quiz</span>
              <span className="text-xs font-medium opacity-80 mt-1">Chinese → English</span>
            </button>
            <button onClick={() => startMode('reverse_quiz')} disabled={!canStart}
              className="flex flex-col items-center justify-center py-5 px-3 bg-rose-500 text-white rounded-xl shadow-md hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1">
              <Languages size={28} className="mb-2" />
              <span className="font-bold text-lg leading-tight">Reverse Quiz</span>
              <span className="text-xs font-medium opacity-80 mt-1">English → Chinese</span>
            </button>
            <button onClick={() => startMode('hanzi_quiz')} disabled={!canStart}
              className="flex flex-col items-center justify-center py-5 px-3 bg-amber-500 text-white rounded-xl shadow-md hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:-translate-y-1">
              <Type size={28} className="mb-2" />
              <span className="font-bold text-lg leading-tight">Hanzi Match</span>
              <span className="text-xs font-medium opacity-80 mt-1">Pinyin → Hanzi</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStudyMode = () => {
    const currentCard = currentDeck[currentIndex];
    
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mt-4 pb-12">
        <div className="w-full relative group mb-8 perspective-1000">
          <div 
            onClick={() => !isFlipped && setIsFlipped(true)}
            className={`relative w-full transition-transform duration-500 preserve-3d shadow-xl rounded-2xl min-h-[400px] cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-2xl flex flex-col items-center justify-center p-8 border border-slate-100">
              <button onClick={(e) => playBrowserAudio(currentCard.word, e)} className="absolute top-4 right-4 p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors z-10">
                <Volume2 size={24} />
              </button>
              <StrokeOrderAnimator word={currentCard.word} />
              <p className="absolute bottom-6 text-sm text-slate-400 font-medium tracking-widest uppercase">Click to flip</p>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-2xl border border-slate-100 rotate-y-180 flex flex-col items-center justify-center p-8 text-center">
               <button onClick={(e) => playBrowserAudio(currentCard.word, e)} className="absolute top-4 right-4 p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors z-10">
                 <Volume2 size={24} />
               </button>
               <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider block mb-2">Pinyin</span>
               <h2 className="text-5xl font-bold text-slate-800 mb-6">{currentCard.pinyin}</h2>
               <div className="w-16 h-1 bg-indigo-100 rounded-full mb-6"></div>
               <span className="text-sm font-bold text-indigo-500 uppercase tracking-wider block mb-2">Meaning</span>
               <p className="text-3xl text-slate-600 font-medium leading-tight">{currentCard.meaning}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-6 w-full px-4">
          <div className="w-full flex items-center gap-4">
            <span className="text-sm font-semibold text-slate-500 w-12 text-right">{currentIndex + 1}</span>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${((currentIndex + 1) / currentDeck.length) * 100}%` }}></div>
            </div>
            <span className="text-sm font-semibold text-slate-500 w-12">{currentDeck.length}</span>
          </div>

          <div className="flex items-center justify-center gap-6">
            <button onClick={prevCard} className="p-4 bg-white text-slate-600 rounded-full shadow hover:shadow-md hover:-translate-x-1 hover:text-indigo-600 transition-all">
              <ChevronLeft size={28} />
            </button>
            <button onClick={() => setIsFlipped(!isFlipped)} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all flex items-center gap-2">
              <RotateCcw size={20} /> Flip Card
            </button>
            <button onClick={nextCard} className="p-4 bg-white text-slate-600 rounded-full shadow hover:shadow-md hover:translate-x-1 hover:text-indigo-600 transition-all">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderQuizMode = () => {
    if (!quizQuestions || quizQuestions.length === 0) return null;

    if (quizFinished) {
      const wrongCount = totalAnswered - correctCount;

      return (
        <div className="flex flex-col items-center justify-center w-full max-w-lg mt-12 bg-white p-10 rounded-3xl shadow-xl text-center border-t-8 border-emerald-500">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto bg-emerald-100 text-emerald-500">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
          <p className="text-slate-500 mb-8 text-xl font-medium">You scored <b className="text-indigo-600">{correctCount}</b> out of {totalAnswered}</p>
          
          <div className="flex flex-col gap-4 w-full">
            {wrongCount > 0 && (
              <button 
                onClick={startReviewMode}
                className="w-full px-8 py-4 bg-rose-500 text-white font-bold rounded-full shadow hover:bg-rose-600 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <RotateCcw size={20} /> Review {wrongCount} Mistake{wrongCount !== 1 ? 's' : ''}
              </button>
            )}
            <button 
              onClick={() => setAppMode('menu')} 
              className={`w-full px-8 py-4 font-bold rounded-full shadow transition-colors text-lg ${wrongCount > 0 ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
            >
              Back to Menu
            </button>
          </div>
        </div>
      );
    }

    const currentQ = quizQuestions[currentIndex];
    const currentAnswer = quizAnswers[currentIndex];
    
    const isReverse = appMode === 'reverse_quiz';
    const isHanziMatch = appMode === 'hanzi_quiz';
    const isStrokeQuiz = appMode === 'quiz';

    return (
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mt-4 pb-12">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6 px-4">
          <span className="text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm">
            Question {currentIndex + 1} of {quizQuestions.length}
          </span>
          <span className="text-sm font-bold text-indigo-700 bg-indigo-100 px-4 py-2 rounded-full shadow-sm">
            Score: {correctCount} / {totalAnswered}
          </span>
        </div>

        {/* Prompt Card */}
        <div className="w-full bg-white rounded-3xl shadow-lg p-8 mb-6 border border-slate-100 min-h-[200px] flex flex-col items-center justify-center relative">
          <button onClick={(e) => playBrowserAudio(currentQ.card.word, e)} className="absolute top-4 right-4 p-3 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 rounded-full transition-colors z-10">
            <Volume2 size={24} />
          </button>

          {isReverse && (
            <>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest absolute top-6">Translation Needed</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 text-center leading-tight mt-4">{currentQ.card.meaning}</h2>
            </>
          )}

          {isHanziMatch && (
            <>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest absolute top-6">Match Hanzi</p>
              <div className="flex flex-col items-center mt-4">
                <h2 className="text-4xl md:text-5xl font-bold text-indigo-600 text-center mb-2">{currentQ.card.pinyin}</h2>
                <p className="text-xl font-medium text-slate-500 text-center">"{currentQ.card.meaning}"</p>
              </div>
            </>
          )}

          {isStrokeQuiz && (
            <>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest absolute top-6">What does this mean?</p>
              <div className="flex flex-col items-center mt-4 w-full">
                <h2 className="text-6xl font-extrabold text-slate-800 text-center mb-2 tracking-widest">{currentQ.card.word}</h2>
                {showPinyinInStrokeQuiz && <p className="text-2xl font-bold text-indigo-600 mb-4">{currentQ.card.pinyin}</p>}
                <div className={`scale-100 sm:scale-110 ${!showPinyinInStrokeQuiz ? 'mt-4' : ''}`}>
                   <StrokeOrderAnimator key={`std-${currentQ.card.word}`} word={currentQ.card.word} showOutline={true} autoPlay={true} hideAnimateButton={false} />
                </div>
              </div>
            </>
          )}

          {(isReverse || isHanziMatch) && currentAnswer && (
              <div className="mt-6 flex flex-col items-center animate-fade-in border-t border-slate-100 w-full pt-6">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Correct Hanzi</p>
                {isReverse && <p className="text-lg font-bold text-indigo-600 mb-2">{currentQ.card.pinyin}</p>}
                <div className="scale-75 origin-top"><StrokeOrderAnimator key={`rev-${currentQ.card.word}`} word={currentQ.card.word} showOutline={true} autoPlay={true} hideAnimateButton={false}/></div>
              </div>
          )}
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full px-4 mb-6">
          {currentQ.options.map((option, idx) => {
            let buttonClass = "p-5 rounded-2xl border-2 text-left transition-all focus:outline-none flex items-center justify-between ";
            let icon = null;

            if (currentAnswer) {
              const isCorrect = option.word === currentQ.card.word;
              const isSelected = currentAnswer.option.word === option.word;

              if (isCorrect) {
                buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm";
                icon = <CheckCircle2 size={24} className="text-emerald-500 ml-3 shrink-0" />;
              } else if (isSelected && !currentAnswer.isCorrect) {
                buttonClass += "border-rose-500 bg-rose-50 text-rose-700 shadow-sm";
                icon = <XCircle size={24} className="text-rose-500 ml-3 shrink-0" />;
              } else {
                buttonClass += "border-slate-200 bg-slate-50 text-slate-400 opacity-50";
              }
            } else {
              buttonClass += "border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 hover:shadow-md active:scale-[0.98]";
            }

            return (
              <button key={idx} onClick={() => handleQuizAnswer(option)} className={buttonClass} disabled={currentAnswer !== undefined}>
                {isReverse && (
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold mb-1">{option.word}</span>
                    {showPinyinInReverseQuiz && <span className="text-sm font-medium opacity-80">{option.pinyin}</span>}
                  </div>
                )}
                {isHanziMatch && <div className="flex w-full justify-center"><span className="text-4xl font-bold tracking-widest">{option.word}</span></div>}
                {isStrokeQuiz && <span className="text-xl font-bold">{option.meaning}</span>}
                {icon}
              </button>
            );
          })}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between w-full mt-4 px-4">
           <button onClick={prevQuestion} disabled={currentIndex === 0}
             className="p-4 bg-white text-slate-600 rounded-full shadow hover:shadow-md hover:-translate-x-1 hover:text-indigo-600 transition-all disabled:opacity-30 disabled:hover:translate-x-0">
             <ChevronLeft size={28} />
           </button>
           
           {currentIndex === quizQuestions.length - 1 ? (
             <button onClick={() => setQuizFinished(true)} className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all flex items-center gap-2">
               Finish Quiz <CheckCircle2 size={20} />
             </button>
           ) : (
             <button onClick={nextQuestion} className="p-4 bg-white text-slate-600 rounded-full shadow hover:shadow-md hover:translate-x-1 hover:text-indigo-600 transition-all">
               <ChevronRight size={28} />
             </button>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 selection:bg-indigo-200">
      
      {/* Top Navigation */}
      {appMode !== 'menu' && (
        <div className="w-full bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
            <button onClick={() => setAppMode('menu')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold px-4 py-2 hover:bg-slate-50 rounded-full text-sm">
              <ArrowLeft size={18} /> MENU
            </button>
            
            <h2 className="font-extrabold text-slate-800 tracking-tight hidden sm:block text-lg">
              {appMode === 'study' && 'Flashcards'}
              {appMode === 'quiz' && 'Stroke Order Quiz'}
              {appMode === 'reverse_quiz' && 'Reverse Translation Quiz'}
              {appMode === 'hanzi_quiz' && 'Hanzi Match Quiz'}
            </h2>
            
            {appMode === 'study' ? (
              <button onClick={() => {
                  const shuffled = [...currentDeck].sort(() => Math.random() - 0.5);
                  setCurrentDeck(shuffled); setCurrentIndex(0); setIsFlipped(false);
                }}
                className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-bold px-4 py-2 hover:bg-slate-50 rounded-full text-sm"
              >
                <Shuffle size={16} /> SHUFFLE
              </button>
            ) : <div className="w-24"></div>}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-4 flex-1">
        {appMode === 'menu' && renderMenu()}
        {appMode === 'study' && renderStudyMode()}
        {(appMode === 'quiz' || appMode === 'reverse_quiz' || appMode === 'hanzi_quiz') && renderQuizMode()}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}
