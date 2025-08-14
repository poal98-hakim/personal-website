import {
  MantineProvider as BaseMantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core';
import type { MantineProviderProps } from './MantineProvider.model';

// Custom color palettes
const blue: MantineColorsTuple = [
  '#eff6ff',
  '#dbeafe',
  '#bfdbfe',
  '#93c5fd',
  '#60a5fa',
  '#3b82f6',
  '#2563eb',
  '#1d4ed8',
  '#1e40af',
  '#1e3a8a',
];

const gray: MantineColorsTuple = [
  '#f8fafc',
  '#e2e8f0',
  '#cbd5e1',
  '#94a3b8',
  '#64748b',
  '#475569',
  '#334155',
  '#1e293b',
  '#0f172a',
  '#020617',
];

const dark: MantineColorsTuple = [
  '#f8fafc',
  '#cbd5e1',
  '#94a3b8',
  '#64748b',
  '#475569',
  '#334155',
  '#1e293b',
  '#0f172a',
  '#020617',
  '#000000',
];

const theme = createTheme({
  colors: {
    blue,
    gray,
    dark,
  },
  primaryColor: 'blue',
  defaultRadius: 'md',
  fontFamily:
    'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontFamilyMonospace:
    'var(--font-jetbrains-mono), "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Source Code Pro", monospace',
  headings: {
    fontFamily:
      'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: '2.5rem', lineHeight: '1.2' },
      h2: { fontSize: '2rem', lineHeight: '1.3' },
      h3: { fontSize: '1.75rem', lineHeight: '1.4' },
      h4: { fontSize: '1.5rem', lineHeight: '1.4' },
      h5: { fontSize: '1.25rem', lineHeight: '1.5' },
      h6: { fontSize: '1rem', lineHeight: '1.5' },
    },
  },
  components: {
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'md',
        withBorder: true,
      },
    },
    Button: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        root: {
          fontWeight: '500',
        },
      },
    },
    ActionIcon: {
      defaultProps: {
        radius: 'md',
      },
    },
    Text: {
      styles: {
        root: {
          lineHeight: 1.6,
        },
      },
    },
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  breakpoints: {
    xs: '30em', // 480px
    sm: '48em', // 768px
    md: '64em', // 1024px
    lg: '74em', // 1184px
    xl: '90em', // 1440px
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  other: {
    // Custom transitions
    transitions: {
      theme: 'background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
    },
  },
});

export function MantineProvider({ children }: MantineProviderProps) {
  return (
    <BaseMantineProvider theme={theme} defaultColorScheme="auto">
      {children}
    </BaseMantineProvider>
  );
}
