import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Clock, Info, RotateCcw,
  ShieldAlert, Stethoscope, Users,
} from 'lucide-react';
import { getScaleById, interpretScore } from '@/data/clinicalScales';
import { mockDiseases } from '@/data/mockDiseases';
import { saveScaleResult } from '@/utils/scaleStorage';

export default function ScaleDetail() {
  const { id } = useParams<{ id: string }>();
  const scale = id ? getScaleById(id) : undefined;
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const total = scale?.questions.length ?? 0;
  const progress = total > 0 ? (answeredCount / total) * 100 : 0;

  const score = useMemo(() => Object.values(answers).reduce((s, v) => s + v, 0), [answers]);
  const result = useMemo(() => (scale && submitted ? interpretScore(scale, score) : null), [scale, submitted, score]);

  if (!scale) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fadeIn">
        <ClipboardList className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-neutral-900 mb-2">未找到该量表</h1>
        <Link to="/scales" className="text-primary font-medium hover:underline">返回量表列表</Link>
      </div>
    );
  }

  const handleSelect = (qid: number, value: number) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = () => {
    if (answeredCount < total) return;
    setSubmitted(true);
    const interp = interpretScore(scale, score);
    saveScaleResult({ scaleId: scale.id, score, level: interp.level, color: interp.color, timestamp: Date.now() });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedDiseases = mockDiseases.filter((d) => scale.relatedDiseases.includes(d.id));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
      <Link to="/scales" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> 返回量表列表
      </Link>

      {/* 量表头部信息 */}
      <div className="card p-6 sm:p-8 mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">{scale.abbr}</span>
          <span className="px-3 py-1 rounded-full text-xs bg-neutral-100 text-neutral-600">{scale.category}</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{scale.name}</h1>
        <p className="text-sm text-neutral-500 mb-5">{scale.fullName}</p>
        <div className="grid sm:grid-cols-3 gap-3 text-sm">
          <div className="flex items-center gap-2 text-neutral-600"><ClipboardList className="w-4 h-4 text-primary" />{total} 个题目</div>
          <div className="flex items-center gap-2 text-neutral-600"><Clock className="w-4 h-4 text-primary" />约 {scale.timeMinutes} 分钟</div>
          <div className="flex items-center gap-2 text-neutral-600"><Users className="w-4 h-4 text-primary" />{scale.applicable}</div>
        </div>
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-start gap-2 text-xs text-neutral-400">
          <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>量表出处：{scale.source}。测评结果仅供自我参考，不构成医学诊断。</span>
        </div>
      </div>

      {/* 结果区 */}
      {submitted && result && (
        <div className="mb-8 animate-fadeInUp">
          <div className="card overflow-hidden">
            <div className="h-1.5" style={{ backgroundColor: result.color }} />
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
                <div className="flex items-center gap-5">
                  <div
                    className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-white shadow-xl shrink-0"
                    style={{ backgroundColor: result.color, boxShadow: `0 12px 28px -8px ${result.color}88` }}
                  >
                    <span className="text-3xl font-bold leading-none">{score}</span>
                    <span className="text-[10px] opacity-80 mt-1">/ {scale.maxScore} 分</span>
                  </div>
                  <div>
                    <p className="text-xs text-neutral-400 mb-1">测评结果</p>
                    <h2 className="font-display text-2xl font-bold" style={{ color: result.color }}>{result.level}</h2>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${(score / scale.maxScore) * 100}%`, backgroundColor: result.color }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                    <span>0</span><span>{scale.maxScore}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-neutral-600 leading-relaxed">{result.description}</p>
                <div className="rounded-xl p-4" style={{ backgroundColor: result.color + '12' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: result.color }}>专业建议</p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{result.suggestion}</p>
                </div>
              </div>

              {/* 分档对照 */}
              <div className="mt-6 pt-5 border-t border-neutral-100">
                <p className="text-xs font-semibold text-neutral-500 mb-3">评分分档对照</p>
                <div className="space-y-1.5">
                  {scale.interpretations.map((i) => (
                    <div
                      key={i.level}
                      className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg ${
                        i.level === result.level ? 'ring-1 font-semibold' : 'opacity-60'
                      }`}
                      style={i.level === result.level ? { backgroundColor: i.color + '14', color: i.color, boxShadow: `0 0 0 1px ${i.color}55` } : {}}
                    >
                      <span>{i.level}</span>
                      <span>{i.min}-{i.max} 分</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button onClick={handleReset} className="btn-secondary flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" /> 重新测评
                </button>
                <Link to="/consult" className="btn-primary flex items-center justify-center gap-2">
                  <Stethoscope className="w-4 h-4" /> 去做智能问诊
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 答题区 */}
      {!submitted && (
        <>
          <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 bg-neutral-50/90 backdrop-blur mb-6">
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
              <span>已完成 {answeredCount}/{total} 题</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-xl bg-primary/5 border border-primary/10 px-4 py-3 mb-6 text-sm text-neutral-700">
            {scale.instruction}
          </div>

          <div className="space-y-4 mb-8">
            {scale.questions.map((q, idx) => {
              const opts = q.options ?? scale.options;
              const selected = answers[q.id];
              return (
                <div key={q.id} className="card p-5 sm:p-6 animate-fadeInUp" style={{ animationDelay: `${idx * 0.04}s` }}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      selected !== undefined ? 'bg-primary text-white' : 'bg-neutral-100 text-neutral-500'
                    }`}>
                      {selected !== undefined ? <CheckCircle2 className="w-4 h-4" /> : q.id}
                    </span>
                    <p className="font-medium text-neutral-900 leading-relaxed">{q.text}</p>
                  </div>
                  <div className="grid gap-2 pl-10">
                    {opts.map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => handleSelect(q.id, opt.score)}
                        className={`text-left px-4 py-2.5 rounded-xl text-sm border transition-all ${
                          selected === opt.score
                            ? 'border-primary bg-primary/10 text-primary font-medium'
                            : 'border-neutral-200 text-neutral-600 hover:border-primary/40 hover:bg-primary/5'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleSubmit}
            disabled={answeredCount < total}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            查看测评结果 <ArrowRight className="w-4 h-4" />
          </button>
          {answeredCount < total && (
            <p className="text-center text-xs text-neutral-400 mt-3">请完成全部 {total} 道题目后提交</p>
          )}
        </>
      )}

      {/* 相关疾病提示 */}
      {relatedDiseases.length > 0 && (
        <div className="mt-8 card p-5">
          <p className="text-xs font-semibold text-neutral-500 mb-3">与本量表相关的健康问题</p>
          <div className="flex flex-wrap gap-2">
            {relatedDiseases.map((d) => (
              <span key={d.id} className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs text-neutral-600">{d.name}</span>
            ))}
          </div>
        </div>
      )}

      {/* 警示 */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4">
        <ShieldAlert className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-xs text-neutral-600 leading-relaxed">
          量表测评仅为筛查工具，<strong>不能作为诊断依据</strong>。若结果提示异常或症状持续困扰您，请及时前往医院相应科室就诊。
          如有自伤或轻生念头，请立即拨打 24 小时心理援助热线 <strong>400-161-9995</strong>。
        </p>
      </div>
    </div>
  );
}
