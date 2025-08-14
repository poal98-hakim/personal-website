import { projectsService } from '@/services';
import type { Result } from '@/utils/result';
import z from 'zod';
import { ProjectDTOSchema, type ProjectPM } from './projects.model';
import { mapDTOtoPM } from './projects.utils';

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

  // Get personal projects
  getPersonalProjects(): Result<ProjectPM[]> {
    try {
      const result = projectsService.getPersonalProjects();

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
            message: 'Failed to validate personal projects data',
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

  // Get project by ID
  getProjectById(id: string): Result<ProjectPM> {
    try {
      const result = projectsService.getProjectById(id);

      if (!result.ok) {
        return {
          ok: false,
          error: result.error,
        };
      }

      const validationResult = ProjectDTOSchema.safeParse(result.data);

      if (!validationResult.success) {
        return {
          ok: false,
          error: {
            kind: 'Validation',
            message: 'Failed to validate project data',
            cause: validationResult.error,
          },
        };
      }

      const parsedProject = mapDTOtoPM(validationResult.data);

      return {
        ok: true,
        data: parsedProject,
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
