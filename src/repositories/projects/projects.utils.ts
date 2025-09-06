import { GithubRepoDTO, ProjectDTO } from '@/services';
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
    lastUpdated: dto.lastUpdated,
    externalLinks: dto.externalLinks,
  };
}

// Map GitHub repository directly to ProjectPM
export function mapGithubRepoToPM(repo: GithubRepoDTO): ProjectPM {
  return {
    id: `github-${repo.name}`,
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    shortDescription: repo.description || 'No description available',
    tags: [...(repo.language ? [repo.language] : []), ...repo.topics],
    lastUpdated: repo.pushed_at,
    externalLinks: [
      ...(repo.homepage
        ? [
            {
              type: 'website' as const,
              label: 'Website',
              url: repo.homepage,
            },
          ]
        : []),
      {
        type: 'github' as const,
        label: 'View on GitHub',
        url: repo.html_url,
      },
    ],
  };
}
