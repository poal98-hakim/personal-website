import { AnimatedCounter } from '@/components';
import { Anchor, Box, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconArrowRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandStackoverflow,
  IconBrandX,
  IconCode,
  IconRocket,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.scss';
import { HomePagePresenter, HomePageVM } from './page.presenter';

// Revalidate every day to keep GitHub project counts up-to-date
export const revalidate = 86400;

export default async function Home() {
  const presenter = new HomePagePresenter();
  const data: HomePageVM = await presenter.getHomePageVM();

  if (data.error) {
    return (
      <Box className={styles.homePage}>
        <Container size="lg">
          <Text c="red" ta="center">
            Error loading profile data: {data.error}
          </Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={styles.homePage}>
      <Container size="lg">
        <Box component="section" className={styles.heroSection}>
          <Stack gap="xl" align="center">
            <Image
              src={data.profile.avatarUrl}
              alt={data.profile.name}
              width={200}
              height={200}
              className={styles.heroAvatar}
            />

            <Stack gap="md" align="center" className={styles.heroContent}>
              <Title order={1} size="4rem" className={styles.heroTitle}>
                Hi, I&apos;m {data.profile.firstName}
              </Title>

              <Text size="xl" className={styles.heroSubtitle}>
                {data.profile.bio}
              </Text>
            </Stack>

            <Group gap="lg" className={styles.ctaSection}>
              <Button
                component={Link}
                href="/projects"
                size="lg"
                leftSection={<IconCode size={20} />}
                rightSection={<IconArrowRight size={16} />}
                className={styles.primaryCta}
              >
                View My Work
              </Button>

              <Button
                component={Link}
                href="/about"
                size="lg"
                variant="light"
                leftSection={<IconRocket size={20} />}
                className={styles.secondaryCta}
              >
                About Me
              </Button>
            </Group>
          </Stack>
        </Box>
      </Container>

      <Container size="lg">
        <Box component="section" className={styles.statsSection}>
          <Group justify="center" gap="lg">
            <Card className={styles.statCard}>
              <Stack gap="xs" align="center">
                <Text size="2rem" fw={700} c="blue" className={styles.statNumber}>
                  <AnimatedCounter
                    start={1}
                    target={data.stats.yearsOfExperience}
                    suffix="+"
                    duration={1500}
                  />
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  Years Experience
                </Text>
              </Stack>
            </Card>

            <Card className={styles.statCard}>
              <Stack gap="xs" align="center">
                <Text size="2rem" fw={700} c="blue" className={styles.statNumber}>
                  <AnimatedCounter
                    start={1}
                    target={data.stats.projectsCount}
                    suffix="+"
                    duration={1000}
                  />
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  Projects Built
                </Text>
              </Stack>
            </Card>

            <Card className={styles.statCard}>
              <Stack gap="xs" align="center">
                <Text size="2rem" fw={700} c="blue" className={styles.statNumber}>
                  <AnimatedCounter
                    start={1}
                    target={data.stats.technologiesCount}
                    suffix="+"
                    duration={1500}
                  />
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                  Technologies
                </Text>
              </Stack>
            </Card>
          </Group>
        </Box>
      </Container>

      <Container size="lg">
        <Box component="section" className={styles.socialSection}>
          <Stack gap="lg" align="center">
            <Title order={2} ta="center" className={styles.socialTitle}>
              Let&apos;s Connect
            </Title>

            <Group gap="lg" justify="center" className={styles.socialLinks}>
              {data.socialLinks.map((link) => {
                const IconComponent =
                  link.icon === 'github'
                    ? IconBrandGithub
                    : link.icon === 'linkedin'
                      ? IconBrandLinkedin
                      : link.icon === 'stackoverflow'
                        ? IconBrandStackoverflow
                        : link.icon === 'x'
                          ? IconBrandX
                          : null;

                if (!IconComponent) return null;

                return (
                  <Anchor
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <Card className={styles.socialCard}>
                      <Group gap="md">
                        <IconComponent size={24} />
                        <Stack gap={0}>
                          <Text fw={500}>{link.name}</Text>
                          <Text size="xs" c="dimmed">
                            {link.stats}
                          </Text>
                        </Stack>
                      </Group>
                    </Card>
                  </Anchor>
                );
              })}
            </Group>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
