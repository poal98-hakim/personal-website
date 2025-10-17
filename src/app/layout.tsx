import { Header } from '@/components';
import { MantineProvider, PostHogProvider } from '@/providers';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import '@/styles/globals.scss';
import '@mantine/core/styles.css';
import { env } from '../../env';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  verification: {
    google: 'bghE5pv-QSn7G1Zb_BYZWVZZfxuREtMJ9B22GnxQezY',
  },
  title: 'Hakim Abdelcadir - My Portfolio',
  description:
    'Personal portfolio of Hakim Abdelcadir, Senior Frontend Engineer specializing in React, TypeScript, and modern web development.',
  keywords: [
    'Hakim Abdelcadir',
    'Frontend Engineer',
    'React',
    'TypeScript',
    'Web Development',
    'London',
  ],
  authors: [{ name: 'Hakim Abdelcadir' }],
  creator: 'Hakim Abdelcadir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: env.SITE_URL,
    title: 'Hakim Abdelcadir - Senior Frontend Engineer',
    description:
      'Personal portfolio of Hakim Abdelcadir, Senior Frontend Engineer specializing in React, TypeScript, and modern web development.',
    siteName: 'Hakim Abdelcadir Portfolio',
    images: [
      {
        url: `${env.SITE_URL}/profile-photo.jpg`,
        width: 800,
        height: 600,
        alt: 'Hakim Abdelcadir - Senior Frontend Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@hakim98bologna',
    title: 'Hakim Abdelcadir - Senior Frontend Engineer',
    description:
      'Personal portfolio of Hakim Abdelcadir, Senior Frontend Engineer specializing in React, TypeScript, and modern web development.',
    images: [`${env.SITE_URL}/profile-photo.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <PostHogProvider>
          <MantineProvider>
            <Header />
            <main className="container">{children}</main>
          </MantineProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
