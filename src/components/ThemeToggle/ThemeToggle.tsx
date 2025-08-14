'use client';

import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch
    return (
      <ActionIcon
        variant="subtle"
        size="lg"
        aria-label="Toggle color scheme"
        style={{ opacity: 0 }}
      >
        <IconMoon size={20} />
      </ActionIcon>
    );
  }

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="subtle"
      size="lg"
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? (
        <IconSun size={20} data-testid="IconSun" />
      ) : (
        <IconMoon size={20} data-testid="IconMoon" />
      )}
    </ActionIcon>
  );
}
