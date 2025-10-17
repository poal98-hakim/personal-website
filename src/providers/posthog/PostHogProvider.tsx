'use client';
import { usePathname } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { env } from '../../../env';

export default function PostHogrovider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const key = env.POSTHOG_API_KEY;
  const host = env.POSTHOG_HOST || 'https://eu.i.posthog.com';

  useEffect(() => {
    // Tag all events from this site
    posthog.register({ site: 'portfolio' });
  }, []);

  useEffect(() => {
    if (pathname) {
      posthog.capture('$pageview', { $current_url: pathname });
    }
  }, [pathname]);

  if (!key) {
    return <>{children}</>;
  }

  return (
    <PostHogProvider
      apiKey={key}
      options={{
        api_host: host,
        autocapture: false,
        capture_pageview: true,
        capture_pageleave: true,
        persistence: 'memory', // disables cookies/localStorage
        disable_session_recording: true,
        property_blacklist: ['$ip'], // anonymize IPs
      }}
    >
      {children}
    </PostHogProvider>
  );
}
