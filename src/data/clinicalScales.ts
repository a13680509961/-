// 临床评估量表数据库（参考医脉通临床量表模块）
// 每个量表包含：题目、选项分值、计分规则、结果分档解读

export interface ScaleOption {
  label: string;
  score: number;
}

export interface ScaleQuestion {
  id: number;
  text: string;
  options?: ScaleOption[]; // 若题目有独立选项则覆盖量表级选项
}

export interface ScaleInterpretation {
  min: number;
  max: number;
  level: string;
  color: string; // 用于界面标识的颜色
  description: string;
  suggestion: string;
}

export interface ClinicalScale {
  id: string;
  abbr: string;
  name: string;
  fullName: string;
  category: string;
  purpose: string;
  applicable: string;
  timeMinutes: number;
  source: string;
  instruction: string;
  questions: ScaleQuestion[];
  options: ScaleOption[];
  maxScore: number;
  interpretations: ScaleInterpretation[];
  relatedDiseases: string[];
}

const freq4: ScaleOption[] = [
  { label: '没有', score: 0 },
  { label: '有几天', score: 1 },
  { label: '一半以上的天数', score: 2 },
  { label: '几乎每天', score: 3 },
];

export const clinicalScales: ClinicalScale[] = [
  {
    id: 'phq-9',
    abbr: 'PHQ-9',
    name: '抑郁症筛查量表',
    fullName: '患者健康问卷抑郁症状群量表（Patient Health Questionnaire-9）',
    category: '精神心理',
    purpose: '筛查抑郁症状严重程度，辅助抑郁症的初步评估与疗效随访。',
    applicable: '疑似有抑郁情绪、兴趣减退、精力下降的成年人',
    timeMinutes: 3,
    source: 'Kroenke K, et al. J Gen Intern Med. 2001',
    instruction: '在过去的两周里，您有多少时间受到以下问题的困扰？',
    options: freq4,
    maxScore: 27,
    questions: [
      { id: 1, text: '做事时提不起劲或没有兴趣' },
      { id: 2, text: '感到心情低落、沮丧或绝望' },
      { id: 3, text: '入睡困难、睡不安稳或睡得过多' },
      { id: 4, text: '感觉疲倦或没有活力' },
      { id: 5, text: '食欲不振或吃得太多' },
      { id: 6, text: '觉得自己很糟、很失败，或让自己/家人失望' },
      { id: 7, text: '难以集中注意力，例如看报纸或看电视时' },
      { id: 8, text: '动作或说话速度缓慢到别人已经察觉，或烦躁坐立不安、动来动去' },
      { id: 9, text: '有不如死掉或用某种方式伤害自己的念头' },
    ],
    interpretations: [
      {
        min: 0, max: 4, level: '无明显抑郁症状', color: '#10B981',
        description: '目前的抑郁症状处于正常范围内。',
        suggestion: '保持规律作息与运动习惯，关注情绪变化，如有持续困扰可再次测评。',
      },
      {
        min: 5, max: 9, level: '轻度抑郁症状', color: '#F59E0B',
        description: '存在轻度抑郁症状，可能对日常生活产生一定影响。',
        suggestion: '建议加强自我调节：规律运动、社交活动、充足睡眠。2-4 周后复测，若加重请咨询心理科/精神科。',
      },
      {
        min: 10, max: 14, level: '中度抑郁症状', color: '#E76F51',
        description: '抑郁症状达到中度，可能已明显影响工作与生活。',
        suggestion: '建议尽快至精神科或心理科就诊，接受专业评估。心理治疗（如 CBT）和/或药物治疗可能获益。',
      },
      {
        min: 15, max: 19, level: '中重度抑郁症状', color: '#DC2626',
        description: '抑郁症状较重，社会功能很可能受到显著影响。',
        suggestion: '强烈建议尽快至精神科就诊，通常需要药物治疗联合心理治疗。请告诉家人或信任的人您目前的状态。',
      },
      {
        min: 20, max: 27, level: '重度抑郁症状', color: '#7F1D1D',
        description: '抑郁症状严重，属于需要紧急专业干预的范围。',
        suggestion: '请立即至精神科就诊。若有自伤/自杀念头，请立即拨打 24 小时心理援助热线 400-161-9995，或前往最近医院急诊。',
      },
    ],
    relatedDiseases: ['depression', 'anxiety-disorder'],
  },
  {
    id: 'gad-7',
    abbr: 'GAD-7',
    name: '广泛性焦虑量表',
    fullName: '广泛性焦虑障碍量表（Generalized Anxiety Disorder-7）',
    category: '精神心理',
    purpose: '筛查广泛性焦虑症状及严重程度，是焦虑障碍最常用的自评工具。',
    applicable: '长期感到紧张、担心、难以放松的成年人',
    timeMinutes: 2,
    source: 'Spitzer RL, et al. Arch Intern Med. 2006',
    instruction: '在过去的两周里，您有多少时间受到以下问题的困扰？',
    options: freq4,
    maxScore: 21,
    questions: [
      { id: 1, text: '感觉紧张、焦虑或急躁' },
      { id: 2, text: '不能停止或控制担忧' },
      { id: 3, text: '对各种各样的事情担忧过多' },
      { id: 4, text: '很难放松下来' },
      { id: 5, text: '由于不安而无法静坐' },
      { id: 6, text: '变得容易烦恼或急躁' },
      { id: 7, text: '感到似乎将有可怕的事情发生而害怕' },
    ],
    interpretations: [
      {
        min: 0, max: 4, level: '无明显焦虑症状', color: '#10B981',
        description: '焦虑水平在正常范围内。',
        suggestion: '保持现有的压力管理方式，如规律运动、正念练习等。',
      },
      {
        min: 5, max: 9, level: '轻度焦虑症状', color: '#F59E0B',
        description: '存在轻度焦虑症状。',
        suggestion: '建议学习放松训练（腹式呼吸、渐进式肌肉放松），减少咖啡因摄入，观察 2-4 周后复测。',
      },
      {
        min: 10, max: 14, level: '中度焦虑症状', color: '#E76F51',
        description: '焦虑症状达到中度，临床上具有意义。',
        suggestion: '建议至精神科/心理科就诊评估，心理治疗（CBT 认知行为治疗）为一线推荐。',
      },
      {
        min: 15, max: 21, level: '重度焦虑症状', color: '#DC2626',
        description: '焦虑症状严重，可能已明显影响日常功能。',
        suggestion: '强烈建议尽快至精神科就诊，可能需要药物（如 SSRI 类）联合心理治疗。',
      },
    ],
    relatedDiseases: ['anxiety-disorder', 'depression', 'insomnia'],
  },
  {
    id: 'ais',
    abbr: 'AIS',
    name: '阿森斯失眠量表',
    fullName: '阿森斯失眠量表（Athens Insomnia Scale）',
    category: '睡眠医学',
    purpose: '评估过去一个月内的睡眠质量与失眠严重程度。',
    applicable: '主诉入睡困难、睡眠维持困难或早醒的人群',
    timeMinutes: 3,
    source: 'Soldatos CR, et al. J Psychosom Res. 2000',
    instruction: '请根据您过去一个月内每周至少出现 3 次的情况作答。',
    options: [
      { label: '没有问题', score: 0 },
      { label: '轻微', score: 1 },
      { label: '明显', score: 2 },
      { label: '严重', score: 3 },
    ],
    maxScore: 24,
    questions: [
      { id: 1, text: '入睡困难（关灯后到睡着的时间延迟）' },
      { id: 2, text: '夜间苏醒次数多' },
      { id: 3, text: '比期望的时间早醒且无法再入睡' },
      { id: 4, text: '总睡眠时间不足' },
      { id: 5, text: '总睡眠质量差（无论睡多久）' },
      { id: 6, text: '白天情绪低落' },
      { id: 7, text: '白天身体功能受影响（记忆力、注意力等）' },
      { id: 8, text: '白天思睡' },
    ],
    interpretations: [
      {
        min: 0, max: 3, level: '无失眠障碍', color: '#10B981',
        description: '睡眠质量良好，无明显失眠表现。',
        suggestion: '继续保持良好的睡眠卫生习惯。',
      },
      {
        min: 4, max: 5, level: '可疑失眠', color: '#F59E0B',
        description: '存在轻度睡眠问题的迹象。',
        suggestion: '注意睡眠卫生：固定作息时间、睡前 1 小时远离电子屏幕、避免午后咖啡因。',
      },
      {
        min: 6, max: 24, level: '失眠', color: '#E76F51',
        description: '得分达到失眠的临床判断界值（≥6 分提示失眠）。',
        suggestion: '建议至神经内科、精神心理科或睡眠门诊就诊。慢性失眠首选认知行为治疗（CBT-I），不建议长期依赖安眠药。',
      },
    ],
    relatedDiseases: ['insomnia', 'anxiety-disorder', 'depression'],
  },
  {
    id: 'act',
    abbr: 'ACT',
    name: '哮喘控制测试',
    fullName: '哮喘控制测试（Asthma Control Test）',
    category: '呼吸内科',
    purpose: '评估过去 4 周哮喘控制水平，指导治疗方案的升降级调整。',
    applicable: '已确诊支气管哮喘的患者（12 岁以上）',
    timeMinutes: 2,
    source: 'Nathan RA, et al. J Allergy Clin Immunol. 2004',
    instruction: '请回忆过去 4 周的情况，选择最符合的答案。',
    options: [],
    maxScore: 25,
    questions: [
      {
        id: 1, text: '过去 4 周，哮喘妨碍您进行工作、学习或家务的程度？',
        options: [
          { label: '所有时间', score: 1 }, { label: '大部分时间', score: 2 },
          { label: '有些时候', score: 3 }, { label: '很少', score: 4 }, { label: '从来没有', score: 5 },
        ],
      },
      {
        id: 2, text: '过去 4 周，您有多少次呼吸急促（气短）？',
        options: [
          { label: '每天超过 1 次', score: 1 }, { label: '每天 1 次', score: 2 },
          { label: '每周 3-6 次', score: 3 }, { label: '每周 1-2 次', score: 4 }, { label: '完全没有', score: 5 },
        ],
      },
      {
        id: 3, text: '过去 4 周，哮喘症状（喘息、咳嗽、气短、胸闷）让您夜间醒来或早醒吗？',
        options: [
          { label: '每周 4 晚或更多', score: 1 }, { label: '每周 2-3 晚', score: 2 },
          { label: '每周 1 次', score: 3 }, { label: '1-2 次', score: 4 }, { label: '没有', score: 5 },
        ],
      },
      {
        id: 4, text: '过去 4 周，您使用急救药物（如沙丁胺醇）的频率？',
        options: [
          { label: '每天 3 次以上', score: 1 }, { label: '每天 1-2 次', score: 2 },
          { label: '每周 2-3 次', score: 3 }, { label: '每周 1 次或更少', score: 4 }, { label: '没有使用', score: 5 },
        ],
      },
      {
        id: 5, text: '您如何评价过去 4 周哮喘的控制情况？',
        options: [
          { label: '完全没有控制', score: 1 }, { label: '控制很差', score: 2 },
          { label: '部分控制', score: 3 }, { label: '控制良好', score: 4 }, { label: '完全控制', score: 5 },
        ],
      },
    ],
    interpretations: [
      {
        min: 5, max: 19, level: '哮喘未控制', color: '#DC2626',
        description: '哮喘控制不佳，急性发作风险较高。',
        suggestion: '建议尽快至呼吸内科复诊，医生可能上调控制药物级别（如增加 ICS 剂量或联合 LABA），并检查吸入装置使用是否正确。',
      },
      {
        min: 20, max: 24, level: '哮喘部分控制', color: '#F59E0B',
        description: '哮喘得到部分控制，但仍有改善空间。',
        suggestion: '建议 1-3 个月内复诊评估，可能需要调整治疗方案。坚持规律用药，勿自行停药。',
      },
      {
        min: 25, max: 25, level: '哮喘完全控制', color: '#10B981',
        description: '恭喜！哮喘达到完全控制水平。',
        suggestion: '维持当前治疗方案，完全控制持续 3 个月以上可与医生讨论降级治疗。随身携带急救药物。',
      },
    ],
    relatedDiseases: ['asthma', 'allergic-rhinitis'],
  },
  {
    id: 'hit-6',
    abbr: 'HIT-6',
    name: '头痛影响测验',
    fullName: '头痛影响测试量表（Headache Impact Test-6）',
    category: '神经内科',
    purpose: '评估头痛对日常生活、工作和社会功能的影响程度。',
    applicable: '反复发作性头痛（偏头痛、紧张型头痛等）患者',
    timeMinutes: 2,
    source: 'Kosinski M, et al. Qual Life Res. 2003',
    instruction: '请回答以下问题，评估头痛对您生活的影响。',
    options: [
      { label: '从不', score: 6 },
      { label: '很少', score: 8 },
      { label: '有时', score: 10 },
      { label: '经常', score: 11 },
      { label: '总是', score: 13 },
    ],
    maxScore: 78,
    questions: [
      { id: 1, text: '头痛时，您的疼痛程度是否剧烈？' },
      { id: 2, text: '头痛是否限制了您的日常活动（家务、工作、学习或社交）？' },
      { id: 3, text: '您是否因为头痛而感到情绪低落、沮丧？' },
      { id: 4, text: '过去 4 周，头痛是否让您感到疲惫不堪？' },
      { id: 5, text: '头痛是否影响您的注意力或记忆力？' },
      { id: 6, text: '头痛是否让您对工作或学习的表现感到担忧？' },
    ],
    interpretations: [
      {
        min: 36, max: 49, level: '轻度影响', color: '#10B981',
        description: '头痛对生活的影响较小。',
        suggestion: '记录头痛日记，识别并避免诱因（如熬夜、特定食物）。偶发头痛可按需使用止痛药，但每月不超过 10 天。',
      },
      {
        min: 50, max: 55, level: '中度影响', color: '#F59E0B',
        description: '头痛对生活有一定程度的影响。',
        suggestion: '建议至神经内科就诊，规范诊断头痛类型，讨论急性期用药方案。',
      },
      {
        min: 56, max: 59, level: '明显影响', color: '#E76F51',
        description: '头痛对生活造成明显影响。',
        suggestion: '建议尽快就诊，除急性期治疗外，应评估是否需要预防性药物治疗。',
      },
      {
        min: 60, max: 78, level: '严重影响', color: '#DC2626',
        description: '头痛严重影响生活质量和社会功能。',
        suggestion: '强烈建议尽快至神经内科/头痛专病门诊就诊，制定系统的急性期+预防性治疗方案。',
      },
    ],
    relatedDiseases: ['migraine', 'tension-headache'],
  },
  {
    id: 'audit-c',
    abbr: 'AUDIT-C',
    name: '酒精使用障碍筛查',
    fullName: '酒精使用障碍识别测试简版（AUDIT-C）',
    category: '预防医学',
    purpose: '快速筛查危险饮酒行为与酒精使用障碍风险。',
    applicable: '有饮酒习惯的成年人',
    timeMinutes: 1,
    source: 'WHO / Bush K, et al. Arch Intern Med. 1998',
    instruction: '请根据您的实际饮酒情况作答（1 标准杯 ≈ 啤酒 350ml / 葡萄酒 150ml / 白酒 45ml）。',
    options: [],
    maxScore: 12,
    questions: [
      {
        id: 1, text: '您多久喝一次酒？',
        options: [
          { label: '从不', score: 0 }, { label: '每月不超过 1 次', score: 1 },
          { label: '每月 2-4 次', score: 2 }, { label: '每周 2-3 次', score: 3 }, { label: '每周 4 次以上', score: 4 },
        ],
      },
      {
        id: 2, text: '喝酒的那天，通常喝多少标准杯？',
        options: [
          { label: '1-2 杯', score: 0 }, { label: '3-4 杯', score: 1 },
          { label: '5-6 杯', score: 2 }, { label: '7-9 杯', score: 3 }, { label: '10 杯以上', score: 4 },
        ],
      },
      {
        id: 3, text: '您多久会有一次喝 6 杯以上的情况？',
        options: [
          { label: '从不', score: 0 }, { label: '每月不到 1 次', score: 1 },
          { label: '每月 1 次', score: 2 }, { label: '每周 1 次', score: 3 }, { label: '每天或几乎每天', score: 4 },
        ],
      },
    ],
    interpretations: [
      {
        min: 0, max: 3, level: '低风险（男性 ≤3 分 / 女性 ≤2 分）', color: '#10B981',
        description: '饮酒风险较低。注：女性切点更低，女性 ≥3 分即提示风险饮酒。',
        suggestion: '保持在低风险饮酒范围内（中国居民膳食指南建议：成人每日酒精量男性 <25g，女性 <15g）。',
      },
      {
        min: 4, max: 12, level: '危险饮酒风险', color: '#DC2626',
        description: '得分提示可能存在危险饮酒或酒精使用障碍（男性 ≥4 分为阳性）。',
        suggestion: '建议减少饮酒量并至消化内科或精神科（物质依赖门诊）进一步评估。长期大量饮酒可导致脂肪肝、酒精性肝炎、肝硬化。',
      },
    ],
    relatedDiseases: ['fatty-liver', 'gastritis'],
  },
];

export const scaleCategories = ['全部', '精神心理', '睡眠医学', '呼吸内科', '神经内科', '预防医学'];

export function getScaleById(id: string): ClinicalScale | undefined {
  return clinicalScales.find((s) => s.id === id);
}

export function interpretScore(scale: ClinicalScale, score: number): ScaleInterpretation {
  return (
    scale.interpretations.find((i) => score >= i.min && score <= i.max) ??
    scale.interpretations[scale.interpretations.length - 1]
  );
}
