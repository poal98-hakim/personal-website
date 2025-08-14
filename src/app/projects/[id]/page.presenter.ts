import { projectsRepository } from '@/repositories';
import type { ProjectPM } from '@/repositories/projects';
import { ProjectDetailViewModel } from './page.model';

export class ProjectDetailPresenter {
  // Get all project IDs for static generation
  public getAllProjectIds(): string[] {
    const professionalResult = projectsRepository.getProfessionalProjects();
    const personalResult = projectsRepository.getPersonalProjects();

    const allProjects = [];

    if (professionalResult.ok) {
      allProjects.push(...professionalResult.data);
    }

    if (personalResult.ok) {
      allProjects.push(...personalResult.data);
    }

    return allProjects.map((project) => project.id);
  }

  // Map project PM to view model
  private mapPMToVM(project: ProjectPM): ProjectDetailViewModel {
    return {
      id: project.id,
      title: project.title,
      subtitle: project.subtitle,
      shortDescription: project.shortDescription,
      longDescriptionParagraphs: project.longDescription
        ? project.longDescription
            .split('\n')
            .filter((paragraph) => paragraph.trim().length > 0)
            .map((paragraph) => paragraph.trim())
        : undefined,
      role: project.role,
      tags: project.tags,
      achievements: project.achievements,
      externalLinks: project.externalLinks,
      loading: false,
      error: null,
    };
  }

  public getViewModel(id: string): ProjectDetailViewModel {
    // Get data from repository
    const result = projectsRepository.getProjectById(id);

    // Handle errors
    if (!result.ok) {
      return {
        id: '',
        title: '',
        subtitle: undefined,
        shortDescription: '',
        longDescriptionParagraphs: undefined,
        role: undefined,
        tags: [],
        achievements: undefined,
        externalLinks: undefined,
        loading: false,
        error: result.error.message,
      };
    }

    return this.mapPMToVM(result.data);
  }
}
