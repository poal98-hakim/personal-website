import { projectsService } from '@/services';
import { githubReposStub } from '@/test-utils/stubs';
import { ProjectDetailPresenter } from '../app/projects/[id]/page.presenter';
import { ProjectsPresenter } from '../app/projects/page.presenter';

jest.mock('@/data/projects.json', () => {
  const stubs = jest.requireActual('@/test-utils/stubs');
  return stubs.projectsStub;
});

// Mock GitHub API call
projectsService.getGithubPersonalProjects = jest.fn().mockResolvedValue({
  ok: true,
  data: githubReposStub,
});

describe('Projects Flow - Black Box Integration Tests', () => {
  describe('Projects List Page', () => {
    test('successfully loads and displays all projects', async () => {
      const presenter = new ProjectsPresenter();
      const viewModel = await presenter.getViewModel();

      // Should successfully load professional projects
      expect(viewModel.professional.loading).toBe(false);
      expect(viewModel.professional.error).toBeNull();
      expect(viewModel.personal.loading).toBe(false);

      // Should have professional projects
      expect(viewModel.professional.projects).toHaveLength(2);

      // Check professional projects data integrity
      expect(viewModel.professional.projects[0]).toEqual({
        id: 'prof-1',
        title: 'Enterprise Dashboard',
        description: 'A comprehensive analytics dashboard for enterprise clients',
        tags: ['react', 'typescript', 'charts'],
      });

      // Check personal projects data integrity (if loaded successfully)
      if (viewModel.personal.projects.length > 0) {
        const firstPersonalProject = viewModel.personal.projects[0];
        expect(firstPersonalProject).toHaveProperty('id');
        expect(firstPersonalProject).toHaveProperty('title');
        expect(firstPersonalProject).toHaveProperty('description');
        expect(firstPersonalProject).toHaveProperty('tags');
        expect(Array.isArray(firstPersonalProject.tags)).toBe(true);
      }
    });
  });

  describe('Project Detail Page', () => {
    test('successfully loads and displays complete project details', async () => {
      const presenter = new ProjectDetailPresenter();
      const viewModel = await presenter.getViewModel('prof-1');

      // Should load without errors
      expect(viewModel.loading).toBe(false);
      expect(viewModel.error).toBeNull();

      // Check basic project information
      expect(viewModel.id).toBe('prof-1');
      expect(viewModel.title).toBe('Enterprise Dashboard');
      expect(viewModel.subtitle).toBe('Analytics Platform');
      expect(viewModel.shortDescription).toBe(
        'A comprehensive analytics dashboard for enterprise clients'
      );
      expect(viewModel.role).toBe('Senior Frontend Developer');

      // Check technologies/tags
      expect(viewModel.tags).toEqual(['react', 'typescript', 'charts']);

      // Check achievements
      expect(viewModel.achievements).toEqual([
        'Led team of 5 developers',
        'Improved performance by 40%',
        'Reduced load time by 60%',
      ]);

      // Check external links
      expect(viewModel.externalLinks).toHaveLength(1);
      expect(viewModel.externalLinks?.[0]).toEqual({
        type: 'website',
        label: 'Live Site',
        url: 'https://enterprise-dashboard.com',
      });
    });

    test('processes long description into paragraphs correctly', async () => {
      const presenter = new ProjectDetailPresenter();
      const viewModel = await presenter.getViewModel('prof-1');

      // Should split long description into paragraphs
      expect(viewModel.longDescriptionParagraphs).toBeDefined();
      expect(viewModel.longDescriptionParagraphs?.length).toBe(2);
      expect(viewModel.longDescriptionParagraphs?.[0]).toBe(
        'Built a scalable analytics platform handling millions of data points daily with real-time updates and advanced filtering capabilities.'
      );
      expect(viewModel.longDescriptionParagraphs?.[1]).toBe(
        'The system was designed from the ground up to handle enterprise-scale traffic and provide insights that drive business decisions.'
      );
    });

    test('handles project not found scenario', async () => {
      const presenter = new ProjectDetailPresenter();
      const viewModel = await presenter.getViewModel('nonexistent-id');

      // Should gracefully handle missing project
      expect(viewModel.loading).toBe(false);
      expect(viewModel.error).toBeTruthy();
      expect(viewModel.id).toBe('');
    });
  });
});
