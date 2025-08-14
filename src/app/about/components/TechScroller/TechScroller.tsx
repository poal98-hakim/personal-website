import { Box, Text } from '@mantine/core';
import { iconMapping } from './TechScroller.constants';
import type { TechScrollerProps } from './TechScroller.model';
import styles from './TechScroller.module.scss';

export function TechScroller({ technologies }: TechScrollerProps) {
  if (!technologies || technologies.length === 0) {
    return null;
  }

  return (
    <Box className={styles.techScroller}>
      <Box className={styles.scrollContainer}>
        <Box className={styles.scrollContent}>
          {technologies.map((tech, index) => {
            const IconComponent = iconMapping[tech.iconName] || iconMapping.react;
            return (
              <Box
                key={`${tech.name}-${index}`}
                className={styles.techItem}
                style={{ '--icon-color': tech.color }}
              >
                <Box className={styles.techIcon}>
                  <IconComponent size={48} />
                </Box>
                <Text span className={styles.techName}>
                  {tech.name}
                </Text>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
