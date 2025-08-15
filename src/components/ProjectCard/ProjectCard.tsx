import { formatDate } from '@/utils/date';
import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import type { ProjectCardProps } from './ProjectCard.model';
import styles from './ProjectCard.module.scss';

export function ProjectCard(props: ProjectCardProps) {
  const { project } = props;

  return (
    <Card
      className={styles.root}
      component={Link}
      href={`/projects/${project.id}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Stack gap="md">
        {/* Header */}
        <header className={styles.header}>
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs" style={{ flex: 1 }}>
              <Text component="h3" size="lg" fw={600} className={styles.title}>
                {project.title}
              </Text>
              <Text size="sm" c="dimmed" className={styles.description} lineClamp={3}>
                {project.description}
              </Text>
            </Stack>

            <IconArrowRight
              size={20}
              className={styles.arrowIcon}
              style={{ opacity: 0.6, transition: 'all 0.2s ease' }}
            />
          </Group>
        </header>

        {/* Tags */}
        {project.tags.length > 0 && (
          <Group gap="xs" className={styles.tagList}>
            {project.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="light" size="sm" className={styles.tag}>
                {tag}
              </Badge>
            ))}
            {project.tags.length > 4 && (
              <Badge variant="outline" size="sm" c="dimmed">
                +{project.tags.length - 4}
              </Badge>
            )}
          </Group>
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <Group justify="space-between" align="center">
            {project.lastUpdated && (
              <Text size="xs" c="dimmed">
                Updated {formatDate(project.lastUpdated)}
              </Text>
            )}
            <Text size="xs" c="blue" fw={500}>
              View Details
            </Text>
          </Group>
        </footer>
      </Stack>
    </Card>
  );
}
