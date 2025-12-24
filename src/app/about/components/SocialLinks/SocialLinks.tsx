import { Group, Stack, Text } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconBrandX,
} from '@tabler/icons-react';
import { ExternalLink } from '@/components';
import styles from './SocialLinks.module.scss';
import type { SocialLinksProps } from './SocialLinks.model';

const iconMapping = {
  github: IconBrandGithub,
  linkedin: IconBrandLinkedin,
  stackoverflow: IconBrandStackoverflow,
  x: IconBrandX,
};

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  return (
    <Stack gap="md">
      {socialLinks.map((social) => {
        const IconComponent =
          iconMapping[social.iconName as keyof typeof iconMapping] || IconBrandGithub;
        return (
          <ExternalLink
            key={social.name}
            href={social.href}
            label={social.name}
            className={styles.socialLink}
          >
            <Group gap="sm">
              <IconComponent size={24} />
              <Stack gap={0}>
                <Text fw={500}>{social.name}</Text>
                <Text size="sm" c="dimmed">
                  {social.description}
                </Text>
              </Stack>
            </Group>
          </ExternalLink>
        );
      })}
    </Stack>
  );
}
