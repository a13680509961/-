import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { mockArticles } from '@/data/mockArticles';

export default function KnowledgeDetail() {
  const { slug } = useParams();
  const article = mockArticles.find((a) => a.slug === slug);
  if (!article) return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h2 className="font-display text-2xl font-bold mb-3">文章未找到</h2>
      <p className="text-neutral-500 mb-6">这篇文章可能已被移除或链接有误</p>
      <Link to="/knowledge" className="btn-primary">返回知识库</Link>
    </div>
  );
  const lines = article.content.split('\n');
  return (
    <div className="animate-fadeIn">
      <div className="relative" style={{ backgroundColor: article.imageColor + '15' }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${article.imageColor}22 0%, transparent 70%)` }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <Link to="/knowledge" className="inline-flex items-center gap-1 text-sm text-neutral-600 hover:text-primary mb-6"><ArrowLeft className="w-4 h-4" />返回知识库</Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: article.imageColor }}>{article.tag}</span>
            <span className="text-sm text-neutral-500">{article.category}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">{article.title}</h1>
          <p className="text-neutral-600 text-lg mb-6">{article.summary}</p>
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readTime} 分钟阅读</span>
            <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />健康科普</span>
          </div>
        </div>
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-neutral max-w-none">
          {lines.map((line, i) => {
            if (!line.trim()) return <div key={i} className="h-4" />;
            if (line.startsWith('# ')) return <h1 key={i} className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mt-10 mb-4 first:mt-0">{line.slice(2)}</h1>;
            if (line.startsWith('## ')) return <h2 key={i} className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mt-8 mb-3 flex items-center gap-2"><span className="w-1 h-6 rounded-full bg-primary" />{line.slice(3)}</h2>;
            if (line.startsWith('### ')) return <h3 key={i} className="font-display text-lg font-bold text-neutral-800 mt-6 mb-2">{line.slice(4)}</h3>;
            if (line.startsWith('- ')) return <li key={i} className="text-neutral-700 leading-relaxed pl-4 ml-2 border-l-2 border-primary/30 py-1">{line.slice(2)}</li>;
            if (line.startsWith('|')) return null;
            if (line.startsWith('> ')) return <blockquote key={i} className="border-l-4 border-primary bg-primary/5 pl-4 py-2 my-4 text-neutral-700 italic">{line.slice(2)}</blockquote>;
            return <p key={i} className="text-neutral-700 leading-relaxed mb-3">{line}</p>;
          })}
        </div>
        <div className="mt-16 p-6 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-neutral-900 mb-1">需要进一步帮助？</h4>
              <p className="text-sm text-neutral-600 mb-4">如果您有具体的不适症状，可以使用智能问诊，获得完整的医生处理意见参考。</p>
              <Link to="/consult" className="btn-primary !py-2 !px-5 text-sm">开始智能问诊</Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
