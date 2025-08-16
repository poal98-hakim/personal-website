import { profileStub, technologiesStub } from '@/test-utils/stubs';
import { AboutPresenter } from '../app/about/page.presenter';

jest.mock('@/data/profile.json', () => profileStub);

jest.mock('@/data/technologies.json', () => technologiesStub);

describe('About Page Flow - Black Box Integration Tests', () => {
  test('successfully loads and displays complete about page data', () => {
    const presenter = new AboutPresenter();
    const viewModel = presenter.getViewModel();

    // Should load without errors
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();

    // Check personal info
    expect(viewModel.personalInfo.name).toBe('Hakim Abdelcadir');
    expect(viewModel.personalInfo.role).toBe('Senior Frontend Engineer');
    expect(viewModel.personalInfo.location).toBe('London, UK');
    expect(viewModel.personalInfo.bio).toHaveLength(4); // Should have 4 bio paragraphs
    expect(viewModel.personalInfo.avatarSrc).toBe('/profile-photo.jpg');

    // Check experience info
    expect(viewModel.experience.title).toBe('Senior Frontend Engineer');
    expect(viewModel.experience.company).toBe('Aveni');
    expect(viewModel.experience.location).toBe('London, UK');
    expect(viewModel.experience.description).toContain('React applications');

    // Check social links
    expect(viewModel.socialLinks).toHaveLength(3);
    expect(viewModel.socialLinks[0].name).toBe('GitHub');
    expect(viewModel.socialLinks[0].href).toBe('https://github.com/johndoe');
    expect(viewModel.socialLinks[0].iconName).toBe('github');
    expect(viewModel.socialLinks[1].name).toBe('LinkedIn');
  });

  test('successfully loads and processes technologies for scrolling display', () => {
    const presenter = new AboutPresenter();
    const viewModel = presenter.getViewModel();

    // Should have technologies loaded and duplicated for scrolling
    expect(viewModel.technologies.length).toBeGreaterThan(0);

    // Calculate expected total (all categories combined and duplicated)
    const expectedSingleCount = 4 + 2 + 3 + 3; // frontend + styling + tools + backend
    const expectedTotalCount = expectedSingleCount * 2; // Duplicated for scrolling

    expect(viewModel.technologies).toHaveLength(expectedTotalCount);

    // Check that technologies contain proper icon names and colors
    const reactTech = viewModel.technologies.find((tech) => tech.name === 'React');
    expect(reactTech?.iconName).toBe('react');
    expect(reactTech?.color).toBe('#61DAFB');

    const typescriptTech = viewModel.technologies.find((tech) => tech.name === 'TypeScript');
    expect(typescriptTech?.iconName).toBe('typescript');
    expect(typescriptTech?.color).toBe('#3178C6');

    // Check backend technologies are included
    const nodeTech = viewModel.technologies.find((tech) => tech.name === 'Node.js');
    expect(nodeTech?.iconName).toBe('nodejs');
    expect(nodeTech?.color).toBe('#339933');
  });

  test('handles mixed technology categories correctly', () => {
    const presenter = new AboutPresenter();
    const viewModel = presenter.getViewModel();

    const techNames = viewModel.technologies.map((tech) => tech.name);

    // Should include technologies from all categories
    expect(techNames).toContain('React'); // frontend
    expect(techNames).toContain('SCSS'); // styling
    expect(techNames).toContain('Git'); // tools
    expect(techNames).toContain('Python'); // backend

    // Each technology should appear exactly twice (due to duplication for scrolling)
    const reactCount = techNames.filter((name) => name === 'React').length;
    expect(reactCount).toBe(2);
  });
});
