'use client';

import { useEffect, useState } from 'react';
import MaterialIcon from '@/components/material-icon';

const navItems = [
  { id: 'hero', label: '首页', icon: 'home' as const },
  { id: 'features', label: '特性', icon: 'auto_awesome' as const },
  { id: 'screenshots', label: '界面', icon: 'view_carousel' as const },
  { id: 'design', label: '设计', icon: 'design_services' as const },
  { id: 'milestones', label: '历程', icon: 'timeline' as const },
  { id: 'download', label: '下载', icon: 'download' as const },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -68% 0px' },
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <>
      <nav className="material-nav-rail" aria-label="页面导航">
        {navItems.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            className={`material-nav-destination ${activeSection === id ? 'is-active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={label}
            aria-current={activeSection === id ? 'page' : undefined}
          >
            <md-ripple />
            <span className="material-nav-icon"><MaterialIcon name={icon} size={21} /></span>
            <span className="material-nav-label">{label}</span>
          </button>
        ))}
      </nav>

      <div className="material-mobile-nav">
        {isOpen && (
          <div className="material-mobile-sheet" role="menu">
            <md-elevation />
            {navItems.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                role="menuitem"
                className={`material-mobile-destination ${activeSection === id ? 'is-active' : ''}`}
                onClick={() => scrollTo(id)}
              >
                <md-ripple />
                <MaterialIcon name={icon} size={21} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}

        <md-fab
          variant="primary"
          aria-label={isOpen ? '关闭页面导航' : '打开页面导航'}
          onClick={() => setIsOpen((value) => !value)}
        >
          <MaterialIcon slot="icon" name={isOpen ? 'close' : 'menu'} size={24} />
        </md-fab>
      </div>

      {isOpen && <button className="material-scrim" aria-label="关闭页面导航" onClick={() => setIsOpen(false)} />}
    </>
  );
}
