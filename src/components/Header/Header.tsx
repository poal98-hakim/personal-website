'use client';

import { ThemeToggle } from '@/components/ThemeToggle';
import { cx } from '@/utils/cx/cx';
import { Box, Burger, Drawer, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './Header.module.scss';
import { HeaderPresenter } from './Header.presenter';

export function Header() {
  const pathname = usePathname();
  const presenterRef = useRef<HeaderPresenter | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize presenter
  if (!presenterRef.current) {
    presenterRef.current = new HeaderPresenter();
  }

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const vm = useMemo(() => presenterRef.current!.getViewModel(pathname), [pathname]);

  return (
    <header className={styles.root}>
      <nav className={styles.nav}>
        <Link href={vm.logoHref} className={styles.logo}>
          <Text span>{vm.logoText}</Text>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          {vm.navigationItems.map((item) => (
            <li key={item.href} className={styles.navItem}>
              <Link
                href={item.href}
                className={cx(styles.navLink, item.isActive && styles.navLinkActive)}
                prefetch
              >
                <Text span>{item.label}</Text>
              </Link>
            </li>
          ))}
        </ul>

        {/* Header Controls */}
        <Box className={styles.headerControls}>
          <ThemeToggle />

          {/* Mobile Burger Menu Button */}
          <Burger
            opened={isMobileMenuOpen}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            className={styles.burgerButton}
          />
        </Box>
      </nav>

      {/* Mobile Navigation Drawer */}
      <Drawer
        opened={isMobileMenuOpen}
        onClose={toggleMobileMenu}
        position="right"
        withCloseButton={false}
        styles={{
          body: { padding: 0 },
          content: { backgroundColor: 'var(--mantine-color-body)' },
        }}
      >
        <Box p="xl" pt="4rem">
          <ul className={styles.navListMobile}>
            {vm.navigationItems.map((item) => (
              <li key={item.href} className={styles.navItem}>
                <Link
                  href={item.href}
                  className={cx(styles.navLink, item.isActive && styles.navLinkActive)}
                  onClick={toggleMobileMenu}
                >
                  <Text span>{item.label}</Text>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </Drawer>
    </header>
  );
}
