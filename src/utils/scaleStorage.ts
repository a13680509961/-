// 量表测评结果的本地持久化
const KEY = 'zhenzhientong_scale_results_v1';

export interface ScaleResultRecord {
  scaleId: string;
  score: number;
  level: string;
  color: string;
  timestamp: number;
}

type ResultMap = Record<string, ScaleResultRecord>;

function readAll(): ResultMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ResultMap) : {};
  } catch {
    return {};
  }
}

export function saveScaleResult(record: ScaleResultRecord): void {
  try {
    const all = readAll();
    all[record.scaleId] = record;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // 存储失败静默降级，不影响测评流程
  }
}

export function getLastScaleResults(): ResultMap {
  return readAll();
}
