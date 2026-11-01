import { Heart, AlertTriangle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" fill="currentColor" />
              </div>
              <span className="font-display text-lg font-bold text-neutral-900">诊知</span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              AI 智能症状辅助分析平台，基于循证医学知识，为您提供便捷的健康评估参考与医生处理意见。
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 text-warning mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-semibold">重要声明</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              本平台 AI 分析结果仅供参考，不能替代专业医生诊断。所有处理意见基于通用医学知识，具体诊疗请遵医嘱。紧急情况请立即拨打 120。
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-neutral-900 mb-3">紧急联系</h4>
            <div className="space-y-2 text-sm">
              <p className="text-neutral-600"><span className="text-neutral-400">急救电话：</span><span className="font-medium text-warning">120</span></p>
              <p className="text-neutral-600"><span className="text-neutral-400">心理援助：</span><span className="font-medium text-primary">400-161-9995</span></p>
              <p className="text-neutral-600"><span className="text-neutral-400">报警电话：</span><span className="font-medium text-warning">110</span></p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-200/60 text-center text-xs text-neutral-400">
          © {new Date().getFullYear()} 诊知 · All rights reserved. 基于 React + Vite + TailwindCSS 构建
        </div>
      </div>
    </footer>
  );
}
