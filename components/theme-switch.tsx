'use client';

import { useEffect, useRef } from 'react';
import MaterialIcon from '@/components/material-icon';
import { useTheme } from '@/components/theme-provider';

type MaterialSwitchElement = HTMLElement & { selected: boolean };

export default function ThemeSwitch() {
  const switchRef = useRef<HTMLElement | null>(null);
  const { mode, setMode } = useTheme();

  useEffect(() => {
    let disposed = false;
    let switchElement: MaterialSwitchElement | null = null;

    const handleChange = () => {
      if (!switchElement) return;
      setMode(switchElement.selected ? 'dark' : 'light');
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
  }, [setMode]);

  useEffect(() => {
    const switchElement = switchRef.current as MaterialSwitchElement | null;
    if (switchElement) switchElement.selected = mode === 'dark';
  }, [mode]);

  return (
    <div className="material-theme-control" title="切换亮色或暗色模式">
      <MaterialIcon name="light_mode" size={19} />
      <md-switch ref={switchRef} aria-label="切换亮色或暗色模式" />
      <MaterialIcon name="dark_mode" size={19} />
    </div>
  );
}
