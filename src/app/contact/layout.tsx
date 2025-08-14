import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Hakim Abdelcadir',
  description:
    'Get in touch with Hakim Abdelcadir. Connect via email or social media for collaboration opportunities and professional inquiries.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
