import { ProjectDTO } from '@/services';
import { ProjectPM } from './projects.model';

export function mapDTOtoPM(dto: ProjectDTO): ProjectPM {
  return {
    id: dto.id,
    title: dto.title,
    subtitle: dto.subtitle,
    shortDescription: dto.shortDescription,
    longDescription: dto.longDescription,
    role: dto.role,
    tags: dto.tags,
    achievements: dto.achievements,
    externalLinks: dto.externalLinks,
  };
}
