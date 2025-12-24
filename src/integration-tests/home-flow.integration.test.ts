import { projectsService } from '@/services/projects/projects';
import { githubReposStub } from '@/test-utils/stubs';
import { HomePagePresenter } from '../app/page.presenter';

jest.mock('@/data/profile.json', () => {
  const stubs = jest.requireActual('@/test-utils/stubs');
  return stubs.profileStub;
});

jest.mock('@/data/projects.json', () => {
  const stubs = jest.requireActual('@/test-utils/stubs');
  return stubs.projectsStub;
});

jest.mock('@/data/technologies.json', () => {
  const stubs = jest.requireActual('@/test-utils/stubs');
  return stubs.technologiesStub;
});

// Mock GitHub API call
projectsService.getGithubPersonalProjects = jest.fn().mockResolvedValue({
  ok: true,
  data: githubReposStub,
});

// Mock the current date to ensure consistent years of experience calculation
const mockDate = new Date('2024-01-01');
jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('Home Page Flow - Black Box Integration Tests', () => {
  test('successfully loads and displays complete home page data', async () => {
    const presenter = new HomePagePresenter();
    const viewModel = await presenter.getHomePageVM();

    // Should load without errors
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();

    // Check profile data
    expect(viewModel.profile.name).toBe('John Doe');
    expect(viewModel.profile.bio).toBe(
      'Senior Frontend Engineer passionate about React and TypeScript'
    );
    expect(viewModel.profile.avatarUrl).toBe('/profile-photo.jpg');

    // Check stats
    expect(viewModel.stats.yearsOfExperience).toBe(7);
    expect(viewModel.stats.projectsCount).toBe(3);
    expect(viewModel.stats.technologiesCount).toBe(12);

    // Check social links
    expect(viewModel.socialLinks).toHaveLength(4);

    // Should count both professional and personal projects
    expect(viewModel.stats.projectsCount).toBe(3);
  });
});
