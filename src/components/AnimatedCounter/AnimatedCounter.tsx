'use client';

import { cx } from '@/utils/cx';
import { Text } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './AnimatedCounter.module.scss';

interface AnimatedCounterProps {
  target: number;
  start?: number;
  duration?: number;
  startOnVisible?: boolean;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  start = 0,
  duration = 2000,
  startOnVisible = true,
  suffix = '',
  className,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(start);
  const counterRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const hasAnimated = useRef(false);

  const animateCount = useCallback(() => {
    if (hasAnimated.current) return;

    hasAnimated.current = true;
    setCount(start); // Reset to start value before animation

    const startTime = Date.now();
    const startValue = start;
    const endValue = target;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Ease out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    animationRef.current = requestAnimationFrame(updateCount);
  }, [start, target, duration]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!startOnVisible) {
      // Start animation immediately
      const timer = setTimeout(() => {
        animateCount();
      }, 500); // Small delay to ensure everything is mounted
      return () => clearTimeout(timer);
    }

    // Use intersection observer for visibility-based animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          // Add a small delay to ensure the element is fully visible
          setTimeout(() => {
            if (entry.isIntersecting) {
              animateCount();
            }
          }, 400);
        }
      },
      { threshold: 0.5, rootMargin: '0px' }
    );

    const currentRef = counterRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [startOnVisible, animateCount]);

  return (
    <Text component="span" ref={counterRef} className={cx(styles.animatedCounter, className)}>
      {count}
      {suffix}
    </Text>
  );
}
