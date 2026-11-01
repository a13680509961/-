import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';

const navItems = [
  { to: '/', label: '首页' },
  { to: '/consult', label: '智能问诊' },
  { to: '/scales', label: '临床量表' },
  { to: '/guidelines', label: '临床指南' },
  { to: '/knowledge', label: '健康知识' },
  { to: '/history', label: '问诊历史' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="relative w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Heart className="w-5 h-5 text-white animate-heartbeat" fill="currentColor" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-lg font-bold text-neutral-900">诊知</span>
              <span className="text-[10px] text-neutral-500 tracking-wider">ZHEN ZHI</span>
            </div>
          </NavLink>
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to} to={item.to} end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive ? 'text-primary bg-primary/10' : 'text-neutral-600 hover:text-primary hover:bg-primary/5'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden md:block">
            <NavLink to="/consult" className="btn-primary !py-2 !px-5 text-sm">开始问诊</NavLink>
          </div>
          <button className="md:hidden p-2 rounded-lg hover:bg-neutral-100" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-neutral-200/60 bg-white">
          <nav className="px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'text-primary bg-primary/10' : 'text-neutral-600'}`
                }>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/consult" onClick={() => setOpen(false)} className="btn-primary mt-2">开始问诊</NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
