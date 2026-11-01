import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Search, Clock, Filter, BookOpen, ArrowRight } from 'lucide-react';
import { mockArticles } from '@/data/mockArticles';

const categories = ['全部', '问诊指南', '家庭护理', '就医指南', '心理健康', '健康生活', '慢性管理'];

export default function Knowledge() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('全部');
  const filtered = useMemo(() => {
    return mockArticles.filter((a) => {
      const matchCat = category === '全部' || a.category === category;
      const q = query.trim().toLowerCase();
      const matchQ = !q || a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.content.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fadeIn">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">健康知识库</h1>
        <p className="text-neutral-500 max-w-2xl">精选权威健康科普内容，覆盖问诊指南、家庭护理、心理健康等常见主题</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索文章标题或关键词…" className="input-base pl-11" />
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500"><Filter className="w-4 h-4" /><span>分类</span></div>
      </div>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={`tag ${category === c ? 'tag-active' : 'tag-default'}`}>{c}</button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-20"><BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" /><p className="text-neutral-500">没有找到相关文章</p></div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article, idx) => (
            <Link key={article.slug} to={`/knowledge/${article.slug}`} className="card overflow-hidden group hover:-translate-y-1 animate-fadeInUp" style={{ animationDelay: `${idx*0.05}s` }}>
              <div className="h-32 relative overflow-hidden" style={{ backgroundColor: article.imageColor + '22' }}>
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, ${article.imageColor}33 0%, transparent 60%)` }} />
                <div className="absolute top-4 left-4"><span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: article.imageColor }}>{article.tag}</span></div>
                <div className="absolute bottom-4 right-4"><BookOpen className="w-8 h-8 text-white/40" /></div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span className="px-2 py-0.5 rounded bg-neutral-100">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} 分钟</span>
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-primary line-clamp-2">{article.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{article.summary}</p>
                <div className="flex items-center gap-1 text-primary text-sm font-medium pt-1 group-hover:gap-2 transition-all">阅读全文 <ArrowRight className="w-4 h-4" /></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
