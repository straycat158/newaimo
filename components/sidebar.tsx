'use client';

import { useState, useEffect } from 'react';
import { Home, Sparkles, Layers, PenTool, Milestone, Download, Menu, X } from 'lucide-react';

const navItems = [
  { id: 'hero', label: '首页', icon: Home },
  { id: 'features', label: '特性', icon: Sparkles },
  { id: 'screenshots', label: '界面', icon: Layers },
  { id: 'design', label: '设计', icon: PenTool },
  { id: 'milestones', label: '历程', icon: Milestone },
  { id: 'download', label: '下载', icon: Download },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 p-3 bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-zinc-200/50">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isActive ? 'bg-black text-white shadow-md scale-110' : 'text-zinc-500 hover:bg-zinc-100 hover:text-black'
              }`}
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
              <span className="absolute right-full mr-4 px-3 py-1.5 bg-black text-white text-sm font-medium rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                {label}
                <span className="absolute top-1/2 -right-1 -translate-y-1/2 border-4 border-transparent border-l-black"></span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile FAB & Menu */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <div className={`absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'}`}>
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-full shadow-xl border border-zinc-200/50 backdrop-blur-xl transition-all ${
                  isActive ? 'bg-black text-white' : 'bg-white/90 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <span className="font-medium text-sm whitespace-nowrap">{label}</span>
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
