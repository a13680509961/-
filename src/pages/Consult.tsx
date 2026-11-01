import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, ChevronRight, Wand2, RefreshCw } from 'lucide-react';
import { useConsultStore } from '@/stores/consultStore';
import { bodyParts, bodyPartEmojis, companionSymptoms, companionCategories, descriptorGroups, quickLocationTags, durationOptions, severityOptions } from '@/data/bodyParts';
import { diagnose, type DiagnosisResult } from '@/utils/diagnose';
import { saveResult } from '@/utils/storage';
import { getSymptomHints, generateAIDescription } from '@/utils/symptomHints';
import LoadingSpinner from '@/components/LoadingSpinner';

const steps = ['部位', '描述', '伴随', '时长', '程度'];

export default function Consult() {
  const navigate = useNavigate();
  const store = useConsultStore();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hintSeed, setHintSeed] = useState(0);
  const [aiGenerating, setAiGenerating] = useState(false);
  const canProceed = store.canProceed();

  // 根据所选部位动态获取 AI 症状提示（hintSeed 变化 => 换一批确定性结果）
  const symptomHints = useMemo(
    () => getSymptomHints(store.bodyPartId, 12, hintSeed),
    [store.bodyPartId, hintSeed]
  );

  const appendToDescription = (text: string) => {
    const cur = store.description;
    const sep = cur && !cur.endsWith('，') && !cur.endsWith('。') ? '，' : '';
    store.setDescription(cur + sep + text);
  };

  const handleAIGenerate = () => {
    setAiGenerating(true);
    setTimeout(() => {
      const suggestion = generateAIDescription(store.bodyPartId, Date.now() % 1000000);
      // 用户已有内容时追加而非覆盖，保持已写描述不被丢失
      appendToDescription(suggestion);
      setAiGenerating(false);
    }, 600);
  };

  const goBack = () => {
    if (store.step === 0) navigate(-1);
    else { store.setStep(store.step - 1); setError(''); }
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (store.step < 4) { store.setStep(store.step + 1); setError(''); }
    else handleSubmit();
  };

  const handleSubmit = async () => {
    if (!store.canProceed()) { setError('请先完整填写所有信息'); return; }
    setError(''); setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2500));
    const result: DiagnosisResult = diagnose(store.getInput());
    saveResult(result); store.reset(); setSubmitting(false);
    navigate(`/result/${result.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 animate-fadeIn">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"><Sparkles className="w-4 h-4" />AI 智能问诊</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">告诉我们您的不适</h1>
        <p className="text-neutral-500">5 步快速完成，约 2 分钟，结果包含医生级处理意见</p>
      </div>
      <div className="mb-10">
        <div className="flex justify-between mb-3">
          {steps.map((label, i) => (
            <div key={label} className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${i === store.step ? 'text-primary' : i < store.step ? 'text-accent' : 'text-neutral-400'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${i === store.step ? 'bg-primary text-white' : i < store.step ? 'bg-accent text-white' : 'bg-neutral-200 text-neutral-500'}`}>{i < store.step ? '✓' : i + 1}</span>
              <span className="hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>
        <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${(store.step / 4) * 100}%` }} />
        </div>
      </div>

      {store.step > 0 && (
        <button onClick={goBack} className="inline-flex items-center gap-1 text-sm text-neutral-500 hover:text-primary transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />返回上一步
        </button>
      )}

      {submitting ? (
        <div className="card p-10"><LoadingSpinner text="AI 正在匹配病症，生成医生级处理意见…" /></div>
      ) : (
        <div className="card p-6 sm:p-10 min-h-[380px]">
          {store.step === 0 && (
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">您感到不适的主要部位是？</h2>
              <p className="text-sm text-neutral-500 mb-6">选择一个最主要的部位</p>
              <div className="grid grid-cols-5 gap-3">
                {bodyParts.map((bp) => (
                  <button key={bp.id} onClick={() => store.setBodyPart(bp.id)} className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${store.bodyPartId === bp.id ? 'border-primary bg-primary/5' : 'border-neutral-200 hover:border-primary/50'}`}>
                    <div className="text-2xl">{bodyPartEmojis[bp.id]}</div>
                    <span className={`text-xs font-medium ${store.bodyPartId === bp.id ? 'text-primary' : 'text-neutral-600'}`}>{bp.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {store.step === 1 && (
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">请详细描述您的症状</h2>
                  <p className="text-sm text-neutral-500">越详细，AI 诊断越精准。可点击下方提示快速补充</p>
                </div>
                <button onClick={handleAIGenerate} disabled={aiGenerating} className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors disabled:opacity-50">
                  <Wand2 className={`w-4 h-4 ${aiGenerating ? 'animate-spin' : ''}`} />
                  {aiGenerating ? '生成中…' : 'AI 帮我描述'}
                </button>
              </div>
              <textarea value={store.description} onChange={(e) => store.setDescription(e.target.value)} rows={5} placeholder="请尽可能详细地描述您的不适…" className="input-base resize-none" />
              <div className="flex justify-between mt-2 text-xs text-neutral-400"><span>建议至少 5 个字</span><span>{store.description.length} 字</span></div>

              {/* AI 症状提示：根据所选部位推荐相关症状关键词 */}
              {symptomHints.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-neutral-600 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      AI 症状提示（{bodyParts.find(b => b.id === store.bodyPartId)?.name}相关）
                    </p>
                    <button onClick={() => setHintSeed(s => s + 1)} className="text-xs text-neutral-400 hover:text-primary transition-colors inline-flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" />换一批
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {symptomHints.map((h) => {
                      const active = store.description.includes(h.text);
                      return (
                        <button key={h.text} onClick={() => appendToDescription(h.text)}
                          title={`常见于：${h.category}`}
                          className={`tag text-xs !py-1 !px-2 ${active ? 'tag-active' : 'tag-default'}`}>
                          {active ? '✓ ' : '+ '}{h.text}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-neutral-600">快速描述（点击追加到上面）</p>
                  <span className="text-xs text-neutral-400">共 {descriptorGroups.reduce((n, g) => n + g.items.length, 0) + quickLocationTags.length} 个可选</span>
                </div>
                {descriptorGroups.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs text-neutral-400 mb-2">{group.category}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((t) => {
                        const active = store.description.includes(t);
                        return (
                          <button key={t} onClick={() => appendToDescription(t)}
                            className={`tag text-xs !py-1 !px-2 ${active ? 'tag-active' : 'tag-default'}`}>{active ? '✓ ' : '+ '}{t}</button>
                        );
                      })}
                    </div>
                  </div>
                ))}
                <div>
                  <p className="text-xs text-neutral-400 mb-2">部位特征</p>
                  <div className="flex flex-wrap gap-2">
                    {quickLocationTags.map((t) => {
                      const active = store.description.includes(t);
                      return (
                        <button key={t} onClick={() => appendToDescription(t)}
                          className={`tag text-xs !py-1 !px-2 ${active ? 'tag-active' : 'tag-default'}`}>{active ? '✓ ' : '+ '}{t}</button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
          {store.step === 2 && (
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">是否伴有以下症状？</h2>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-neutral-500">可多选，按系统分类，没有则跳过</p>
                <div className="flex items-center gap-3 text-xs">
                  <span className={store.companionIds.length ? 'text-primary font-medium' : 'text-neutral-400'}>已选 {store.companionIds.length} 项</span>
                  {store.companionIds.length > 0 && (
                    <button onClick={() => store.clearCompanions()} className="text-neutral-400 hover:text-warning transition-colors">清空</button>
                  )}
                </div>
              </div>
              <div className="space-y-5">
                {companionCategories.map((cat) => {
                  const items = companionSymptoms.filter((s) => s.category === cat);
                  const selectedInCat = items.filter((s) => store.companionIds.includes(s.id)).length;
                  return (
                    <div key={cat}>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-semibold text-neutral-600">{cat}</p>
                        <span className="text-[10px] text-neutral-400">{items.length} 项</span>
                        {selectedInCat > 0 && <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">已选 {selectedInCat}</span>}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((cs) => (
                          <button key={cs.id} onClick={() => store.toggleCompanion(cs.id)}
                            className={`tag ${store.companionIds.includes(cs.id) ? 'tag-active' : 'tag-default'}`}>{cs.name}</button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {store.step === 3 && (
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">症状持续多长时间了？</h2>
              <p className="text-sm text-neutral-500 mb-6">选择最接近的时长</p>
              <div className="space-y-3">
                {durationOptions.map((opt) => (
                  <button key={opt.id} onClick={() => store.setDuration(opt.value)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${store.duration === opt.value ? 'border-primary bg-primary/5' : 'border-neutral-200 hover:border-primary/50'}`}>
                    <span className={`font-medium ${store.duration === opt.value ? 'text-primary' : 'text-neutral-700'}`}>{opt.label}</span>
                    <ChevronRight className={`w-5 h-5 ${store.duration === opt.value ? 'text-primary' : 'text-neutral-400'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {store.step === 4 && (
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-neutral-900 mb-2">您的症状严重程度如何？</h2>
              <p className="text-sm text-neutral-500 mb-6">选择最符合您感受的程度</p>
              <div className="space-y-3">
                {severityOptions.map((opt) => {
                  const colors = { mild: 'bg-accent/10 text-accent-dark border-accent/30', moderate: 'bg-caution/soft text-neutral-800 border-caution/50', severe: 'bg-warning/soft text-warning border-warning/30' };
                  const sel = { mild: 'border-accent bg-accent/10 text-accent-dark', moderate: 'border-caution bg-caution/soft text-neutral-900', severe: 'border-warning bg-warning/10 text-warning' };
                  return (
                    <button key={opt.id} onClick={() => store.setSeverity(opt.value)} className={`w-full p-4 rounded-xl border-2 transition-all text-left ${store.severity === opt.value ? sel[opt.id as keyof typeof sel] : colors[opt.id as keyof typeof colors]}`}>
                      <span className="font-semibold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-warning/soft border border-warning/20 text-sm">
                <p className="font-medium text-warning mb-1">⚠️ 重要提醒</p>
                <p className="text-xs text-neutral-600">如有生命危险或紧急情况（胸痛、呼吸困难、意识不清、大出血），请立即拨打 120！</p>
              </div>
            </div>
          )}
          {error && <div className="mt-4 p-3 rounded-lg bg-warning/soft text-warning text-sm">{error}</div>}
        </div>
      )}

      {!submitting && (
        <div className="flex items-center justify-between mt-6">
          <button onClick={goBack} className="btn-ghost">
            <ArrowLeft className="w-4 h-4" />{store.step === 0 ? '返回' : '上一步'}
          </button>
          <button onClick={handleNext} disabled={!canProceed} className="btn-primary">
            {store.step === 4 ? (<><Sparkles className="w-4 h-4" />生成处理意见</>) : (<>下一步<ArrowRight className="w-4 h-4" /></>)}
          </button>
        </div>
      )}
    </div>
  );
}
