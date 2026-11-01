import type { DiagnosisResult } from './diagnose';

const STORAGE_KEY = 'zhenzhientong_history_v1';
const MAX_RECORDS = 50;

export function saveResult(result: DiagnosisResult): void {
  try {
    const list = loadAll();
    list.unshift(result);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_RECORDS)));
  } catch (e) { console.error('Failed to save:', e); }
}

export function loadAll(): DiagnosisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DiagnosisResult[]) : [];
  } catch { return []; }
}

export function loadById(id: string): DiagnosisResult | null {
  return loadAll().find((r) => r.id === id) || null;
}

export function deleteById(id: string): void {
  const list = loadAll().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function clearAll(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return '刚刚';
  if (mins < 60) return `${mins} 分钟前`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} 小时前`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} 天前`;
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function formatDate(ts: number): string {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
}
