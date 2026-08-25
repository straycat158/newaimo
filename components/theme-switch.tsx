'use client';

import { useEffect, useRef } from 'react';
import MaterialIcon from '@/components/material-icon';

type MaterialSwitchElement = HTMLElement & { selected: boolean };

export default function ThemeSwitch() {
  const switchRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let disposed = false;
    let switchElement: MaterialSwitchElement | null = null;

    const handleChange = () => {
      if (!switchElement) return;
      const theme = switchElement.selected ? 'dark' : 'light';
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
      localStorage.setItem('aimo-theme', theme);
    };

    const initialize = async () => {
      await customElements.whenDefined('md-switch');
      if (disposed) return;
      switchElement = switchRef.current as MaterialSwitchElement | null;
      if (!switchElement) return;
      switchElement.selected = document.documentElement.dataset.theme === 'dark';
      switchElement.addEventListener('change', handleChange);
    };

    void initialize();

    return () => {
      disposed = true;
      switchElement?.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <div className="material-theme-control" title="切换亮色或暗色模式">
      <MaterialIcon name="light_mode" size={19} />
      <md-switch ref={switchRef} aria-label="切换亮色或暗色模式" />
      <MaterialIcon name="dark_mode" size={19} />
    </div>
  );
}
