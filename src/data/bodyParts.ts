export interface BodyPart {
  id: string;
  name: string;
  keywords: string[];
}

/** 各部位展示用 emoji（首页 / 问诊页共用，与 bodyParts 的 14 个 id 一一对应） */
export const bodyPartEmojis: Record<string, string> = {
  head: '🧠', eye: '👁️', ear: '👂', throat: '🫦', chest: '🫀',
  stomach: '🫃', back: '🦴', arm: '✋', leg: '🦵', skin: '✨',
  neck: '🦒', limbs: '🦵', genital: '🚻', mouth: '👄',
};

export const bodyParts: BodyPart[] = [
  { id: 'head', name: '头部', keywords: ['头', '头痛', '头部'] },
  { id: 'eye', name: '眼部', keywords: ['眼', '眼睛', '视力'] },
  { id: 'ear', name: '耳部', keywords: ['耳', '耳朵', '听'] },
  { id: 'throat', name: '咽喉', keywords: ['喉咙', '咽喉', '嗓子'] },
  { id: 'chest', name: '胸部', keywords: ['胸', '心脏', '胸口', '胸闷'] },
  { id: 'stomach', name: '腹部', keywords: ['腹', '肚子', '胃', '腹部'] },
  { id: 'back', name: '背部', keywords: ['背', '腰', '背部'] },
  { id: 'arm', name: '上肢', keywords: ['手', '手臂', '胳膊'] },
  { id: 'leg', name: '下肢', keywords: ['腿', '脚', '下肢'] },
  { id: 'skin', name: '皮肤', keywords: ['皮肤', '身上', '皮疹'] },
  { id: 'neck', name: '颈部', keywords: ['颈', '脖子', '颈部'] },
  { id: 'limbs', name: '四肢关节', keywords: ['关节', '四肢', '手脚关节', '膝盖', '肩'] },
  { id: 'genital', name: '泌尿生殖', keywords: ['泌尿', '生殖', '尿道', '会阴', '前列腺'] },
  { id: 'mouth', name: '口腔', keywords: ['口腔', '嘴', '舌头', '牙齿', '牙龈'] },
];

export interface CompanionSymptom {
  id: string;
  name: string;
  category: string;
  keywords: string[];
}

export const companionCategories = [
  '全身症状',
  '呼吸系统',
  '消化系统',
  '神经与精神',
  '泌尿与循环',
  '皮肤与其他',
];

