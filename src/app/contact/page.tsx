import {
  Box,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconExternalLink, IconMail, IconMessageCircle, IconSend } from '@tabler/icons-react';
import { SocialCard } from './components';
import styles from './page.module.scss';
import { ContactPresenter } from './page.presenter';

export default function ContactPage() {
  const presenter = new ContactPresenter();
  const vm = presenter.getViewModel();

  // Handle error case
  if (vm.error) {
    return (
      <Box className={styles.contactPage}>
        <Container size="lg">
          <Text c="red">Error loading contact information: {vm.error}</Text>
        </Container>
      </Box>
    );
  }

  return (
    <Box className={styles.contactPage}>
      <Container size="lg">
        <Box component="section" className={styles.heroSection}>
          <Stack gap="xl" align="center">
            <Group gap="md" className={styles.heroIcon}>
              <ThemeIcon size={64} radius="xl" variant="light" className={styles.messageIcon}>
                <IconMessageCircle size={32} />
              </ThemeIcon>
              <ThemeIcon size={48} radius="xl" variant="filled" className={styles.sendIcon}>
                <IconSend size={24} />
              </ThemeIcon>
            </Group>

            <Stack gap="md" align="center" className={styles.heroContent}>
              <Title order={1} size="3.5rem" className={styles.heroTitle}>
                {vm.hero.title}
              </Title>

              <Text size="xl" className={styles.heroSubtitle} ta="center">
                {vm.hero.subtitle}
              </Text>

              <Text size="lg" c="dimmed" className={styles.heroDescription} ta="center">
                {vm.hero.description}
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Container>

      <Container size="lg" className={styles.contentSection}>
        <Stack gap="xl">
          <Card className={styles.primaryContactCard}>
            <Group gap="xl" align="center" className={styles.emailSection}>
              <Box className={styles.emailIconContainer}>
                <IconMail size={40} className={styles.emailIcon} />
              </Box>

              <Stack gap="md" className={styles.emailContent}>
                <Title order={2} className={styles.emailTitle}>
                  {vm.contact.emailTitle}
                </Title>
                <Text size="lg" c="dimmed">
                  {vm.contact.emailDescription}
                </Text>
                <Button
                  component="a"
                  href={`mailto:${vm.contact.email}`}
                  size="lg"
                  leftSection={<IconSend size={20} />}
                  rightSection={<IconExternalLink size={16} />}
                  className={styles.emailButton}
                >
                  Send Email
                </Button>
              </Stack>
            </Group>
          </Card>

          <Box component="section" className={styles.socialSection}>
            <Stack gap="lg" align="center" className={styles.socialHeader}>
              <Title order={2} ta="center" className={styles.socialTitle}>
                Connect on Social Media
              </Title>
              <Text size="lg" c="dimmed" ta="center" className={styles.socialDescription}>
                Follow my journey, see my latest projects, and join the conversation
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" className={styles.socialGrid}>
              {vm.socialLinks.map((social) => (
                <SocialCard key={social.name} social={social} />
              ))}
            </SimpleGrid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
