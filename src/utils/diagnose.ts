import { mockDiseases, type Disease } from '@/data/mockDiseases';
import { bodyParts, companionSymptoms } from '@/data/bodyParts';

export interface ConsultInput {
  bodyPartId: string;
  description: string;
  companionIds: string[];
  duration: string;
  severity: string;
}

export interface DiagnosisResult {
  id: string;
  createdAt: number;
  input: ConsultInput;
  diseases: { disease: Disease; score: number; probability: number }[];
  assessment: 'good' | 'attention' | 'warning';
  assessmentText: string;
}

function extractKeywords(text: string): string[] {
  if (!text) return [];
  const words = new Set<string>();
  const segments = text.replace(/[，。、！？,.!?\s]/g, ' ').split(/\s+/).filter(Boolean);
  for (const seg of segments) {
    words.add(seg);
    for (let len = Math.min(seg.length, 4); len >= 2; len--) {
      for (let i = 0; i <= seg.length - len; i++) {
        words.add(seg.substring(i, i + len));
      }
    }
  }
  return Array.from(words);
}

function findBodyPartKeywords(text: string): string[] {
  const kws: string[] = [];
  for (const bp of bodyParts) {
    for (const kw of bp.keywords) {
      if (text.includes(kw) && !kws.includes(bp.id)) { kws.push(bp.id); break; }
    }
  }
  return kws;
}

function findCompanionFromText(text: string): string[] {
  const ids: string[] = [];
  for (const cs of companionSymptoms) {
    for (const kw of cs.keywords) {
      if (text.includes(kw)) { ids.push(cs.id); break; }
    }
  }
  return ids;
}

export function diagnose(input: ConsultInput): DiagnosisResult {
  const keywords = extractKeywords(input.description);
  const detectedBodyParts = findBodyPartKeywords(input.description);
  const detectedCompanions = findCompanionFromText(input.description);
  const allCompanionIds = Array.from(new Set([...input.companionIds, ...detectedCompanions]));
  const allBodyPartIds = Array.from(new Set([input.bodyPartId, ...detectedBodyParts]));

  const scores = mockDiseases.map((disease) => {
    let score = 0;
    for (const kw of disease.keywords) {
      for (const k of keywords) {
        if (k.length >= 2 && (kw.includes(k) || k.includes(kw))) { score += 2; break; }
      }
    }
    for (const bpId of allBodyPartIds) {
      if (disease.bodyParts.includes(bpId)) score += 3;
    }
    for (const cid of allCompanionIds) {
      if (disease.companionSymptoms.includes(cid)) score += 2.5;
    }
    if (input.duration === 'chronic' || input.duration === 'months') {
      if (disease.category === '精神心理' || disease.category === '神经系统') score += 2;
    } else if (input.duration === 'acute' || input.duration === 'days') {
      if (disease.category === '呼吸系统' || disease.category === '消化系统') score += 1.5;
    }
    if (input.severity === 'severe' && disease.urgency === 'high') score += 1.5;
    return { disease, score };
  });

  scores.sort((a, b) => b.score - a.score);
  const top = scores.filter((s) => s.score > 0).slice(0, 4);
  const total = top.reduce((sum, s) => sum + s.score, 0) || 1;
  const withProb = top.map((s) => ({
    disease: s.disease,
    score: s.score,
    probability: Math.round((s.score / total) * 100),
  }));
  const probSum = withProb.reduce((s, x) => s + x.probability, 0);
  if (probSum > 0 && probSum !== 100) withProb[0].probability += 100 - probSum;

  const topProb = withProb[0]?.probability || 0;
  let assessment: 'good' | 'attention' | 'warning' = 'attention';
  let assessmentText = '';
  if (input.severity === 'severe' || withProb.some((w) => w.disease.urgency === 'high' && w.probability > 30)) {
    assessment = 'warning';
    assessmentText = '根据您描述的症状，建议尽快前往医院就诊，以便明确诊断并接受及时治疗。以下是医生视角的处理意见供您参考。';
  } else if (topProb >= 60) {
    assessment = 'attention';
    assessmentText = '根据 AI 分析，以下几种情况可能性较大。下方包含详细的医生处理意见，建议先参考家庭处理，若无改善或加重请及时就医。';
  } else if (topProb >= 40) {
    assessment = 'attention';
    assessmentText = '症状信息有限，以下是参考方向。下方提供了医生处理意见，请结合实际情况参考。';
  } else {
    assessment = 'good';
    assessmentText = '目前症状看起来不严重，可先进行自我观察。保持良好作息，均衡饮食。如有变化随时就诊。';
  }

  return {
    id: `diag_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    input,
    diseases: withProb,
    assessment,
    assessmentText,
  };
}
