import { profileService, projectsService } from '@/services';
import type { Result } from '@/utils/result';
import z from 'zod';
import { ProjectDTOSchema, type ProjectPM } from './projects.model';
import { mapDTOtoPM, mapGithubRepoToPM } from './projects.utils';

class ProjectsRepository {
  getProfessionalProjects(): Result<ProjectPM[]> {
    try {
      const result = projectsService.getProfessionalProjects();

      if (!result.ok) {
        return {
          ok: false,
          error: result.error,
        };
      }

      const validationResult = z.array(ProjectDTOSchema).safeParse(result.data);

      if (!validationResult.success) {
        return {
          ok: false,
          error: {
            kind: 'Validation',
            message: 'Failed to validate professional projects data',
            cause: validationResult.error,
          },
        };
      }

      const parsedProjects = validationResult.data.map(mapDTOtoPM);

      return {
        ok: true,
        data: parsedProjects,
      };
    } catch (error) {
      return {
        ok: false,
        error: {
          kind: 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          cause: error,
        },
      };
    }
  }

  // Get personal projects from GitHub
  async getPersonalProjects(): Promise<Result<ProjectPM[]>> {
    try {
      // Get GitHub username from profile
      const profileResult = profileService.getProfile();
      if (!profileResult.ok) {
        return {
          ok: false,
          error: profileResult.error,
        };
      }

      const { githubUsername } = profileResult.data;

      const result = await projectsService.getGithubPersonalProjects(githubUsername);

      if (!result.ok) {
        // Fallback to static data if GitHub fails
        const staticResult = projectsService.getPersonalProjects();
        if (staticResult.ok) {
          const validationResult = z.array(ProjectDTOSchema).safeParse(staticResult.data);
          if (validationResult.success) {
            return {
              ok: true,
              data: validationResult.data.map(mapDTOtoPM),
            };
          }
        }

        return {
          ok: false,
          error: result.error,
        };
      }

      // Filter and map GitHub repos
      const filteredRepos = result.data
        .filter(
          (repo) =>
            !repo.fork && // Exclude forked repositories
            !repo.archived // Exclude archived repositories
        )
        .sort((a, b) => {
          // Sort by stars first, then by last updated
          if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        });

      const parsedProjects = filteredRepos.map(mapGithubRepoToPM);

      return {
        ok: true,
        data: parsedProjects,
      };
    } catch (error) {
      return {
        ok: false,
        error: {
          kind: 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          cause: error,
        },
      };
    }
  }

  // Get project by ID
  async getProjectById(id: string): Promise<Result<ProjectPM>> {
    try {
      // First try to get from static data (professional projects)
      const result = projectsService.getProjectById(id);

      if (result.ok) {
        const validationResult = ProjectDTOSchema.safeParse(result.data);

        if (validationResult.success) {
          const parsedProject = mapDTOtoPM(validationResult.data);
          return {
            ok: true,
            data: parsedProject,
          };
        }
      }

      // If not found in static data and it's a GitHub project, fetch from GitHub
      if (id.startsWith('github-')) {
        const personalResult = await this.getPersonalProjects();
        if (personalResult.ok) {
          const project = personalResult.data.find((p) => p.id === id);
          if (project) {
            return {
              ok: true,
              data: project,
            };
          }
        }
      }

      return {
        ok: false,
        error: {
          kind: 'NotFound',
          message: `Project with id '${id}' not found`,
        },
      };
    } catch (error) {
      return {
        ok: false,
        error: {
          kind: 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          cause: error,
        },
      };
    }
  }
}

export const projectsRepository = new ProjectsRepository();
