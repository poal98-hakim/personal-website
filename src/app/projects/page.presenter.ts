import type { ProjectPM } from '@/repositories';
import { projectsRepository } from '@/repositories';
import type { ProjectCardData, ProjectsViewModel } from './page.model';
import { truncateDescription } from './page.utils';

export class ProjectsPresenter {
  // Map project PM to card vm
  private mapPMToCardVM(project: ProjectPM): ProjectCardData {
    return {
      id: project.id,
      title: project.title,
      description: truncateDescription(project.shortDescription),
      tags: project.tags.slice(0, 5), // Limit tags to avoid overcrowding
      lastUpdated: project.lastUpdated,
    };
  }

  private mapPMToVM(
    professionalProjects: ProjectPM[],
    personalProjects: ProjectPM[]
  ): ProjectsViewModel {
    // Map projects to card data
    const mappedProfessionalProjects = professionalProjects.map((project) =>
      this.mapPMToCardVM(project)
    );
    const mappedPersonalProjects = personalProjects.map((project) => this.mapPMToCardVM(project));

    return {
      professional: {
        projects: mappedProfessionalProjects,
        loading: false,
        error: null,
        count: mappedProfessionalProjects.length,
      },
      personal: {
        projects: mappedPersonalProjects,
        loading: false,
        error: null,
        count: mappedPersonalProjects.length,
      },
    };
  }

  public async getViewModel(): Promise<ProjectsViewModel> {
    // Get data from repositories
    const professionalResult = projectsRepository.getProfessionalProjects();
    const personalResult = await projectsRepository.getPersonalProjects();

    // Handle errors for professional projects
    if (!professionalResult.ok) {
      return {
        professional: {
          projects: [],
          loading: false,
          error: professionalResult.error.message,
          count: 0,
        },
        personal: {
          projects: [],
          loading: false,
          error: null,
          count: 0,
        },
      };
    }

    // Handle errors for personal projects
    if (!personalResult.ok) {
      return {
        professional: {
          projects: professionalResult.data.map((project) => this.mapPMToCardVM(project)),
          loading: false,
          error: null,
          count: professionalResult.data.length,
        },
        personal: {
          projects: [],
          loading: false,
          error: personalResult.error.message,
          count: 0,
        },
      };
    }

    return this.mapPMToVM(professionalResult.data, personalResult.data);
  }
}
