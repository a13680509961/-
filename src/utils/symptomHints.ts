import { mockDiseases } from '@/data/mockDiseases';
import { bodyParts } from '@/data/bodyParts';

/**
 * AI 症状提示：根据所选身体部位，从疾病库中提取该部位常见症状关键词，
 * 生成可点击的症状描述建议，帮助用户更精准地描述症状。
 *
 * 抽样策略：基于 seed 的确定性伪随机（mulberry32），同一 seed 结果稳定，
 * 不同 seed（点击"换一批"递增）得到不同批次，避免每次刷新都变、也避免
 * 两次点击结果相同。
 */

export interface SymptomHint {
  text: string;
  category: string;
}

/** 按身体部位聚合的症状提示（来自疾病库的关键词） */
const symptomHintsByPart: Record<string, SymptomHint[]> = {};

/** 停用词：过于宽泛、几乎任意描述都会命中、区分度低的词 */
const STOP_WORDS = new Set([
  // 单字词（太宽泛）
  '炎', '症', '痛', '痛症',
  // 通用疾病/综合征名（非症状，命中后提示价值低）
  '感冒', '流感', '综合征', '疾病', '症状',
  // 部位词（用户已在第一步选定部位，重复提示无意义）
  '头部', '眼部', '耳部', '咽喉', '胸部', '腹部', '背部',
  // 纯程度/修饰词
  '强烈', '突然',
]);

/** 保留、有区分度的常见症状词（即使是"咳嗽""头痛"这类，对具体部位仍有定位价值） */
const KEEP_WORDS = new Set(['咳嗽', '头痛', '头晕', '鼻塞', '流鼻涕', '咽痛', '胸闷', '心慌', '气短']);

function extractHints() {
  for (const part of bodyParts) {
    const hints: SymptomHint[] = [];
    const seen = new Set<string>();
    const diseases = mockDiseases.filter((d) => d.bodyParts.includes(part.id));

    for (const disease of diseases) {
      for (const kw of disease.keywords) {
        // 过滤：长度 2-10 字、非停用词、保留词白名单直通、未重复
        if (
          kw.length >= 2 &&
          kw.length <= 10 &&
          !STOP_WORDS.has(kw) &&
          (KEEP_WORDS.has(kw) || !isGeneric(kw)) &&
          !seen.has(kw)
        ) {
          seen.add(kw);
          hints.push({ text: kw, category: disease.name });
        }
      }
    }
    symptomHintsByPart[part.id] = hints;
  }
}

/** 简单启发式：以"性/样/感"结尾或含"综合征"等泛化词视为宽泛 */
function isGeneric(kw: string): boolean {
  return /性$|样$|感$/.test(kw) || kw.includes('综合征');
}

extractHints();

/** mulberry32：轻量确定性伪随机数生成器（seed -> [0,1) 序列） */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates 确定性洗牌（不改动原数组） */
function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice();
  const rand = mulberry32(seed);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * 获取某部位的 AI 症状提示。
 * @param partId 部位 id
 * @param count  返回条数
 * @param seed   确定性抽样种子；相同 seed + 相同部位 => 相同批次；换 seed => 新批次
 */
export function getSymptomHints(partId: string, count = 12, seed = 0): SymptomHint[] {
  const all = symptomHintsByPart[partId] || [];
  if (all.length <= count) return all;
  const shuffled = deterministicShuffle(all, seed * 2654435761 + partId.length * 40503);
  return shuffled.slice(0, count);
}

/** 从某部位 hint 中确定性抽取 n 条互不重复的关键词（不足则全取），用于模板填充 */
export function pickDistinctHints(partId: string, n: number, seed = 0): SymptomHint[] {
  const all = symptomHintsByPart[partId] || [];
  if (all.length <= n) return all;
  const shuffled = deterministicShuffle(all, seed * 9973 + 13);
  const picked: SymptomHint[] = [];
  const seen = new Set<string>();
  for (const h of shuffled) {
    if (!seen.has(h.text)) {
      seen.add(h.text);
      picked.push(h);
    }
    if (picked.length >= n) break;
  }
  return picked;
}

/** 根据身体部位生成一段 AI 建议的描述模板（用户可直接使用或修改） */
export function generateAIDescription(partId: string, seed = 0): string {
  const part = bodyParts.find((p) => p.id === partId);
  const partName = part?.name || '该部位';
  const hints = pickDistinctHints(partId, 3, seed);

  const templates: Record<string, string> = {
    head: `${partName}出现{sym1}，伴有{sym2}，{sym3}，持续一段时间`,
    eye: `${partName}{sym1}，伴有{sym2}，影响视物`,
    ear: `${partName}{sym1}，伴有{sym2}`,
    throat: `${partName}{sym1}，伴有{sym2}，吞咽时加重`,
    chest: `${partName}{sym1}，伴有{sym2}，活动后{sym3}`,
    stomach: `${partName}{sym1}，伴有{sym2}，进食后{sym3}`,
    back: `${partName}{sym1}，伴有{sym2}，弯腰或久坐后{sym3}`,
    arm: `${partName}{sym1}，伴有{sym2}，活动时{sym3}`,
    leg: `${partName}{sym1}，伴有{sym2}，行走时{sym3}`,
    skin: `${partName}{sym1}，伴有{sym2}，{sym3}`,
    neck: `${partName}{sym1}，伴有{sym2}，转头时{sym3}`,
    limbs: `${partName}{sym1}，伴有{sym2}，{sym3}`,
    genital: `${partName}{sym1}，伴有{sym2}`,
    mouth: `${partName}{sym1}，伴有{sym2}，进食时{sym3}`,
  };

  let template = templates[partId] || `${partName}{sym1}，伴有{sym2}`;
  hints.forEach((h, i) => {
    template = template.replace(`{sym${i + 1}}`, h.text);
  });
  // 兜底：占位符没被替换完（该部位 hint 不足 3 条）时，用通用词
  template = template.replace(/\{sym\d+\}/g, '不适');
  return template;
}
