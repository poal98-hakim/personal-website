'use client';
import { Anchor, type AnchorProps } from '@mantine/core';
import { addOutboundTracking } from '@/utils/posthog';

interface ExternalLinkProps extends Omit<AnchorProps, 'href' | 'target' | 'rel'> {
  href: string;
  label?: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, label, children, ...props }: ExternalLinkProps) {
  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={addOutboundTracking(href, label)}
      {...props}
    >
      {children}
    </Anchor>
  );
}
