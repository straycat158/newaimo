import {
  Hct,
  MaterialDynamicColors,
  SchemeContent,
  SchemeExpressive,
  SchemeFidelity,
  SchemeNeutral,
  SchemeTonalSpot,
  SchemeVibrant,
  argbFromHex,
  hexFromArgb,
  sourceColorFromImage,
  type DynamicScheme,
} from '@material/material-color-utilities';

export const SEED_PRESETS = [
  { hex: '#6750a4', label: '默认紫' },
  { hex: '#0b6bcb', label: '深海蓝' },
  { hex: '#00897b', label: '薄荷绿' },
  { hex: '#b3261e', label: '热力红' },
  { hex: '#e8710a', label: '落日橙' },
  { hex: '#8e4ec6', label: '霓虹紫' },
  { hex: '#4b5563', label: '石墨灰' },
] as const;

export const SCHEME_STYLES = [
  { id: 'tonalSpot', label: '标准' },
  { id: 'vibrant', label: '鲜艳' },
  { id: 'expressive', label: '张扬' },
  { id: 'content', label: '内容' },
  { id: 'neutral', label: '柔和' },
  { id: 'fidelity', label: '忠实' },
] as const;

export type SchemeStyle = (typeof SCHEME_STYLES)[number]['id'];

export const DEFAULT_SEED = SEED_PRESETS[0].hex;
export const DEFAULT_STYLE: SchemeStyle = 'tonalSpot';

/** M3 系统颜色角色，键名与 MaterialDynamicColors 的静态成员一致。 */
const COLOR_ROLES = [
  'primary',
  'onPrimary',
  'primaryContainer',
  'onPrimaryContainer',
  'secondary',
  'onSecondary',
  'secondaryContainer',
  'onSecondaryContainer',
  'tertiary',
  'onTertiary',
  'tertiaryContainer',
  'onTertiaryContainer',
  'error',
  'onError',
  'errorContainer',
  'onErrorContainer',
  'background',
  'onBackground',
  'surface',
  'onSurface',
  'surfaceVariant',
  'onSurfaceVariant',
  'surfaceDim',
  'surfaceBright',
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'outline',
  'outlineVariant',
  'inverseSurface',
  'inverseOnSurface',
  'inversePrimary',
  'shadow',
  'scrim',
  'surfaceTint',
] as const;

export type ColorTokens = Record<string, string>;

function toKebabCase(role: string) {
  return role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function createScheme(seedHex: string, style: SchemeStyle, isDark: boolean): DynamicScheme {
  const sourceHct = Hct.fromInt(argbFromHex(seedHex));
  const contrastLevel = 0;

  switch (style) {
    case 'vibrant':
      return new SchemeVibrant(sourceHct, isDark, contrastLevel);
    case 'expressive':
      return new SchemeExpressive(sourceHct, isDark, contrastLevel);
    case 'content':
      return new SchemeContent(sourceHct, isDark, contrastLevel);
    case 'neutral':
      return new SchemeNeutral(sourceHct, isDark, contrastLevel);
    case 'fidelity':
      return new SchemeFidelity(sourceHct, isDark, contrastLevel);
    default:
      return new SchemeTonalSpot(sourceHct, isDark, contrastLevel);
  }
}

/** 生成一套 `--md-sys-color-*` 令牌（键为完整变量名，值为 hex）。 */
export function buildColorTokens(seedHex: string, style: SchemeStyle, isDark: boolean): ColorTokens {
  const scheme = createScheme(seedHex, style, isDark);
  const tokens: ColorTokens = {};

  COLOR_ROLES.forEach((role) => {
    const dynamicColor = MaterialDynamicColors[role];
    if (!dynamicColor) return;
    tokens[`--md-sys-color-${toKebabCase(role)}`] = hexFromArgb(dynamicColor.getArgb(scheme));
  });

  return tokens;
}

/** 恒定深色的一套令牌，供下载卡片等永远反相的区块使用。 */
export function buildInverseTokens(seedHex: string, style: SchemeStyle): ColorTokens {
  const darkTokens = buildColorTokens(seedHex, style, true);
  const tokens: ColorTokens = {};

  Object.entries(darkTokens).forEach(([name, value]) => {
    tokens[name.replace('--md-sys-color-', '--aimo-dark-')] = value;
  });

  return tokens;
}

export function normalizeHex(value: string | null | undefined) {
  if (!value) return null;
  const hex = value.trim().toLowerCase();
  return /^#[0-9a-f]{6}$/.test(hex) ? hex : null;
}

export function isSchemeStyle(value: string | null | undefined): value is SchemeStyle {
  return SCHEME_STYLES.some((item) => item.id === value);
}

/** 从图片中提取最适合做主题色的颜色（Material You 的取色算法）。 */
export async function seedFromImage(src: string) {
  const image = new Image();
  image.crossOrigin = 'anonymous';
  image.src = src;

  await (image.decode
    ? image.decode()
    : new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`无法加载图片：${src}`));
      }));

  return hexFromArgb(await sourceColorFromImage(image));
}
