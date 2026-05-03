import type { Question } from "../types/rockti";

export const QUESTIONS: Question[] = [
  {
    id: "q01",
    text: "你走进 livehouse，第一反应是？",
    options: [
      { id: "q01_a", text: "冲到前排，先让耳膜上班", scores: { EN: 2, ST: 1 } },
      { id: "q01_b", text: "找个角落，观察灯光和氛围", scores: { EX: 1, EM: 2 } },
      { id: "q01_c", text: "看设备、看效果器、看音箱型号", scores: { CX: 2, HV: 1 } },
      { id: "q01_d", text: "和旁边的人聊：你也喜欢这个乐队？", scores: { ST: 2, RT: 1 } },
    ],
  },
  {
    id: "q02",
    text: "你最想在舞台上听到哪种开场？",
    options: [
      { id: "q02_a", text: "一个干净漂亮的经典吉他 riff", scores: { RT: 2, ST: 1 } },
      { id: "q02_b", text: "鼓手直接把场子炸开", scores: { EN: 2, HV: 1 } },
      { id: "q02_c", text: "一段听不懂但很上头的噪音或采样", scores: { EX: 2, RB: 1 } },
      { id: "q02_d", text: "一段慢慢升起、像电影开场的铺垫", scores: { EM: 1, CX: 2 } },
    ],
  },
  {
    id: "q03",
    text: "如果你组乐队，你最想当？",
    options: [
      { id: "q03_a", text: "主唱，负责点燃全场", scores: { ST: 2, EN: 1 } },
      { id: "q03_b", text: "吉他手，负责 riff 和 solo", scores: { RT: 1, HV: 1, EN: 1 } },
      { id: "q03_c", text: "贝斯手，冷静但决定灵魂", scores: { CX: 1, EX: 1 } },
      { id: "q03_d", text: "键盘、效果器或采样，负责让大家听不懂", scores: { EX: 2, CX: 1 } },
    ],
  },
  {
    id: "q04",
    text: "你对「难听但高级」的音乐怎么看？",
    options: [
      { id: "q04_a", text: "给我三分钟，我要理解它", scores: { EX: 2, CX: 1 } },
      { id: "q04_b", text: "听不懂，但感觉很厉害", scores: { EX: 1, EM: 1 } },
      { id: "q04_c", text: "太装了，我要旋律和爽感", scores: { ST: 1, RT: 1 } },
      { id: "q04_d", text: "越难听越诚实，继续放", scores: { RB: 2, HV: 1 } },
    ],
  },
  {
    id: "q05",
    text: "你的情绪崩溃方式更像？",
    options: [
      { id: "q05_a", text: "大吼一声，把负能量甩出去", scores: { EN: 2, HV: 1 } },
      { id: "q05_b", text: "写三页歌词，自己看完都沉默", scores: { EM: 2, EX: 1 } },
      { id: "q05_c", text: "开一首老歌，怀念不存在的青春", scores: { RT: 2, EM: 1 } },
      { id: "q05_d", text: "什么都不说，盯着墙听音墙", scores: { EM: 1, EX: 2 } },
    ],
  },
  {
    id: "q06",
    text: "你最喜欢哪种歌词？",
    options: [
      { id: "q06_a", text: "「老子不服」式反叛宣言", scores: { RB: 2, EN: 1 } },
      { id: "q06_b", text: "很生活，很具体，像一段真实经历", scores: { EM: 2, RT: 1 } },
      { id: "q06_c", text: "城市、阶层、青年、讽刺", scores: { RB: 1, CX: 1 } },
      { id: "q06_d", text: "意象很多，像梦、宇宙、雾和海", scores: { EX: 2, EM: 1 } },
    ],
  },
  {
    id: "q07",
    text: "朋友说「这歌也太吵了吧」，你会？",
    options: [
      { id: "q07_a", text: "这才哪到哪，后面更狠", scores: { HV: 2, EN: 1 } },
      { id: "q07_b", text: "确实吵，但吵得有层次", scores: { HV: 1, CX: 2 } },
      { id: "q07_c", text: "不是吵，是情绪太满", scores: { EM: 2, HV: 1 } },
      { id: "q07_d", text: "那我给你放个更温柔的版本", scores: { RT: 1, EM: 1 } },
    ],
  },
  {
    id: "q08",
    text: "你理想中的专辑封面是？",
    options: [
      { id: "q08_a", text: "皮衣、吉他、霓虹灯、老舞台", scores: { RT: 2, ST: 1 } },
      { id: "q08_b", text: "黑色、骷髅、火焰、金属质感", scores: { HV: 2, EN: 1 } },
      { id: "q08_c", text: "抽象图形、宇宙、奇怪符号", scores: { EX: 2, CX: 1 } },
      { id: "q08_d", text: "旧照片、公路、手写字", scores: { EM: 2, RT: 1 } },
    ],
  },
  {
    id: "q09",
    text: "你最讨厌哪种音乐评价？",
    options: [
      { id: "q09_a", text: "「别那么认真，歌好听就行」", scores: { CX: 1, EM: 1 } },
      { id: "q09_b", text: "「太小众了，肯定不好听」", scores: { RB: 1, EX: 1 } },
      { id: "q09_c", text: "「摇滚不就是吵吗？」", scores: { HV: 1, RT: 1 } },
      { id: "q09_d", text: "「这种歌不适合大众」", scores: { ST: 1, RB: 1 } },
    ],
  },
  {
    id: "q10",
    text: "如果一首歌超过 8 分钟，你会？",
    options: [
      { id: "q10_a", text: "太棒了，终于有展开空间", scores: { CX: 2, EX: 1 } },
      { id: "q10_b", text: "看它有没有情绪推进", scores: { EM: 2, CX: 1 } },
      { id: "q10_c", text: "太长了，副歌快来", scores: { ST: 2, EN: 1 } },
      { id: "q10_d", text: "只要 riff 够爽，多长都行", scores: { HV: 1, EN: 1 } },
    ],
  },
  {
    id: "q11",
    text: "你最想拥有哪件装备？",
    options: [
      { id: "q11_a", text: "一把经典 Les Paul 或 Strat", scores: { RT: 2 } },
      { id: "q11_b", text: "一个巨大的失真音箱墙", scores: { HV: 2, EN: 1 } },
      { id: "q11_c", text: "一整排效果器和延迟踏板", scores: { EX: 2, CX: 1 } },
      { id: "q11_d", text: "一把木吉他和一个本子", scores: { EM: 2, RT: 1 } },
    ],
  },
  {
    id: "q12",
    text: "你面对规则的态度是？",
    options: [
      { id: "q12_a", text: "规则可以有，但别挡我表达", scores: { RB: 1, EM: 1 } },
      { id: "q12_b", text: "规则就是用来打破的", scores: { RB: 2, EN: 1 } },
      { id: "q12_c", text: "先理解规则，再把它玩复杂", scores: { CX: 2, EX: 1 } },
      { id: "q12_d", text: "老规矩有老规矩的美", scores: { RT: 2 } },
    ],
  },
  {
    id: "q13",
    text: "你的舞台穿搭更接近？",
    options: [
      { id: "q13_a", text: "复古皮衣、墨镜、靴子", scores: { RT: 2, ST: 1 } },
      { id: "q13_b", text: "铆钉、补丁、破洞、别针", scores: { RB: 2, EN: 1 } },
      { id: "q13_c", text: "黑色、长发、金属饰品", scores: { HV: 2 } },
      { id: "q13_d", text: "宽松毛衣、帆布鞋、低头弹琴", scores: { EX: 1, EM: 1 } },
    ],
  },
  {
    id: "q14",
    text: "你最喜欢的现场瞬间是？",
    options: [
      { id: "q14_a", text: "全场大合唱", scores: { ST: 2, EM: 1 } },
      { id: "q14_b", text: "鼓点一进来，大家一起跳", scores: { EN: 2, ST: 1 } },
      { id: "q14_c", text: "所有人安静，只有音墙慢慢升起来", scores: { EX: 2, EM: 1 } },
      { id: "q14_d", text: "乐队突然变拍，观众愣住", scores: { CX: 2, EX: 1 } },
    ],
  },
  {
    id: "q15",
    text: "你更愿意写一首什么歌？",
    options: [
      { id: "q15_a", text: "写给一个人、一座城、一段生活", scores: { EM: 2, RT: 1 } },
      { id: "q15_b", text: "写给不服、愤怒和反抗", scores: { RB: 2, EN: 1 } },
      { id: "q15_c", text: "写一个概念故事，从第一首铺到最后一首", scores: { CX: 2, EX: 1 } },
      { id: "q15_d", text: "写一首所有人都会唱的副歌", scores: { ST: 2, EN: 1 } },
    ],
  },
  {
    id: "q16",
    text: "你对「流行性」的看法是？",
    options: [
      { id: "q16_a", text: "能流行说明旋律真的有力量", scores: { ST: 2 } },
      { id: "q16_b", text: "太流行我会有点想躲开", scores: { RB: 1, EX: 1 } },
      { id: "q16_c", text: "流行不流行不重要，真诚重要", scores: { EM: 2 } },
      { id: "q16_d", text: "如果结构够有趣，流行也可以", scores: { CX: 1, ST: 1 } },
    ],
  },
  {
    id: "q17",
    text: "你最喜欢哪种鼓？",
    options: [
      { id: "q17_a", text: "直给、快、冲", scores: { EN: 2, RB: 1 } },
      { id: "q17_b", text: "厚重、压迫、像坦克", scores: { HV: 2, EN: 1 } },
      { id: "q17_c", text: "稳、复古、有律动", scores: { RT: 2 } },
      { id: "q17_d", text: "慢慢叠加，最后爆发", scores: { CX: 1, EM: 2 } },
    ],
  },
  {
    id: "q18",
    text: "你听歌时最在意？",
    options: [
      { id: "q18_a", text: "能不能让我跟着动起来", scores: { EN: 2, ST: 1 } },
      { id: "q18_b", text: "声音质感和编曲层次", scores: { CX: 2, EX: 1 } },
      { id: "q18_c", text: "歌词是不是扎心", scores: { EM: 2 } },
      { id: "q18_d", text: "有没有一种历史感和根源感", scores: { RT: 2 } },
    ],
  },
  {
    id: "q19",
    text: "你更像哪种朋友？",
    options: [
      { id: "q19_a", text: "聚会点歌王，负责让大家唱起来", scores: { ST: 2, EN: 1 } },
      { id: "q19_b", text: "小众推荐官，总能放出没人听过的怪歌", scores: { EX: 2, RB: 1 } },
      { id: "q19_c", text: "情绪树洞，歌单像日记", scores: { EM: 2 } },
      { id: "q19_d", text: "乐理考古学家，讲得比歌还长", scores: { CX: 2, RT: 1 } },
    ],
  },
  {
    id: "q20",
    text: "如果要给你的人生配一段吉他音色？",
    options: [
      { id: "q20_a", text: "干净、温暖、略带蓝调", scores: { RT: 2, EM: 1 } },
      { id: "q20_b", text: "高增益、失真、冲击力强", scores: { HV: 2, EN: 1 } },
      { id: "q20_c", text: "延迟、混响、像在水里发光", scores: { EX: 2, EM: 1 } },
      { id: "q20_d", text: "简单明亮，适合大合唱", scores: { ST: 2, EN: 1 } },
    ],
  },
  {
    id: "q21",
    text: "你对「主流审美」的态度？",
    options: [
      { id: "q21_a", text: "可以借用，但不能被它驯化", scores: { RB: 1, EX: 1 } },
      { id: "q21_b", text: "不关心，我只听让我爽的", scores: { EN: 1, HV: 1 } },
      { id: "q21_c", text: "主流也有经典，要看时间筛选", scores: { RT: 2 } },
      { id: "q21_d", text: "我喜欢藏在边缘里的声音", scores: { EX: 2, EM: 1 } },
    ],
  },
  {
    id: "q22",
    text: "你最想去哪个场景？",
    options: [
      { id: "q22_a", text: "烟雾缭绕的蓝调酒吧", scores: { RT: 2, EM: 1 } },
      { id: "q22_b", text: "汗水飞溅的地下朋克现场", scores: { RB: 2, EN: 1 } },
      { id: "q22_c", text: "大型音乐节万人合唱", scores: { ST: 2, EN: 1 } },
      { id: "q22_d", text: "黑暗剧场里看一支器乐乐队", scores: { CX: 2, EM: 1 } },
    ],
  },
  {
    id: "q23",
    text: "你更能接受哪种「极端」？",
    options: [
      { id: "q23_a", text: "极端快、极端炸", scores: { EN: 2, HV: 1 } },
      { id: "q23_b", text: "极端慢、极端沉浸", scores: { EM: 1, EX: 2 } },
      { id: "q23_c", text: "极端复杂、极端精密", scores: { CX: 2 } },
      { id: "q23_d", text: "极端简单、极端直接", scores: { RB: 2, EN: 1 } },
    ],
  },
  {
    id: "q24",
    text: "测完后你希望结果怎么说你？",
    options: [
      { id: "q24_a", text: "你是舞台中心的天然明星", scores: { ST: 2, EN: 1 } },
      { id: "q24_b", text: "你是不会被规训的反骨灵魂", scores: { RB: 2 } },
      { id: "q24_c", text: "你是情绪和故事的收藏者", scores: { EM: 2 } },
      { id: "q24_d", text: "你是声音宇宙的建筑师", scores: { EX: 1, CX: 2 } },
    ],
  },
];
