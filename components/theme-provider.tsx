'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_SEED,
  DEFAULT_STYLE,
  buildColorTokens,
  buildInverseTokens,
  isSchemeStyle,
  normalizeHex,
  type SchemeStyle,
} from '@/lib/dynamic-color';

const MODE_KEY = 'aimo-theme';
const SEED_KEY = 'aimo-seed';
const STYLE_KEY = 'aimo-style';
const TOKENS_KEY = 'aimo-theme-tokens';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  mode: ThemeMode;
  seed: string;
  style: SchemeStyle;
  seedLabel: string;
  setMode: (mode: ThemeMode) => void;
  setSeed: (seed: string, label?: string) => void;
  setStyle: (style: SchemeStyle) => void;
  reset: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialState() {
  if (typeof window === 'undefined') {
    return { mode: 'light' as ThemeMode, seed: DEFAULT_SEED, style: DEFAULT_STYLE, seedLabel: '默认紫' };
  }

  try {
    const storedMode = localStorage.getItem(MODE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedStyle = localStorage.getItem(STYLE_KEY);

    return {
      mode: (storedMode === 'dark' || storedMode === 'light' ? storedMode : prefersDark ? 'dark' : 'light') as ThemeMode,
      seed: normalizeHex(localStorage.getItem(SEED_KEY)) ?? DEFAULT_SEED,
      style: isSchemeStyle(storedStyle) ? storedStyle : DEFAULT_STYLE,
      seedLabel: localStorage.getItem(`${SEED_KEY}-label`) ?? '自定义',
    };
  } catch {
    return { mode: 'light' as ThemeMode, seed: DEFAULT_SEED, style: DEFAULT_STYLE, seedLabel: '默认紫' };
  }
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(readInitialState);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = state.mode === 'dark';
    const tokens = {
      ...buildColorTokens(state.seed, state.style, isDark),
      ...buildInverseTokens(state.seed, state.style),
    };

    Object.entries(tokens).forEach(([name, value]) => root.style.setProperty(name, value));
    root.dataset.theme = state.mode;
    root.style.colorScheme = state.mode;

    try {
      localStorage.setItem(MODE_KEY, state.mode);
      localStorage.setItem(SEED_KEY, state.seed);
      localStorage.setItem(STYLE_KEY, state.style);
      localStorage.setItem(`${SEED_KEY}-label`, state.seedLabel);
      // 缓存已生成的令牌，供首屏脚本在渲染前直接套用，避免闪色。
      localStorage.setItem(TOKENS_KEY, JSON.stringify({ mode: state.mode, tokens }));
    } catch {
      // 隐私模式下无法写入时忽略，主题仍在当前会话生效。
    }
  }, [state]);

  const setMode = useCallback((mode: ThemeMode) => setState((prev) => ({ ...prev, mode })), []);
  const setStyle = useCallback((style: SchemeStyle) => setState((prev) => ({ ...prev, style })), []);
  const setSeed = useCallback((seed: string, label = '自定义') => {
    const hex = normalizeHex(seed);
    if (!hex) return;
    setState((prev) => ({ ...prev, seed: hex, seedLabel: label }));
  }, []);
  const reset = useCallback(
    () => setState((prev) => ({ ...prev, seed: DEFAULT_SEED, style: DEFAULT_STYLE, seedLabel: '默认紫' })),
    [],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({ ...state, setMode, setSeed, setStyle, reset }),
    [state, setMode, setSeed, setStyle, reset],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme 必须在 ThemeProvider 内使用');
  return context;
}
