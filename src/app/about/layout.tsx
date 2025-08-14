import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Hakim Abdelcadir',
  description:
    'Learn more about Hakim Abdelcadir, Senior Frontend Engineer with expertise in React, TypeScript, and modern web development technologies.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
