import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { ClipboardList, Clock, Filter, Users, ChevronRight, Search, History } from 'lucide-react';
import { clinicalScales, scaleCategories } from '@/data/clinicalScales';
import { getLastScaleResults } from '@/utils/scaleStorage';

const categoryColors: Record<string, string> = {
  精神心理: '#8B5CF6',
  睡眠医学: '#6366F1',
  呼吸内科: '#0D7C66',
  神经内科: '#E76F51',
  预防医学: '#F59E0B',
};

export default function Scales() {
  const [category, setCategory] = useState('全部');
  const [query, setQuery] = useState('');
  const lastResults = useMemo(() => getLastScaleResults(), []);

  const filtered = useMemo(() => {
    return clinicalScales.filter((s) => {
      const matchCat = category === '全部' || s.category === category;
      const q = query.trim().toLowerCase();
      const matchQ = !q || s.name.toLowerCase().includes(q) || s.abbr.toLowerCase().includes(q) || s.purpose.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [category, query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fadeIn">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">临床评估量表</h1>
        <p className="text-neutral-500 max-w-2xl">
          收录国际通用的临床自评量表，帮助您科学量化症状严重程度。测评结果仅供自我参考，不能替代医生诊断。
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索量表名称或缩写，如 PHQ-9…"
            className="input-base pl-11"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500"><Filter className="w-4 h-4" /><span>专科分类</span></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {scaleCategories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`tag ${category === c ? 'tag-active' : 'tag-default'}`}>{c}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <ClipboardList className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">没有找到相关量表</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((scale, idx) => {
            const color = categoryColors[scale.category] ?? '#0D7C66';
            const last = lastResults[scale.id];
            return (
              <Link
                key={scale.id} to={`/scales/${scale.id}`}
                className="card p-6 group hover:-translate-y-1 animate-fadeInUp"
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg"
                      style={{ backgroundColor: color, boxShadow: `0 8px 20px -6px ${color}66` }}
                    >
                      {scale.abbr}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-primary">{scale.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: color + '1A', color }}>{scale.category}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-neutral-500 mb-4 line-clamp-2">{scale.purpose}</p>
                <div className="flex items-center gap-4 text-xs text-neutral-400">
                  <span className="flex items-center gap-1"><ClipboardList className="w-3.5 h-3.5" />{scale.questions.length} 题</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />约 {scale.timeMinutes} 分钟</span>
                  <span className="flex items-center gap-1 line-clamp-1"><Users className="w-3.5 h-3.5" />{scale.applicable}</span>
                </div>
                {last && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-2 text-xs">
                    <History className="w-3.5 h-3.5 text-neutral-400" />
                    <span className="text-neutral-500">上次测评：</span>
                    <span className="font-semibold" style={{ color: last.color }}>{last.score} 分 · {last.level}</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
