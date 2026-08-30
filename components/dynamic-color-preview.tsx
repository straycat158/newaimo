'use client';

import { useMemo } from 'react';
import MaterialIcon from '@/components/material-icon';
import { useTheme } from '@/components/theme-provider';
import { SCHEME_STYLES, SEED_PRESETS, buildColorTokens } from '@/lib/dynamic-color';

const ROLE_GROUPS = [
  {
    title: '主色',
    roles: [
      { token: 'primary', on: 'on-primary', label: 'Primary' },
      { token: 'primary-container', on: 'on-primary-container', label: 'Primary Container' },
    ],
  },
  {
    title: '辅助色',
    roles: [
      { token: 'secondary-container', on: 'on-secondary-container', label: 'Secondary Container' },
      { token: 'tertiary-container', on: 'on-tertiary-container', label: 'Tertiary Container' },
    ],
  },
  {
    title: '表面',
    roles: [
      { token: 'surface-container-low', on: 'on-surface', label: 'Surface Low' },
      { token: 'surface-container-highest', on: 'on-surface-variant', label: 'Surface Highest' },
    ],
  },
];

export default function DynamicColorPreview() {
  const { seed, style, seedLabel, mode, setSeed, setStyle } = useTheme();

  const tokens = useMemo(() => buildColorTokens(seed, style, mode === 'dark'), [seed, style, mode]);

  return (
    <div className="material-color-lab material-surface">
      <md-elevation />

      <div className="material-color-lab-head">
        <div>
          <span className="material-overline">DYNAMIC COLOR</span>
          <h3>换一个主题色，整站跟着变。</h3>
          <p>当前种子色 {seedLabel}，风格「{SCHEME_STYLES.find((item) => item.id === style)?.label}」。</p>
        </div>
        <span className="material-color-lab-seed" style={{ background: seed }} aria-hidden="true">
          <MaterialIcon name="palette" size={22} />
        </span>
      </div>

      <div className="material-color-lab-swatches">
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

      <div className="material-color-lab-styles">
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

      <div className="material-role-grid">
        {ROLE_GROUPS.map((group) => (
          <div key={group.title} className="material-role-group">
            <span className="material-palette-label">{group.title}</span>
            {group.roles.map((role) => {
              const background = tokens[`--md-sys-color-${role.token}`];
              const foreground = tokens[`--md-sys-color-${role.on}`];
              return (
                <div key={role.token} className="material-role-chip" style={{ background, color: foreground }}>
                  <strong>{role.label}</strong>
                  <span>{background?.toUpperCase()}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
