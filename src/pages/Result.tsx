import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, AlertTriangle, CheckCircle, AlertCircle,
  Stethoscope, Lightbulb, Heart, Clock, Trash2, ClipboardCheck,
  Pill, FileSearch, Activity, CalendarCheck, UserCheck, ShieldAlert
} from 'lucide-react';
import { loadById, deleteById, formatDate } from '@/utils/storage';
import type { DiagnosisResult } from '@/utils/diagnose';
import { bodyParts, companionSymptoms, durationOptions, severityOptions } from '@/data/bodyParts';

const assessCfg = {
  warning: { icon: AlertTriangle, iconClass: 'text-warning', bgClass: 'bg-warning/10 border-warning/30', badgeClass: 'bg-warning text-white', label: '建议尽快就医' },
  attention: { icon: AlertCircle, iconClass: 'text-caution', bgClass: 'bg-caution/soft border-caution/40', badgeClass: 'bg-caution text-white', label: '需要关注' },
  good: { icon: CheckCircle, iconClass: 'text-primary', bgClass: 'bg-primary/10 border-primary/30', badgeClass: 'bg-primary text-white', label: '目前状况良好' },
};

export default function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  useEffect(() => {
    if (!id) return;
    const r = loadById(id);
    if (!r) { navigate('/', { replace: true }); return; }
    setResult(r);
  }, [id, navigate]);

  if (!result) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><p className="text-neutral-500">加载中…</p></div>;

  const cfg = assessCfg[result.assessment];
  const Icon = cfg.icon;
  const topDisease = result.diseases[0];
  const treatment = topDisease?.disease?.treatment;

  const bpName = bodyParts.find((b) => b.id === result.input.bodyPartId)?.name || result.input.bodyPartId;
  const durLabel = durationOptions.find((d) => d.value === result.input.duration)?.label || result.input.duration;
  const sevLabel = severityOptions.find((s) => s.value === result.input.severity)?.label || result.input.severity;
  const compNames = result.input.companionIds.map((c) => companionSymptoms.find((cs) => cs.id === c)?.name).filter(Boolean) as string[];

  const del = () => { if (confirm('确认删除此条问诊记录吗？')) { deleteById(result.id); navigate('/history', { replace: true }); } };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fadeIn">
      <Link to="/history" className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-primary mb-6"><ArrowLeft className="w-4 h-4" />返回历史记录</Link>

      {/* Assessment banner */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 ${cfg.bgClass} mb-8 animate-fadeInUp`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm ${cfg.iconClass}`}><Icon className="w-8 h-8" /></div>
          <div className="flex-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${cfg.badgeClass} mb-2`}>{cfg.label}</span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">AI 分析 · 医生处理意见</h1>
            <p className="text-neutral-600 leading-relaxed">{result.assessmentText}</p>
          </div>
        </div>
      </div>

      {/* Input summary */}
      <div className="card p-5 mb-8">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 mb-4"><Stethoscope className="w-4 h-4 text-primary" />您的问诊信息</div>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div><span className="text-neutral-400">部位：</span><span className="text-neutral-700 font-medium">{bpName}</span></div>
          <div><span className="text-neutral-400">时长：</span><span className="text-neutral-700">{durLabel}</span></div>
          <div><span className="text-neutral-400">程度：</span><span className="text-neutral-700">{sevLabel}</span></div>
          {compNames.length > 0 && <div><span className="text-neutral-400">伴随：</span><span className="text-neutral-700">{compNames.join('、')}</span></div>}
          <div className="sm:col-span-2"><span className="text-neutral-400">描述：</span><span className="text-neutral-700">{result.input.description}</span></div>
          <div className="sm:col-span-2 text-xs text-neutral-400 flex items-center gap-1"><Clock className="w-3 h-3" />{formatDate(result.createdAt)}</div>
        </div>
      </div>

      {/* Disease matches */}
      <div className="mb-8">
        <h2 className="font-display text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2"><Heart className="w-5 h-5 text-primary" />可能的健康方向</h2>
        {result.diseases.length === 0 ? (
          <div className="card p-6 text-center text-neutral-500">根据提供的信息，未匹配到常见病症。建议前往医院进行专业诊断。</div>
        ) : (
          <div className="space-y-4">
            {result.diseases.map((item, idx) => {
              const top = result.diseases[0]; const isTop = idx === 0;
              return (
                <div key={item.disease.id} className={`card p-5 relative overflow-hidden animate-fadeInUp ${isTop ? 'ring-1 ring-primary/20' : ''}`} style={{ animationDelay: `${idx*0.1}s` }}>
                  {isTop && <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl">最可能</div>}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-lg font-bold text-neutral-900">{item.disease.name}</h3>
                        <span className="px-2 py-0.5 rounded text-xs bg-neutral-100 text-neutral-500">{item.disease.category}</span>
                      </div>
                      <p className="text-sm text-neutral-500 leading-relaxed">{item.disease.description}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <div className={`font-display text-2xl font-bold ${isTop ? 'text-primary' : 'text-neutral-700'}`}>{item.probability}%</div>
                      <div className="text-xs text-neutral-400">匹配度</div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-700 ${isTop ? 'bg-gradient-to-r from-primary to-accent' : 'bg-neutral-300'}`} style={{ width: `${(item.probability / (top.probability || 1)) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ★★★ 医生处理意见模块 ★★★ */}
      {treatment && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900">医生处理意见 · {topDisease.disease.name}</h2>
          </div>
          <p className="text-sm text-neutral-500 mb-6 ml-10">以下内容基于通用医学知识，仅供参考。具体诊疗请遵医嘱。</p>

          <div className="space-y-4">
            {/* 1. 初步处理 */}
            <div className="card p-6 border-l-4 border-accent">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center"><ClipboardCheck className="w-4 h-4" /></div>
                <h3 className="font-semibold text-neutral-900">一、初步处理（家庭/门诊初期）</h3>
              </div>
              <ul className="space-y-2 ml-10">
                {treatment.preliminaryCare.map((item, i) => (
                  <li key={i} className="text-sm text-neutral-700 leading-relaxed flex gap-2">
                    <span className="text-accent font-semibold flex-shrink-0">0{i+1}.</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. 建议检查 */}
            <div className="card p-6 border-l-4 border-info">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-info/soft text-info flex items-center justify-center"><FileSearch className="w-4 h-4" /></div>
                <h3 className="font-semibold text-neutral-900">二、建议检查项目</h3>
              </div>
              <ul className="space-y-2 ml-10">
                {treatment.examinations.map((item, i) => (
                  <li key={i} className="text-sm text-neutral-700 leading-relaxed flex gap-2">
                    <span className="text-info font-semibold flex-shrink-0">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. 用药参考 */}
            <div className="card p-6 border-l-4 border-caution">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-caution/soft text-caution flex items-center justify-center"><Pill className="w-4 h-4" /></div>
                <h3 className="font-semibold text-neutral-900">三、用药参考</h3>
              </div>
              <div className="ml-10 space-y-4">
                {treatment.medications.otc.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-caution mb-2">非处方药（OTC，可自行购买）</div>
                    <ul className="space-y-1.5">
                      {treatment.medications.otc.map((m, i) => (
                        <li key={i} className="text-sm text-neutral-700 flex gap-2"><span className="text-caution">▸</span>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {treatment.medications.prescription.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold text-warning mb-2">处方药（需医生开具）</div>
                    <ul className="space-y-1.5">
                      {treatment.medications.prescription.map((m, i) => (
                        <li key={i} className="text-sm text-neutral-700 flex gap-2"><span className="text-warning">▸</span>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {treatment.medications.notes && (
                  <div className="p-3 rounded-lg bg-caution/soft text-xs text-neutral-700 leading-relaxed">
                    <strong className="text-caution">💊 用药提示：</strong>{treatment.medications.notes}
                  </div>
                )}
              </div>
            </div>

            {/* 4. 治疗方案走向 */}
            <div className="card p-6 border-l-4 border-primary">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Activity className="w-4 h-4" /></div>
                <h3 className="font-semibold text-neutral-900">四、治疗方案走向</h3>
              </div>
              <ol className="space-y-2 ml-10">
                {treatment.treatmentPlan.map((item, i) => (
                  <li key={i} className="text-sm text-neutral-700 leading-relaxed flex gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i+1}</span>{item}
                  </li>
                ))}
              </ol>
            </div>

            {/* 5. 复诊/观察建议 */}
            <div className="card p-6 border-l-4 border-warning">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-warning/10 text-warning flex items-center justify-center"><CalendarCheck className="w-4 h-4" /></div>
                <h3 className="font-semibold text-neutral-900">五、复诊与观察建议</h3>
              </div>
              <ul className="space-y-2 ml-10">
                {treatment.followUp.map((item, i) => (
                  <li key={i} className="text-sm text-neutral-700 leading-relaxed flex gap-2">
                    <span className="text-warning font-semibold flex-shrink-0">!</span>{item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 6. 日常建议 + 何时就医 */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center"><Lightbulb className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-neutral-900">日常自我管理</h3>
                </div>
                <ul className="space-y-1.5">
                  {topDisease.disease.advice.map((tip, i) => (
                    <li key={i} className="text-xs text-neutral-600 flex gap-2"><span className="text-accent">•</span>{tip}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-5 border-warning/20 bg-warning/5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-warning/10 text-warning flex items-center justify-center"><ShieldAlert className="w-4 h-4" /></div>
                  <h3 className="font-semibold text-neutral-900">何时必须就医</h3>
                </div>
                <p className="text-xs text-neutral-700 leading-relaxed">{topDisease.disease.whenToSeeDoctor}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency notice */}
      <div className="p-5 rounded-2xl bg-neutral-900 text-white mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold mb-1">紧急情况请立即拨打 120</p>
            <p className="text-sm text-neutral-300">本平台所有 AI 分析和处理意见仅供参考，不能替代专业医疗诊断。任何紧急或严重症状，请立刻前往最近医院就诊或拨打急救电话。</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/consult" className="btn-primary flex-1 justify-center">再次问诊<ArrowRight className="w-4 h-4" /></Link>
        <Link to="/knowledge" className="btn-secondary flex-1 justify-center">浏览健康知识</Link>
        <button onClick={del} className="btn-ghost text-warning hover:bg-warning/10"><Trash2 className="w-4 h-4" />删除</button>
      </div>
    </div>
  );
}
