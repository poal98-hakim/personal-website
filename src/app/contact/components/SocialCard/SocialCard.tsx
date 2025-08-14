import { Card, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconExternalLink } from '@tabler/icons-react';
import styles from '../../page.module.scss';
import { socialIconMapping } from './SocialCard.constants';
import type { SocialCardProps } from './SocialCard.model';

export function SocialCard({ social }: SocialCardProps) {
  const IconComponent =
    socialIconMapping[social.iconName as keyof typeof socialIconMapping] ||
    socialIconMapping.github;

  return (
    <Card
      className={styles.socialCard}
      component="a"
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Stack gap="md" className={styles.socialCardContent}>
        <Group gap="sm" className={styles.socialCardHeader}>
          <ThemeIcon size={48} radius="md" variant="light" color={social.color}>
            <IconComponent size={24} />
          </ThemeIcon>
          <Stack gap={0}>
            <Title order={3} size="lg">
              {social.name}
            </Title>
            <Text size="xs" c="dimmed" className={styles.socialPlatform}>
              {social.platform}
            </Text>
          </Stack>
        </Group>

        <Text size="sm" c="dimmed" className={styles.socialCardDescription}>
          {social.description}
        </Text>

        <Group justify="space-between" className={styles.socialCardFooter}>
          <Text size="xs" fw={500} c="blue">
            {social.stats}
          </Text>
          <IconExternalLink size={14} className={styles.externalIcon} />
        </Group>
      </Stack>
    </Card>
  );
}
