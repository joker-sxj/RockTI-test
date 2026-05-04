import type { Question } from "../types/rockti";

/**
 * ROCKTI 24 道题题库
 *
 * 维度分数严格遵循 spec v1.0，部分偏抽象的题目改写为场景沉浸式
 * （q04 / q06 / q09 / q12 / q15 / q16 / q18 / q21 / q23），分数映射不变。
 */
export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "凌晨 1 点你路过一家陌生 livehouse，门里漏出失真音墙，你...",
    options: [
      { id: "q01_a", text: "推门冲到前排，先让耳膜上班", scores: { EN: 2, ST: 1 } },
      { id: "q01_b", text: "靠在墙边角落，看灯打在烟雾里的样子", scores: { EX: 1, EM: 2 } },
      { id: "q01_c", text: "盯着舞台上那排效果器，猜每一个旋钮的用途", scores: { CX: 2, HV: 1 } },
      { id: "q01_d", text: "扭头对身边人说：你也是来看他们的？", scores: { ST: 2, RT: 1 } },
    ],
  },
  {
    id: "q02",
    text: "如果一支乐队为你 personally 定制开场，你想听到的第一秒是？",
    options: [
      { id: "q02_a", text: "一段干净漂亮、像电影主题的经典 riff", scores: { RT: 2, ST: 1 } },
      { id: "q02_b", text: "鼓手一棒下去，全场地板都跟着跳", scores: { EN: 2, HV: 1 } },
      { id: "q02_c", text: "一段听不懂但很上头的噪音或采样", scores: { EX: 2, RB: 1 } },
      { id: "q02_d", text: "灯光慢慢亮起，声音像潮水从远处涌过来", scores: { EM: 1, CX: 2 } },
    ],
  },
  {
    id: "q03",
    text: "如果你和朋友组乐队，你最想抢哪个位置？",
    options: [
      { id: "q03_a", text: "主唱，麦克风架起来全场都是我的", scores: { ST: 2, EN: 1 } },
      { id: "q03_b", text: "吉他手，负责所有让人起鸡皮疙瘩的 riff", scores: { RT: 1, HV: 1, EN: 1 } },
      { id: "q03_c", text: "贝斯手，话最少但低频是我说了算", scores: { CX: 1, EX: 1 } },
      { id: "q03_d", text: "键盘 / 采样 / 效果器，专门让大家听不懂", scores: { EX: 2, CX: 1 } },
    ],
  },
  {
    id: "q04",
    text: "朋友给你听一首歌：节奏怪、人声埋得很深、第一遍完全听不出在干嘛。你的反应是？",
    options: [
      { id: "q04_a", text: "再来三遍，让我钻进去找规律", scores: { EX: 2, CX: 1 } },
      { id: "q04_b", text: "听不懂，但我已经被氛围按住了", scores: { EX: 1, EM: 1 } },
      { id: "q04_c", text: "太装了，给我来个能跟着哼的副歌", scores: { ST: 1, RT: 1 } },
      { id: "q04_d", text: "越像噪音越诚实，不要切歌", scores: { RB: 2, HV: 1 } },
    ],
  },
  {
    id: "q05",
    text: "你的情绪崩溃方式更像？",
    options: [
      { id: "q05_a", text: "对着空无一人的天台大吼一声", scores: { EN: 2, HV: 1 } },
      { id: "q05_b", text: "在备忘录里写三页歌词，自己看完都沉默", scores: { EM: 2, EX: 1 } },
      { id: "q05_c", text: "翻出一首老歌，循环到天亮", scores: { RT: 2, EM: 1 } },
      { id: "q05_d", text: "什么都不说，戴上耳机让音墙把你包起来", scores: { EM: 1, EX: 2 } },
    ],
  },
  {
    id: "q06",
    text: "深夜你打开一首新歌，最希望第一句歌词是？",
    options: [
      { id: "q06_a", text: "一句带刺的反叛宣言，像老子不服那种", scores: { RB: 2, EN: 1 } },
      { id: "q06_b", text: "一段非常具体的生活场景，像电影开场白", scores: { EM: 2, RT: 1 } },
      { id: "q06_c", text: "城市、阶层、青年焦虑，刀子割得很冷", scores: { RB: 1, CX: 1 } },
      { id: "q06_d", text: "梦、宇宙、雾和海，意象多到迷路", scores: { EX: 2, EM: 1 } },
    ],
  },
  {
    id: "q07",
    text: "朋友皱眉说\"这歌也太吵了吧\"，你的本能反应是？",
    options: [
      { id: "q07_a", text: "笑出声：这才哪到哪，下首更狠", scores: { HV: 2, EN: 1 } },
      { id: "q07_b", text: "你听仔细，吵得很有层次", scores: { HV: 1, CX: 2 } },
      { id: "q07_c", text: "不是吵，是情绪太满才挤出来", scores: { EM: 2, HV: 1 } },
      { id: "q07_d", text: "那好，我换一首温柔点的版本", scores: { RT: 1, EM: 1 } },
    ],
  },
  {
    id: "q08",
    text: "你的理想专辑封面是？",
    options: [
      { id: "q08_a", text: "皮衣、吉他、霓虹灯、老舞台", scores: { RT: 2, ST: 1 } },
      { id: "q08_b", text: "黑底、骷髅、火焰、金属质感", scores: { HV: 2, EN: 1 } },
      { id: "q08_c", text: "抽象图形、宇宙、奇怪符号", scores: { EX: 2, CX: 1 } },
      { id: "q08_d", text: "一张旧照片、一条公路、潦草手写字", scores: { EM: 2, RT: 1 } },
    ],
  },
  {
    id: "q09",
    text: "评论区刷到一句话让你最想关掉手机，那一句是？",
    options: [
      { id: "q09_a", text: "别那么认真，歌好听就行了", scores: { CX: 1, EM: 1 } },
      { id: "q09_b", text: "太小众了，肯定不好听", scores: { RB: 1, EX: 1 } },
      { id: "q09_c", text: "摇滚不就是吵吗？", scores: { HV: 1, RT: 1 } },
      { id: "q09_d", text: "这种歌不适合大众", scores: { ST: 1, RB: 1 } },
    ],
  },
  {
    id: "q10",
    text: "歌曲列表里冒出来一首 9 分钟的曲子，你的第一念头是？",
    options: [
      { id: "q10_a", text: "终于有人给情绪留够了展开空间", scores: { CX: 2, EX: 1 } },
      { id: "q10_b", text: "看它有没有那种慢慢推到顶的层次", scores: { EM: 2, CX: 1 } },
      { id: "q10_c", text: "副歌呢？快进到最炸的地方", scores: { ST: 2, EN: 1 } },
      { id: "q10_d", text: "只要 riff 一直爽，多长都没事", scores: { HV: 1, EN: 1 } },
    ],
  },
  {
    id: "q11",
    text: "如果有人送你一件昂贵的装备，你最想要哪个？",
    options: [
      { id: "q11_a", text: "一把经典 Les Paul 或 Strat", scores: { RT: 2 } },
      { id: "q11_b", text: "一面失真音箱墙，能把楼震到投诉", scores: { HV: 2, EN: 1 } },
      { id: "q11_c", text: "一整排效果器和延迟踏板", scores: { EX: 2, CX: 1 } },
      { id: "q11_d", text: "一把木吉他和一个用来写歌的本子", scores: { EM: 2, RT: 1 } },
    ],
  },
  {
    id: "q12",
    text: "新乐队发文：本场演出取消所有传统编排，连和弦走向都不用。你的真实想法是？",
    options: [
      { id: "q12_a", text: "可以理解，但别让形式盖过表达", scores: { RB: 1, EM: 1 } },
      { id: "q12_b", text: "好啊，规则就是用来现场炸掉的", scores: { RB: 2, EN: 1 } },
      { id: "q12_c", text: "先听他们怎么把规则玩出新花样", scores: { CX: 2, EX: 1 } },
      { id: "q12_d", text: "我还是更信耐听了几十年的老规矩", scores: { RT: 2 } },
    ],
  },
  {
    id: "q13",
    text: "如果今晚要登台，你打开衣柜最先抽出哪一身？",
    options: [
      { id: "q13_a", text: "复古皮衣、墨镜、靴子", scores: { RT: 2, ST: 1 } },
      { id: "q13_b", text: "铆钉、补丁、破洞、别针", scores: { RB: 2, EN: 1 } },
      { id: "q13_c", text: "黑色长发、金属饰品、皮带链", scores: { HV: 2 } },
      { id: "q13_d", text: "宽松毛衣、帆布鞋，准备好低头弹琴", scores: { EX: 1, EM: 1 } },
    ],
  },
  {
    id: "q14",
    text: "回想你最难忘的现场瞬间，画面是？",
    options: [
      { id: "q14_a", text: "全场跟着主唱大合唱那一秒", scores: { ST: 2, EM: 1 } },
      { id: "q14_b", text: "鼓点一进来，所有人一起跳起来", scores: { EN: 2, ST: 1 } },
      { id: "q14_c", text: "全场安静，只有音墙慢慢升起来", scores: { EX: 2, EM: 1 } },
      { id: "q14_d", text: "乐队突然变拍，观众愣住三秒才反应过来", scores: { CX: 2, EX: 1 } },
    ],
  },
  {
    id: "q15",
    text: "如果今晚必须写一首歌，主题只能选一个，你会写？",
    options: [
      { id: "q15_a", text: "写给某个具体的人 / 一座住过的城 / 一段日常", scores: { EM: 2, RT: 1 } },
      { id: "q15_b", text: "写不服、愤怒和反抗，一字不删", scores: { RB: 2, EN: 1 } },
      { id: "q15_c", text: "写一个跨整张专辑的概念故事", scores: { CX: 2, EX: 1 } },
      { id: "q15_d", text: "写一句让所有人都会跟着喊的副歌", scores: { ST: 2, EN: 1 } },
    ],
  },
  {
    id: "q16",
    text: "你最喜欢的乐队突然爆红，单曲冲上热搜第一。你的心情？",
    options: [
      { id: "q16_a", text: "他们值得，旋律确实有这个力量", scores: { ST: 2 } },
      { id: "q16_b", text: "好爽……但我也开始想躲开了", scores: { RB: 1, EX: 1 } },
      { id: "q16_c", text: "无所谓火不火，只要东西还真就行", scores: { EM: 2 } },
      { id: "q16_d", text: "如果他们没把结构妥协掉，那就放心", scores: { CX: 1, ST: 1 } },
    ],
  },
  {
    id: "q17",
    text: "你最喜欢的鼓手是哪种风格？",
    options: [
      { id: "q17_a", text: "直给、快、冲，像在前排撞人", scores: { EN: 2, RB: 1 } },
      { id: "q17_b", text: "厚重、压迫、像坦克碾过来", scores: { HV: 2, EN: 1 } },
      { id: "q17_c", text: "稳、复古、有律动，每一下都到位", scores: { RT: 2 } },
      { id: "q17_d", text: "慢慢叠加，最后炸到天花板", scores: { CX: 1, EM: 2 } },
    ],
  },
  {
    id: "q18",
    text: "你戴着耳机走在路上，下一首播放的歌让你按暂停。最可能的原因是？",
    options: [
      { id: "q18_a", text: "鼓没劲，身体没动起来", scores: { EN: 2, ST: 1 } },
      { id: "q18_b", text: "声音太干，没有想要的层次和质地", scores: { CX: 2, EX: 1 } },
      { id: "q18_c", text: "歌词不到肉，扎不到心", scores: { EM: 2 } },
      { id: "q18_d", text: "没有那种从老唱片里来的厚味", scores: { RT: 2 } },
    ],
  },
  {
    id: "q19",
    text: "朋友圈里你被贴的那个标签更接近哪种？",
    options: [
      { id: "q19_a", text: "聚会点歌王，负责让大家全场唱起来", scores: { ST: 2, EN: 1 } },
      { id: "q19_b", text: "小众推荐官，总能放出没人听过的怪歌", scores: { EX: 2, RB: 1 } },
      { id: "q19_c", text: "情绪树洞，歌单像一本日记", scores: { EM: 2 } },
      { id: "q19_d", text: "乐理考古学家，讲歌的时间比放歌还长", scores: { CX: 2, RT: 1 } },
    ],
  },
  {
    id: "q20",
    text: "如果给你的人生配一段吉他音色，它的形状是？",
    options: [
      { id: "q20_a", text: "干净、温暖、略带蓝调，像深夜咖啡店", scores: { RT: 2, EM: 1 } },
      { id: "q20_b", text: "高增益、失真、冲击力强，像撞门", scores: { HV: 2, EN: 1 } },
      { id: "q20_c", text: "延迟、混响，像在水里发着光", scores: { EX: 2, EM: 1 } },
      { id: "q20_d", text: "简单明亮、副歌一出全场都跟唱", scores: { ST: 2, EN: 1 } },
    ],
  },
  {
    id: "q21",
    text: "网络平台给你贴上\"热门审美用户\"的标签，并开始疯狂推流行金曲。你做的第一件事是？",
    options: [
      { id: "q21_a", text: "保留，但默默把不喜欢的全部点不感兴趣", scores: { RB: 1, EX: 1 } },
      { id: "q21_b", text: "不在乎标签，只要还推让我爽的", scores: { EN: 1, HV: 1 } },
      { id: "q21_c", text: "看一眼里面有没有真的能留下来的经典", scores: { RT: 2 } },
      { id: "q21_d", text: "立刻去找算法之外那些藏在边缘的声音", scores: { EX: 2, EM: 1 } },
    ],
  },
  {
    id: "q22",
    text: "如果今晚可以瞬移到任意一个现场，你想去？",
    options: [
      { id: "q22_a", text: "烟雾缭绕的蓝调酒吧，吉他在弯音", scores: { RT: 2, EM: 1 } },
      { id: "q22_b", text: "汗水飞溅的地下朋克场，谁也不认识", scores: { RB: 2, EN: 1 } },
      { id: "q22_c", text: "万人音乐节，副歌一起喊到嗓子哑", scores: { ST: 2, EN: 1 } },
      { id: "q22_d", text: "黑暗剧场里看一支没有人声的器乐乐队", scores: { CX: 2, EM: 1 } },
    ],
  },
  {
    id: "q23",
    text: "面对一首歌的\"极端表达\"，你最容易被哪一种击中？",
    options: [
      { id: "q23_a", text: "极端快、极端炸，几秒就把氧气抽干", scores: { EN: 2, HV: 1 } },
      { id: "q23_b", text: "极端慢、极端沉，让你忘了自己在听什么", scores: { EM: 1, EX: 2 } },
      { id: "q23_c", text: "极端复杂，每一秒都有线索可挖", scores: { CX: 2 } },
      { id: "q23_d", text: "极端简单、极端直接，三个和弦说完", scores: { RB: 2, EN: 1 } },
    ],
  },
  {
    id: "q24",
    text: "测完之后，你最希望屏幕上跳出来的那句话是？",
    options: [
      { id: "q24_a", text: "你是舞台中心的天然明星", scores: { ST: 2, EN: 1 } },
      { id: "q24_b", text: "你是不会被规训的反骨灵魂", scores: { RB: 2 } },
      { id: "q24_c", text: "你是情绪和故事的收藏者", scores: { EM: 2 } },
      { id: "q24_d", text: "你是声音宇宙的建筑师", scores: { EX: 1, CX: 2 } },
    ],
  },
];
