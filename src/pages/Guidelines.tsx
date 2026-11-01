import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { BookMarked, Search, Filter, Building2, Calendar, ChevronRight, Sparkles } from 'lucide-react';
import { clinicalGuidelines, guidelineDepartments } from '@/data/guidelines';

export default function Guidelines() {
  const [dept, setDept] = useState('全部');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return clinicalGuidelines.filter((g) => {
      const matchDept = dept === '全部' || g.department === dept;
      const q = query.trim().toLowerCase();
      const matchQ = !q || g.title.toLowerCase().includes(q) || g.issuer.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q);
      return matchDept && matchQ;
    });
  }, [dept, query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fadeIn">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">临床指南</h1>
        <p className="text-neutral-500 max-w-2xl">
          精选国内权威学术机构发布的诊疗指南与专家共识核心内容，帮助您了解疾病的规范诊疗路径。
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索指南名称或发布机构…"
            className="input-base pl-11"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500"><Filter className="w-4 h-4" /><span>专科</span></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {guidelineDepartments.map((d) => (
          <button key={d} onClick={() => setDept(d)} className={`tag ${dept === d ? 'tag-active' : 'tag-default'}`}>{d}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <BookMarked className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-500">没有找到相关指南</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((g, idx) => (
            <Link
              key={g.id} to={`/guidelines/${g.id}`}
              className="card p-6 sm:p-7 block group hover:-translate-y-0.5 animate-fadeInUp"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">{g.department}</span>
                    <span className="flex items-center gap-1 text-xs text-neutral-400"><Calendar className="w-3 h-3" />{g.year} 年</span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-900 group-hover:text-primary mb-2">{g.title}</h3>
                  <p className="flex items-center gap-1.5 text-xs text-neutral-400 mb-3"><Building2 className="w-3.5 h-3.5" />{g.issuer}</p>
                  <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">{g.summary}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-primary">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{g.keyPoints.length} 条核心推荐 · {g.sections.length} 个章节</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
