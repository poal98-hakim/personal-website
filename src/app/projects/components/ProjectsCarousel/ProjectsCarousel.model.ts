import type { ProjectCardData } from '../../page.model';

export interface ProjectsCarouselProps {
  projects: ProjectCardData[];
  ariaLabel: string;
  delayOffset?: number;
}
