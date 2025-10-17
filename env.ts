const SITE_URL = process.env.EXPO_PUBLIC_SITE_URL || 'https://hakimabdelcadir.vercel.app';

// PostHog configuration: reads EXPO_PUBLIC_POSTHOG_* or NEXT_PUBLIC_POSTHOG_* variables
const POSTHOG_API_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ''; // set your key via env vars

const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com'; // default host

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

export const env = {
  SITE_URL,

  // PostHog credentials
  POSTHOG_API_KEY,
  POSTHOG_HOST,

  GITHUB_TOKEN,
};
