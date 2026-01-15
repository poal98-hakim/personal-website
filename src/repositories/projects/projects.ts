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
      // 1. Get GitHub username from profile
      const profileResult = profileService.getProfile();
      if (!profileResult.ok) {
        return {
          ok: false,
          error: profileResult.error,
        };
      }

      const { githubUsername } = profileResult.data;

      // 2. Fetch GitHub repos + static projects in parallel
      const [githubResult, staticResult] = await Promise.all([
        projectsService.getGithubPersonalProjects(githubUsername),
        projectsService.getPersonalProjects(),
      ]);

      // 3. Map static JSON projects (if any)
      let staticProjects: ProjectPM[] = [];
      if (staticResult?.ok) {
        const validationResult = z.array(ProjectDTOSchema).safeParse(staticResult.data);
        if (validationResult.success) {
          staticProjects = validationResult.data.map(mapDTOtoPM).sort((a, b) => {
            // Sort by last updated
            return new Date(b.lastUpdated!).getTime() - new Date(a.lastUpdated!).getTime();
          });
        }
      }

      // 4. If GitHub failed, but we have static projects → return those
      if (!githubResult?.ok) {
        if (staticProjects.length > 0) {
          return {
            ok: true,
            data: staticProjects,
          };
        }

        // No GitHub, no valid static → bubble up GitHub error
        return {
          ok: false,
          error: githubResult?.error ?? {
            kind: 'Unknown',
            message: 'Unable to load personal projects',
          },
        };
      }

      // 5. Filter & map GitHub repos
      const filteredRepos = githubResult.data
        .filter(
          (repo) =>
            !repo.fork && // Exclude forked repositories
            !repo.archived // Exclude archived repositories
        )
        .sort((a, b) => {
          // Sort by last updated
          return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        });

      const githubProjects = filteredRepos.map(mapGithubRepoToPM);

      // 6. Combine static JSON projects + GitHub repos
      const combinedProjects = [...staticProjects, ...githubProjects];

      return {
        ok: true,
        data: combinedProjects,
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
