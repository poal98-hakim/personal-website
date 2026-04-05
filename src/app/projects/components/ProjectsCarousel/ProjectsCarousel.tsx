'use client';

import { ProjectCard } from '@/components';
import { ActionIcon, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { ProjectsCarouselProps } from './ProjectsCarousel.model';
import styles from './ProjectsCarousel.module.scss';

export function ProjectsCarousel(props: ProjectsCarouselProps) {
  const { projects, ariaLabel, delayOffset = 0 } = props;
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const leftButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)',
  };
  const rightButtonStyle: CSSProperties = {
    position: 'absolute',
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)',
  };

  function updateScrollState() {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    const threshold = 8;

    setCanScrollLeft(rail.scrollLeft > threshold);
    setCanScrollRight(rail.scrollLeft < maxScrollLeft - threshold);
  }

  function scrollByDirection(direction: 'left' | 'right') {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const firstCard = rail.querySelector<HTMLElement>('[data-carousel-card="true"]');
    const gapValue = firstCard ? Number.parseFloat(getComputedStyle(rail).gap || '0') : 0;
    const scrollAmount = firstCard ? firstCard.offsetWidth + gapValue : rail.clientWidth * 0.9;

    rail.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    updateScrollState();

    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const handleResize = () => updateScrollState();

    rail.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      rail.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', handleResize);
    };
  }, [projects.length]);

  return (
    <Box className={styles.carouselShell}>
      <ActionIcon
        variant="filled"
        radius="xl"
        size="lg"
        className={styles.navButton}
        data-side="left"
        aria-label={`Scroll ${ariaLabel} left`}
        onClick={() => scrollByDirection('left')}
        disabled={!canScrollLeft}
        style={leftButtonStyle}
      >
        <IconChevronLeft size={18} />
      </ActionIcon>

      <Box className={styles.viewport}>
        <Box
          className={styles.viewportFades}
          data-show-left-fade={canScrollLeft}
          data-show-right-fade={canScrollRight}
        >
          <Box ref={railRef} className={styles.projectsCarousel} aria-label={ariaLabel}>
            {projects.map((project, index) => (
              <Box
                key={project.id}
                className={styles.projectCardWrapper}
                data-carousel-card="true"
                style={{ '--delay': `${(index + delayOffset) * 0.1}s` } as CSSProperties}
              >
                <ProjectCard project={project} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <ActionIcon
        variant="filled"
        radius="xl"
        size="lg"
        className={styles.navButton}
        data-side="right"
        aria-label={`Scroll ${ariaLabel} right`}
        onClick={() => scrollByDirection('right')}
        disabled={!canScrollRight}
        style={rightButtonStyle}
      >
        <IconChevronRight size={18} />
      </ActionIcon>
    </Box>
  );
}
