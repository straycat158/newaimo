import type { HTMLAttributes, RefAttributes } from 'react';

type MaterialElementProps = HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement> & {
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top' | '';
  disabled?: boolean;
  'soft-disabled'?: boolean;
  'has-icon'?: boolean;
  'trailing-icon'?: boolean;
  elevated?: boolean;
  value?: number;
  max?: number;
  buffer?: number;
  indeterminate?: boolean;
  variant?: 'surface' | 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  lowered?: boolean;
  selected?: boolean;
  icons?: boolean;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'md-filled-button': MaterialElementProps;
      'md-filled-tonal-button': MaterialElementProps;
      'md-outlined-button': MaterialElementProps;
      'md-text-button': MaterialElementProps;
      'md-assist-chip': MaterialElementProps;
      'md-divider': MaterialElementProps;
      'md-elevation': MaterialElementProps;
      'md-fab': MaterialElementProps;
      'md-icon': MaterialElementProps;
      'md-icon-button': MaterialElementProps;
      'md-filled-tonal-icon-button': MaterialElementProps;
      'md-linear-progress': MaterialElementProps;
      'md-ripple': MaterialElementProps;
      'md-switch': MaterialElementProps;
    }
  }
}

export {};
