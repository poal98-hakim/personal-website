import projectsData from '@/data/projects.json';
import { httpGateway } from '@/utils/httpGateway';
import { Result, err, ok } from '@/utils/result';
import type { GithubRepoDTO, ProjectDTO } from './projects.model';

class ProjectsService {
  private readonly githubApiBase = 'https://api.github.com';

  // Personal projects from GitHub
  async getGithubPersonalProjects(username: string): Promise<Result<GithubRepoDTO[]>> {
    try {
      // Add GitHub token for authentication if available
      const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
      };

      const githubToken = process.env.GITHUB_TOKEN;
      if (githubToken) {
        headers['Authorization'] = `Bearer ${githubToken}`;
      }

      const githubRepos = await httpGateway.get<GithubRepoDTO[]>(
        `${this.githubApiBase}/users/${username}/repos?type=public&sort=updated&per_page=20`,
        { headers }
      );
      return ok(githubRepos);
    } catch (error) {
      return err('Network', 'Failed to load personal projects from GitHub', error);
    }
  }

  // Get professional projects
  getProfessionalProjects(): Result<ProjectDTO[]> {
    try {
      return ok(projectsData.professional as ProjectDTO[]);
    } catch (error) {
      return err('Unknown', 'Failed to load professional projects', error);
    }
  }

  // Get personal projects
  getPersonalProjects(): Result<ProjectDTO[]> {
    try {
      return ok(projectsData.personal as ProjectDTO[]);
    } catch (error) {
      return err('Unknown', 'Failed to load personal projects', error);
    }
  }

  // Get project by ID
  getProjectById(id: string): Result<ProjectDTO> {
    try {
      const allProjects = [...projectsData.professional, ...projectsData.personal];
      const project = allProjects.find((p) => p.id === id);
      if (!project) {
        return err('NotFound', `Project with id '${id}' not found`);
      }

      return ok(project as ProjectDTO);
    } catch (error) {
      return err('Unknown', 'Failed to load project', error);
    }
  }
}

export const projectsService = new ProjectsService();
