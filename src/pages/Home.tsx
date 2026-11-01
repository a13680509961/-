import { Link } from 'react-router-dom';
import { Heart, Brain, Stethoscope, BookOpen, Clock, ClipboardList, ArrowRight, Sparkles, Zap, FileText, BookMarked } from 'lucide-react';
import { mockArticles } from '@/data/mockArticles';
import { bodyParts, bodyPartEmojis } from '@/data/bodyParts';
import { mockDiseases } from '@/data/mockDiseases';
import { clinicalScales } from '@/data/clinicalScales';
import { clinicalGuidelines } from '@/data/guidelines';

const features = [
  { icon: Stethoscope, title: '智能问诊', desc: '多维度症状采集，AI 辅助健康分析', color: 'bg-primary/10 text-primary', to: '/consult' },
  { icon: FileText, title: '医生处理意见', desc: '每种可能性都附带医生视角的详细处理方案', color: 'bg-accent/10 text-accent', to: '/consult' },
  { icon: ClipboardList, title: '临床量表', desc: 'PHQ-9、GAD-7 等国际通用评估量表在线测评', color: 'bg-warning/10 text-warning', to: '/scales' },
  { icon: BookMarked, title: '临床指南', desc: '权威诊疗指南与专家共识核心要点速览', color: 'bg-info/10 text-info', to: '/guidelines' },
  { icon: BookOpen, title: '健康知识库', desc: '精选科普文章，覆盖常见疾病与家庭护理', color: 'bg-info/soft text-info', to: '/knowledge' },
];

const stats = [
  { icon: Brain, value: `${mockDiseases.length} 种`, label: '常见病症' },
  { icon: ClipboardList, value: `${clinicalScales.length} 份`, label: '临床量表' },
  { icon: BookMarked, value: `${clinicalGuidelines.length} 部`, label: '临床指南' },
];

export default function Home() {
  return (
    <div className="animate-fadeIn">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                AI 辅助 · 医生级处理意见
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-neutral-900">
                让症状 <span className="text-primary italic">有迹可循</span><br />
                让处理 <span className="text-accent-dark italic">有据可依</span>
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                描述您的不适，AI 为您匹配可能的健康方向，并提供包含初步处理、检查建议、用药参考、治疗方案在内的完整医生处理意见。
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/consult" className="btn-primary text-base">
                  <Zap className="w-4 h-4" /> 开始智能问诊
                </Link>
                <Link to="/knowledge" className="btn-secondary text-base">浏览健康知识</Link>
              </div>
              <div className="flex gap-8 pt-6">
                {stats.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-primary">
                      <s.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display text-xl font-bold text-neutral-900">{s.value}</div>
                      <div className="text-xs text-neutral-500">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulseRing" />
                <div className="absolute inset-8 rounded-full bg-primary/8 animate-pulseRing" style={{ animationDelay: '0.6s' }} />
                <div className="absolute inset-16 rounded-full bg-primary/10 animate-pulseRing" style={{ animationDelay: '1.2s' }} />
                <div className="relative z-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent shadow-2xl shadow-primary/30 flex items-center justify-center">
                  <Heart className="w-20 h-20 text-white animate-heartbeat" fill="currentColor" />
                </div>
              </div>
              <div className="hidden lg:block absolute top-4 -left-6"><div className="px-3 py-1.5 rounded-full bg-white shadow-md border border-neutral-200 text-xs text-neutral-600">🫀 胸部</div></div>
              <div className="hidden lg:block absolute top-20 -right-4"><div className="px-3 py-1.5 rounded-full bg-white shadow-md border border-neutral-200 text-xs text-neutral-600">🧠 头部</div></div>
              <div className="hidden lg:block absolute bottom-10 -left-4"><div className="px-3 py-1.5 rounded-full bg-white shadow-md border border-neutral-200 text-xs text-neutral-600">🫃 腹部</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-3">如何帮助您</h2>
          <p className="text-neutral-500 max-w-xl mx-auto">三步快速了解身体，获得完整医生处理意见</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <Link key={f.title} to={f.to} className="card p-8 group block hover:-translate-y-1" style={{ animationDelay: `${idx*0.1}s` }}>
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mb-5`}><f.icon className="w-7 h-7" /></div>
              <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">{f.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4">{f.desc}</p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">了解更多 <ArrowRight className="w-4 h-4" /></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-neutral-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">选择不适部位</h2>
              <p className="text-neutral-500">快速定位，开启问诊</p>
            </div>
            <Link to="/consult" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">开始问诊 <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 sm:gap-4">
            {bodyParts.map((bp) => (
              <Link key={bp.id} to="/consult" className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neutral-100 group-hover:bg-primary/10 flex items-center justify-center text-2xl">
                  {bodyPartEmojis[bp.id]}
                </div>
                <span className="text-xs text-neutral-600 group-hover:text-primary font-medium">{bp.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">热门健康知识</h2>
            <p className="text-neutral-500">精选科普文章，守护您的日常健康</p>
          </div>
          <Link to="/knowledge" className="hidden sm:flex items-center gap-1 text-primary text-sm font-medium hover:gap-2 transition-all">更多文章 <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.slice(0, 3).map((article, idx) => (
            <Link key={article.slug} to={`/knowledge/${article.slug}`} className="card overflow-hidden group hover:-translate-y-1" style={{ animationDelay: `${idx*0.1}s` }}>
              <div className="h-32 relative overflow-hidden" style={{ backgroundColor: article.imageColor + '22' }}>
                <div className="absolute inset-0 opacity-60" style={{ background: `linear-gradient(135deg, ${article.imageColor}33 0%, transparent 60%)` }} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium text-white" style={{ backgroundColor: article.imageColor }}>{article.tag}</span>
                </div>
                <div className="absolute bottom-4 right-4"><BookOpen className="w-8 h-8 text-white/40" /></div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-3 text-xs text-neutral-500">
                  <span className="px-2 py-0.5 rounded bg-neutral-100">{article.category}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime} 分钟</span>
                </div>
                <h3 className="font-display text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-sm text-neutral-500 line-clamp-2">{article.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent-dark p-10 sm:p-14 text-white">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          </div>
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mb-2">身体不适？现在就开始问诊</h3>
              <p className="text-white/80 text-sm sm:text-base">2 分钟获得 AI 辅助的医生级处理意见参考</p>
            </div>
            <Link to="/consult" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 shadow-lg whitespace-nowrap">立即开始 <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
