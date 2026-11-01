import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, BookMarked, Building2, Calendar, ChevronRight, Sparkles,
  ShieldAlert, Stethoscope, Layers,
} from 'lucide-react';
import { getGuidelineById } from '@/data/guidelines';
import { mockDiseases } from '@/data/mockDiseases';

export default function GuidelineDetail() {
  const { id } = useParams<{ id: string }>();
  const guide = id ? getGuidelineById(id) : undefined;

  if (!guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <BookMarked className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">未找到该指南</h1>
        <Link to="/guidelines" className="text-primary font-medium hover:underline">返回指南列表</Link>
      </div>
    );
  }

  const relatedDiseases = mockDiseases.filter((d) => guide.relatedDiseases.includes(d.id));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <Link to="/guidelines" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> 返回指南列表
      </Link>

      {/* 指南头部 */}
      <div className="card p-6 sm:p-8 mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{guide.department}</span>
          <span className="flex items-center gap-1 text-xs text-neutral-400"><Calendar className="w-3 h-3" />{guide.year} 年发布</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{guide.title}</h1>
        {guide.englishTitle && <p className="text-sm text-neutral-400 italic mb-4">{guide.englishTitle}</p>}
        <p className="flex items-center gap-1.5 text-sm text-neutral-500 mb-5"><Building2 className="w-4 h-4" />{guide.issuer}</p>
        <p className="text-neutral-600 leading-relaxed">{guide.summary}</p>
      </div>

      {/* 核心推荐 */}
      <div className="card overflow-hidden mb-6 animate-fadeInUp">
        <div className="h-1.5 bg-primary" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="font-display text-xl font-bold text-neutral-900">核心推荐要点</h2>
          </div>
          <div className="space-y-3">
            {guide.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/10 px-4 py-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-sm text-neutral-700 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 章节详情 */}
      <div className="space-y-5 mb-6">
        {guide.sections.map((section, sIdx) => (
          <div key={sIdx} className="card p-6 sm:p-7 animate-fadeInUp" style={{ animationDelay: `${sIdx * 0.06}s` }}>
            <div className="flex items-center gap-2.5 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-bold text-neutral-900">{section.heading}</h3>
            </div>
            <ul className="space-y-2.5">
              {section.items.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2.5 text-sm text-neutral-600 leading-relaxed">
                  <ChevronRight className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 相关疾病 */}
      {relatedDiseases.length > 0 && (
        <div className="card p-5 mb-6">
          <p className="text-xs font-semibold text-neutral-500 mb-3">本指南涉及的疾病</p>
          <div className="flex flex-wrap gap-2">
            {relatedDiseases.map((d) => (
              <span key={d.id} className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs text-neutral-600">{d.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* 证据说明 */}
      <div className="flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 mb-8">
        <ShieldAlert className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-neutral-600 leading-relaxed">{guide.evidenceNote}</p>
      </div>

      <Link to="/consult" className="btn-primary w-full flex items-center justify-center gap-2">
        <Stethoscope className="w-4 h-4" /> 有症状？去智能问诊
      </Link>
    </div>
  );
}
