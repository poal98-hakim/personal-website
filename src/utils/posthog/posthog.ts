import posthog from 'posthog-js';

export function capturePageview(url: string) {
  posthog.capture('$pageview', { $current_url: url });
}

export function trackOutboundClick(label: string, url: string) {
  posthog.capture('outbound_click', { label, url });
}

// Helper function to add tracking to external links
export function addOutboundTracking(href: string, label?: string) {
  return () => trackOutboundClick(label || href, href);
}
