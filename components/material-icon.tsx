import type { CSSProperties } from 'react';

type MaterialIconName =
  | 'arrow_forward'
  | 'auto_awesome'
  | 'check'
  | 'check_circle'
  | 'close'
  | 'colorize'
  | 'dark_mode'
  | 'design_services'
  | 'desktop_windows'
  | 'download'
  | 'headphones'
  | 'home'
  | 'hourglass_top'
  | 'image_search'
  | 'library_music'
  | 'light_mode'
  | 'lyrics'
  | 'menu'
  | 'music_note'
  | 'palette'
  | 'person'
  | 'queue_music'
  | 'radio'
  | 'restart_alt'
  | 'smartphone'
  | 'tablet'
  | 'timeline'
  | 'timer'
  | 'view_carousel';

type MaterialIconStyle = CSSProperties & { '--md-icon-size': string };

export default function MaterialIcon({ name, size = 24, className = '', slot }: { name: MaterialIconName; size?: number; className?: string; slot?: string }) {
  return (
    <md-icon
      className={className}
      slot={slot}
      style={{ '--md-icon-size': `${size}px` } as MaterialIconStyle}
      aria-hidden="true"
    >
      {name}
    </md-icon>
  );
}
