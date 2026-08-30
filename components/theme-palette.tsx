'use client';

import { useEffect, useRef, useState } from 'react';
import MaterialIcon from '@/components/material-icon';
import { useTheme } from '@/components/theme-provider';
import { SCHEME_STYLES, SEED_PRESETS, seedFromImage } from '@/lib/dynamic-color';

const IMAGE_SOURCES = [
  { src: '/screenshots/screen-1.png', label: '播放' },
  { src: '/screenshots/screen-2.png', label: '发现' },
  { src: '/screenshots/screen-3.png', label: '收藏' },
  { src: '/screenshots/screen-4.png', label: '歌词' },
];

export default function ThemePalette() {
  const { seed, style, seedLabel, setSeed, setStyle, reset } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSrc, setPendingSrc] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const extractFromImage = async (src: string, label: string) => {
    setPendingSrc(src);
    try {
      const hex = await seedFromImage(src);
      setSeed(hex, `${label}界面`);
    } catch {
      // 图片取色失败时保留当前主题色。
    } finally {
      setPendingSrc(null);
    }
  };

  return (
    <div className="material-palette" ref={panelRef}>
      <md-icon-button
        aria-label="调整主题配色"
        aria-expanded={isOpen}
        title="动态取色"
        onClick={() => setIsOpen((value) => !value)}
      >
        <MaterialIcon name="palette" size={22} />
      </md-icon-button>

      {isOpen && (
        <div className="material-palette-panel material-surface" role="dialog" aria-label="动态取色">
          <md-elevation />

          <div className="material-palette-header">
            <div>
              <span className="material-overline">DYNAMIC COLOR</span>
              <strong>{seedLabel}</strong>
            </div>
            <span className="material-palette-seed" style={{ background: seed }} aria-hidden="true" />
          </div>

          <p className="material-palette-hint">选一个主题色，整站的表面、容器与文字会按 Material 3 规则重新生成。</p>

          <div className="material-palette-swatches">
            {SEED_PRESETS.map((preset) => (
              <button
                key={preset.hex}
                type="button"
                className={`material-swatch ${seed === preset.hex ? 'is-active' : ''}`}
                style={{ background: preset.hex }}
                title={preset.label}
                aria-label={`使用${preset.label}`}
                aria-pressed={seed === preset.hex}
                onClick={() => setSeed(preset.hex, preset.label)}
              >
                {seed === preset.hex && <MaterialIcon name="check" size={17} />}
              </button>
            ))}

            <label className="material-swatch material-swatch-custom" title="自定义颜色">
              <MaterialIcon name="colorize" size={18} />
              <input type="color" value={seed} onChange={(event) => setSeed(event.target.value, '自定义')} aria-label="自定义主题色" />
            </label>
          </div>

          <span className="material-palette-label">从界面截图取色</span>
          <div className="material-palette-images">
            {IMAGE_SOURCES.map((item) => (
              <button
                key={item.src}
                type="button"
                className="material-palette-image-button"
                disabled={pendingSrc !== null}
                onClick={() => void extractFromImage(item.src, item.label)}
              >
                <md-ripple />
                <MaterialIcon name={pendingSrc === item.src ? 'hourglass_top' : 'image_search'} size={17} />
                {item.label}
              </button>
            ))}
          </div>

          <span className="material-palette-label">配色风格</span>
          <div className="material-palette-styles">
            {SCHEME_STYLES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`material-style-chip ${style === item.id ? 'is-active' : ''}`}
                aria-pressed={style === item.id}
                onClick={() => setStyle(item.id)}
              >
                <md-ripple />
                {item.label}
              </button>
            ))}
          </div>

          <md-divider />
          <div className="material-palette-footer">
            <md-text-button onClick={reset}>
              <MaterialIcon name="restart_alt" size={18} slot="icon" />
              恢复默认
            </md-text-button>
            <span>{seed.toUpperCase()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
