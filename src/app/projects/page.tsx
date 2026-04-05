import { Alert, Badge, Box, Container, Divider, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconAlertCircle,
  IconBrandGithub,
  IconBriefcase,
  IconCode,
  IconRocket,
} from '@tabler/icons-react';
import { ProjectsCarousel } from './components';
import styles from './page.module.scss';
import { ProjectsPresenter } from './page.presenter';

// Revalidate every day to keep GitHub projects up-to-date
export const revalidate = 86400;

export default async function ProjectsPage() {
  const presenter = new ProjectsPresenter();
  const viewModel = await presenter.getViewModel();
  const { professional, personal } = viewModel;

  return (
    <Box className={styles.projectsPage}>
      <Container size="lg">
        <Box component="section" className={styles.heroSection}>
          <Stack gap="xl" align="center">
            <Group gap="md" className={styles.heroIcon}>
              <IconCode size={48} className={styles.codeIcon} />
              <IconRocket size={48} className={styles.rocketIcon} />
            </Group>

            <Stack gap="md" align="center" className={styles.heroContent}>
              <Title order={1} size="3.5rem" className={styles.heroTitle}>
                My Projects
              </Title>

              <Text size="xl" className={styles.heroSubtitle} ta="center">
                A curated collection of professional and personal projects showcasing modern web
                development
              </Text>

              <Text size="lg" c="dimmed" className={styles.heroDescription} ta="center">
                From commercial applications to personal contributions, each project represents
                innovation, problem-solving, and technical excellence
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Container>

      <Container size="lg" className={styles.contentSection}>
        <Stack gap="xl">
          <Box component="header" className={styles.sectionHeader}>
            <Group gap="md" align="center">
              <IconBriefcase size={32} className={styles.sectionIcon} />
              <Box>
                <Title order={2} className={styles.sectionTitle}>
                  Professional Projects
                </Title>
                <Text c="dimmed" className={styles.sectionSubtitle}>
                  Commercial applications I&apos;ve worked on
                </Text>
              </Box>
              <Badge variant="light" color="blue" size="lg">
                {professional.count} projects
              </Badge>
            </Group>
          </Box>

          {professional.error && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Unable to Load Professional Projects"
              color="red"
              className={styles.errorAlert}
            >
              <Text>{professional.error}</Text>
            </Alert>
          )}

          {!professional.error && professional.projects.length > 0 && (
            <ProjectsCarousel projects={professional.projects} ariaLabel="professional projects" />
          )}

          <Divider my="xl" size="xs" className={styles.sectionDivider} />

          <Box component="header" className={styles.sectionHeader}>
            <Group gap="md" align="center">
              <IconBrandGithub size={32} className={styles.sectionIcon} />
              <Box>
                <Title order={2} className={styles.sectionTitle}>
                  Personal Projects
                </Title>
                <Text c="dimmed" className={styles.sectionSubtitle}>
                  Personal projects from GitHub
                </Text>
              </Box>
              <Badge variant="light" color="green" size="lg">
                {personal.count} projects
              </Badge>
            </Group>
          </Box>

          {personal.error && (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="Unable to Load Personal Projects"
              color="orange"
              className={styles.errorAlert}
            >
              <Text>{personal.error}</Text>
            </Alert>
          )}

          {!personal.error && personal.projects.length === 0 && (
            <Box className={styles.emptyState}>
              <Stack gap="lg" align="center">
                <IconBrandGithub size={64} className={styles.emptyIcon} />
                <Stack gap="md" align="center">
                  <Title order={3} size="1.5rem">
                    No Personal Projects Found
                  </Title>
                  <Text size="md" c="dimmed" ta="center">
                    Personal projects are currently private or in development. Check back soon!
                  </Text>
                </Stack>
              </Stack>
            </Box>
          )}

          {!personal.error && personal.projects.length > 0 && (
            <ProjectsCarousel
              projects={personal.projects}
              ariaLabel="personal projects"
              delayOffset={professional.projects.length}
            />
          )}
        </Stack>
      </Container>
    </Box>
  );
}
