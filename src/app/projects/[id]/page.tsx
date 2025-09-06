import { ExternalLink } from '@/components';
import { formatDate } from '@/utils/date';
import { Badge, Box, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCode,
  IconExternalLink,
  IconWorld,
} from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JSX } from 'react';
import type { ExternalLinkVM } from './page.model';
import styles from './page.module.scss';
import { ProjectDetailPresenter } from './page.presenter';

// Revalidate every day to keep GitHub projects up-to-date
export const revalidate = 86400;

export async function generateStaticParams() {
  const presenter = new ProjectDetailPresenter();
  const projectIds = await presenter.getAllProjectIds();

  return projectIds.map((id) => ({
    id,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const presenter = new ProjectDetailPresenter();
  const resolvedParams = await params;
  const viewModel = await presenter.getViewModel(resolvedParams.id);

  if (viewModel.error) {
    notFound();
  }

  const getIconType = (type: ExternalLinkVM['type']): JSX.Element => {
    switch (type) {
      case 'linkedin':
        return <IconBrandLinkedin size={18} />;
      case 'github':
        return <IconBrandGithub size={18} />;
      case 'website':
      default:
        return <IconWorld size={18} />;
    }
  };

  return (
    <Box className={styles.projectDetailPage}>
      <Container size="lg">
        <Stack gap="xl">
          <Group className={styles.header}>
            <Button
              component={Link}
              href="/projects"
              variant="light"
              leftSection={<IconArrowLeft size={16} />}
              className={styles.backButton}
            >
              Back to Projects
            </Button>
          </Group>

          <Box className={styles.hero}>
            <Stack gap="md" align="center" ta="center">
              <Title order={1} size="3rem" className={styles.title}>
                {viewModel.title}
              </Title>
              <Text size="xl" c="dimmed" className={styles.subtitle}>
                {viewModel.subtitle}
              </Text>
              <Group gap="md" className={styles.metadata}>
                {viewModel.role && (
                  <Badge size="lg" variant="light" color="blue">
                    {viewModel.role}
                  </Badge>
                )}
                {viewModel.lastUpdated && (
                  <Text size="sm" c="dimmed">
                    Last updated: {formatDate(viewModel.lastUpdated)}
                  </Text>
                )}
              </Group>
            </Stack>
          </Box>

          <Box className={styles.content}>
            <Box component="section" className={styles.mainContent}>
              <Card className={styles.section}>
                <Stack gap="md">
                  <Title order={2} className={styles.sectionTitle}>
                    Project Overview
                  </Title>
                  <Stack gap="md">
                    <Text size="lg" className={styles.paragraph}>
                      {viewModel.shortDescription}
                    </Text>
                    {viewModel.longDescriptionParagraphs && (
                      <Stack gap="md">
                        {viewModel.longDescriptionParagraphs.map((paragraph, index) => (
                          <Text key={index} size="lg" className={styles.paragraph}>
                            {paragraph}
                          </Text>
                        ))}
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              </Card>

              {/* Achievements */}
              {viewModel.achievements && viewModel.achievements.length > 0 && (
                <Card className={styles.section}>
                  <Stack gap="md">
                    <Title order={2} className={styles.sectionTitle}>
                      Key Achievements
                    </Title>
                    <Stack gap="sm">
                      {viewModel.achievements.map((achievement, index) => (
                        <Group key={index} gap="sm" align="flex-start">
                          <Box className={styles.bulletPoint} />
                          <Text size="md">{achievement}</Text>
                        </Group>
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              )}
            </Box>

            <Box component="aside" className={styles.sidebar}>
              {/* Technologies */}
              <Card className={styles.sidebarCard}>
                <Stack gap="md">
                  <Title order={3} size="lg">
                    <Group gap="xs">
                      <IconCode size={20} />
                      Technologies
                    </Group>
                  </Title>
                  <Group gap="xs">
                    {viewModel.tags.map((tech) => (
                      <Badge key={tech} variant="outline" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </Card>

              {/* External Links */}
              {viewModel.externalLinks && viewModel.externalLinks.length > 0 && (
                <Card className={styles.sidebarCard}>
                  <Stack gap="md">
                    <Title order={3} size="lg">
                      Links
                    </Title>
                    <Stack gap="sm">
                      {viewModel.externalLinks.map((link, index) => (
                        <ExternalLink
                          key={index}
                          href={link.url}
                          label={link.label}
                          className={styles.externalLink}
                        >
                          <Group gap="sm">
                            {getIconType(link.type)}
                            <Text>{link.label}</Text>
                            <IconExternalLink size={14} />
                          </Group>
                        </ExternalLink>
                      ))}
                    </Stack>
                  </Stack>
                </Card>
              )}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
