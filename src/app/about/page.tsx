import { Avatar, Box, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { IconBriefcase, IconMapPin } from '@tabler/icons-react';
import { SocialLinks, TechScroller } from './components';
import styles from './page.module.scss';
import { AboutPresenter } from './page.presenter';

export default function AboutPage() {
  const presenter = new AboutPresenter();
  const viewModel = presenter.getViewModel();
  const { personalInfo, technologies, socialLinks, experience } = viewModel;
  return (
    <Box className={styles.aboutPage}>
      <Container size="lg">
        <Box component="section" className={styles.heroSection}>
          <Stack gap="xl">
            <Group justify="center" gap="xl" className={styles.heroContent}>
              <Avatar
                src={personalInfo.avatarSrc}
                alt={personalInfo.name}
                size={180}
                radius="xl"
                className={styles.avatar}
              />

              <Stack gap="md" className={styles.heroText}>
                <Title order={1} size="3rem" className={styles.name}>
                  {personalInfo.name}
                </Title>

                <Group gap="md" className={styles.roleLocation}>
                  <Group gap="xs">
                    <IconBriefcase size={20} />
                    <Text size="lg" fw={500} c="blue">
                      {personalInfo.role}
                    </Text>
                  </Group>
                  <Group gap="xs">
                    <IconMapPin size={20} />
                    <Text size="lg" c="dimmed">
                      {personalInfo.location}
                    </Text>
                  </Group>
                </Group>

                <Text size="lg" className={styles.tagline}>
                  {personalInfo.tagline}
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Box>
      </Container>

      {/* Tech Skills Scroller - Full Width */}
      <TechScroller technologies={technologies} />

      {/* About Content */}
      <Container size="lg" className={styles.content}>
        <Stack gap="xl">
          {/* Bio Section */}
          <Card component="section" className={styles.bioCard}>
            <Stack gap="lg">
              <Title order={2} className={styles.sectionTitle}>
                About Me
              </Title>

              <Stack gap="md" className={styles.bioText}>
                {personalInfo.bio.map((paragraph, index) => (
                  <Text key={index} size="lg">
                    {paragraph}
                  </Text>
                ))}
              </Stack>
            </Stack>
          </Card>

          {/* Experience & Connect Section */}
          <Group align="stretch" gap="lg" className={styles.bottomCards}>
            {/* Experience Card */}
            <Card component="section" className={styles.experienceCard} flex={1}>
              <Stack gap="lg">
                <Title order={3} size="xl">
                  Current Role
                </Title>

                <Stack gap="sm">
                  <Title order={4} size="lg">
                    {experience.title}
                  </Title>
                  <Text size="md" fw={500} c="blue">
                    {experience.company}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {experience.location}
                  </Text>
                  <Text>{experience.description}</Text>
                </Stack>
              </Stack>
            </Card>

            {/* Connect Card */}
            <Card component="section" className={styles.connectCard} flex={1}>
              <Stack gap="lg">
                <Title order={3} size="xl">
                  Let&apos;s Connect
                </Title>

                <SocialLinks socialLinks={socialLinks} />
              </Stack>
            </Card>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
