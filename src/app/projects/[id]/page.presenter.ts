import { projectsRepository } from '@/repositories';
import type { ProjectPM } from '@/repositories/projects';
import { ProjectDetailViewModel } from './page.model';

export class ProjectDetailPresenter {
  // Get all project IDs for static generation
  // Include both professional and GitHub personal projects
  public async getAllProjectIds(): Promise<string[]> {
    const professionalResult = projectsRepository.getProfessionalProjects();
    const personalResult = await projectsRepository.getPersonalProjects();

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
      lastUpdated: project.lastUpdated,
      externalLinks: project.externalLinks,
      loading: false,
      error: null,
    };
  }

  public async getViewModel(id: string): Promise<ProjectDetailViewModel> {
    // Get data from repository
    const result = await projectsRepository.getProjectById(id);

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
        lastUpdated: undefined,
        externalLinks: undefined,
        loading: false,
        error: result.error.message,
      };
    }

    return this.mapPMToVM(result.data);
  }
}
