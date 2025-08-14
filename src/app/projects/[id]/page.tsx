import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconBrandLinkedin,
  IconCode,
  IconExternalLink,
  IconWorld,
} from '@tabler/icons-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import styles from './page.module.scss';
import { ProjectDetailPresenter } from './page.presenter';

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const presenter = new ProjectDetailPresenter();
  const resolvedParams = React.use(params);
  const viewModel = presenter.getViewModel(resolvedParams.id);

  if (viewModel.error) {
    notFound();
  }

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
                        <Anchor
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.externalLink}
                        >
                          <Group gap="sm">
                            {link.type === 'linkedin' ? (
                              <IconBrandLinkedin size={18} />
                            ) : (
                              <IconWorld size={18} />
                            )}
                            <Text>{link.label}</Text>
                            <IconExternalLink size={14} />
                          </Group>
                        </Anchor>
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
