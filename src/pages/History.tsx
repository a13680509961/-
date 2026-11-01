import { Link } from 'react-router-dom';
import { useState } from 'react';
import { History as HistoryIcon, Trash2, FileQuestion, AlertTriangle, AlertCircle, CheckCircle, Heart, Clock } from 'lucide-react';
import { loadAll, deleteById, clearAll, formatRelative } from '@/utils/storage';
import type { DiagnosisResult } from '@/utils/diagnose';
import { bodyParts } from '@/data/bodyParts';

const cfg = {
  warning: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10' },
  attention: { icon: AlertCircle, color: 'text-caution', bg: 'bg-caution/soft' },
  good: { icon: CheckCircle, color: 'text-primary', bg: 'bg-primary/10' },
};

export default function History() {
  const [records, setRecords] = useState<DiagnosisResult[]>(loadAll());
  const refresh = () => setRecords(loadAll());
  const del = (id: string) => { if (confirm('确认删除此条记录吗？')) { deleteById(id); refresh(); } };
  const clear = () => { if (confirm('确认清空所有问诊历史？此操作不可恢复。')) { clearAll(); refresh(); } };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fadeIn">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center"><HistoryIcon className="w-5 h-5" /></div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900">问诊历史</h1>
          </div>
          <p className="text-neutral-500">自动保存的问诊记录，共 {records.length} 条</p>
        </div>
        {records.length > 0 && <button onClick={clear} className="text-sm text-neutral-400 hover:text-warning">清空全部</button>}
      </div>

      {records.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4"><FileQuestion className="w-8 h-8 text-neutral-400" /></div>
          <h2 className="font-display text-xl font-bold text-neutral-900 mb-2">还没有问诊记录</h2>
          <p className="text-neutral-500 text-sm mb-6">完成一次 AI 问诊后，记录会自动保存在这里</p>
          <Link to="/consult" className="btn-primary">开始第一次问诊</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((record, idx) => {
            const c = cfg[record.assessment];
            const Icon = c.icon;
            const top = record.diseases[0];
            const bpName = bodyParts.find((b) => b.id === record.input.bodyPartId)?.name || record.input.bodyPartId;
            return (
              <div key={record.id} className="card p-5 hover:shadow-md animate-fadeInUp" style={{ animationDelay: `${idx*0.05}s` }}>
                <Link to={`/result/${record.id}`} className="block">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${c.bg} ${c.color} flex items-center justify-center flex-shrink-0`}><Icon className="w-5 h-5" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="font-semibold text-neutral-900">{top ? top.disease.name : '未匹配到常见病症'}</h3>
                        {top && <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary font-medium">{top.probability}% 可能性</span>}
                      </div>
                      <p className="text-sm text-neutral-500 truncate mb-3">{record.input.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{bpName}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatRelative(record.createdAt)}</span>
                      </div>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); del(record.id); }} className="p-2 rounded-lg text-neutral-400 hover:text-warning hover:bg-warning/10 flex-shrink-0" aria-label="删除"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {records.length > 0 && <div className="mt-10 text-center"><Link to="/consult" className="btn-primary">开始新的问诊</Link></div>}
    </div>
  );
}