export const companionSymptoms: CompanionSymptom[] = [
  // 全身症状
  { id: 'fever', name: '发热 / 发烧', category: '全身症状', keywords: ['发热', '发烧', '体温', '高烧'] },
  { id: 'chills', name: '畏寒 / 寒战', category: '全身症状', keywords: ['畏寒', '寒战', '怕冷', '发冷'] },
  { id: 'fatigue', name: '乏力 / 疲劳', category: '全身症状', keywords: ['累', '疲劳', '乏力', '没力气'] },
  { id: 'sweating', name: '出汗异常', category: '全身症状', keywords: ['出汗', '盗汗', '多汗'] },
  { id: 'weight_change', name: '体重变化', category: '全身症状', keywords: ['瘦了', '胖了', '体重下降', '消瘦'] },
  { id: 'lymph_node', name: '淋巴结肿大', category: '全身症状', keywords: ['淋巴结', '脖子肿', '腋下肿块'] },

  // 呼吸系统
  { id: 'cough', name: '咳嗽', category: '呼吸系统', keywords: ['咳', '咳嗽', '干咳', '咳痰'] },
  { id: 'sputum', name: '咳痰 / 痰多', category: '呼吸系统', keywords: ['痰', '咳痰', '黄痰', '白痰'] },
  { id: 'shortness_of_breath', name: '呼吸困难', category: '呼吸系统', keywords: ['喘', '气短', '呼吸困难', '憋气'] },
  { id: 'wheeze', name: '喘息 / 哮鸣', category: '呼吸系统', keywords: ['喘息', '哮鸣', '拉风箱', '呼呼响'] },
  { id: 'sore_throat', name: '咽痛 / 嗓子疼', category: '呼吸系统', keywords: ['咽痛', '喉咙痛', '嗓子疼', '咽干'] },
  { id: 'loss_of_smell', name: '嗅觉 / 味觉减退', category: '呼吸系统', keywords: ['闻不到', '没味道', '嗅觉', '味觉'] },

  // 消化系统
  { id: 'nausea', name: '恶心 / 呕吐', category: '消化系统', keywords: ['恶心', '吐', '呕吐', '想吐'] },
  { id: 'diarrhea', name: '腹泻', category: '消化系统', keywords: ['拉肚子', '腹泻', '稀便'] },
  { id: 'constipation', name: '便秘', category: '消化系统', keywords: ['便秘', '拉不出', '大便干'] },
  { id: 'loss_of_appetite', name: '食欲不振', category: '消化系统', keywords: ['吃不下', '没胃口', '食欲'] },
  { id: 'bloating', name: '腹胀 / 胀气', category: '消化系统', keywords: ['腹胀', '胀气', '肚子胀'] },
  { id: 'heartburn', name: '反酸 / 烧心', category: '消化系统', keywords: ['反酸', '烧心', '反流', '打嗝'] },
  { id: 'jaundice', name: '皮肤 / 眼白发黄', category: '消化系统', keywords: ['发黄', '黄疸', '眼黄', '尿黄'] },

  // 神经与精神
  { id: 'dizziness', name: '头晕 / 眩晕', category: '神经与精神', keywords: ['晕', '头晕', '眩晕', '天旋地转'] },
  { id: 'headache', name: '头痛', category: '神经与精神', keywords: ['头痛', '头疼', '偏头痛'] },
  { id: 'insomnia', name: '失眠 / 睡眠差', category: '神经与精神', keywords: ['睡不着', '失眠', '入睡困难', '早醒'] },
  { id: 'mood', name: '情绪变化', category: '神经与精神', keywords: ['焦虑', '抑郁', '烦躁', '情绪', '紧张'] },
  { id: 'numbness', name: '肢体麻木', category: '神经与精神', keywords: ['麻木', '发麻', '没知觉'] },
  { id: 'tremor', name: '手抖 / 震颤', category: '神经与精神', keywords: ['手抖', '颤抖', '震颤', '抖'] },
  { id: 'blurred_vision', name: '视物模糊', category: '神经与精神', keywords: ['看不清', '模糊', '视力下降', '眼花'] },

  // 泌尿与循环
  { id: 'urination', name: '排尿异常', category: '泌尿与循环', keywords: ['尿', '尿频', '尿急', '尿痛', '尿血'] },
  { id: 'edema', name: '水肿 / 浮肿', category: '泌尿与循环', keywords: ['水肿', '浮肿', '腿肿', '眼肿'] },
  { id: 'palpitations', name: '心慌 / 心悸', category: '泌尿与循环', keywords: ['心慌', '心悸', '心跳快', '心跳乱'] },
  { id: 'chest_tightness', name: '胸闷 / 胸痛', category: '泌尿与循环', keywords: ['胸闷', '胸痛', '胸口压', '胸口疼'] },

  // 皮肤与其他
  { id: 'pain', name: '疼痛', category: '皮肤与其他', keywords: ['痛', '疼', '疼痛', '胀痛', '刺痛'] },
  { id: 'rash', name: '皮疹 / 红疹', category: '皮肤与其他', keywords: ['皮疹', '起疹', '红点', '红斑'] },
  { id: 'itching', name: '皮肤瘙痒', category: '皮肤与其他', keywords: ['痒', '瘙痒', '皮肤痒'] },
  { id: 'swelling', name: '局部肿胀', category: '皮肤与其他', keywords: ['肿', '肿胀', '肿大', '浮肿'] },
  { id: 'bleeding', name: '出血', category: '皮肤与其他', keywords: ['出血', '流血', '便血', '尿血', '出血不止'] },
  { id: 'hearing_loss', name: '听力下降', category: '皮肤与其他', keywords: ['听力下降', '听不清', '耳聋', '耳鸣'] },
];

// 第 1 步「快速描述」短语，按类别分组
export interface DescriptorGroup {
  category: string;
  items: string[];
}

export const descriptorGroups: DescriptorGroup[] = [
  {
    category: '起病与变化',
    items: ['突然开始', '逐渐加重', '阵发性', '持续性', '反复发作', '夜间加重', '活动后加重', '休息后缓解'],
  },
  {
    category: '疼痛性质',
    items: ['刺痛', '胀痛', '灼热感', '搏动性跳痛', '钝痛', '绞痛', '撕裂样痛', '压迫感'],
  },
  {
    category: '局部感觉',
    items: ['麻木感', '瘙痒感', '沉重感', '紧绷感', '异物感', '牵拉感', '酸胀感', '干燥感'],
  },
  {
    category: '全身感受',
    items: ['怕冷', '怕热', '出汗多', '口干', '口苦', '心慌', '气短', '乏力'],
  },
];

// 快速选择「受影响部位」补充选项（用于描述页的快捷部位提示）
export const quickLocationTags = ['左侧', '右侧', '双侧', '中央', '上段', '下段', '全身'];


export const durationOptions = [
  { id: 'acute', label: '突发（< 24 小时）', value: 'acute' },
  { id: 'days', label: '几天内（1-7 天）', value: 'days' },
  { id: 'weeks', label: '数周（1-4 周）', value: 'weeks' },
  { id: 'months', label: '数月（> 1 个月）', value: 'months' },
  { id: 'chronic', label: '长期（> 6 个月）', value: 'chronic' },
];

export const severityOptions = [
  { id: 'mild', label: '轻微 · 可忍受', value: 'mild' },
  { id: 'moderate', label: '中等 · 影响活动', value: 'moderate' },
  { id: 'severe', label: '严重 · 难以忍受', value: 'severe' },
];
