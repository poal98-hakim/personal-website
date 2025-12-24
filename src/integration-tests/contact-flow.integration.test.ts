import { profileStub } from '@/test-utils/stubs';
import { ContactPresenter } from '../app/contact/page.presenter';

jest.mock('@/data/profile.json', () => profileStub);

describe('Contact Page Flow - Black Box Integration Tests', () => {
  test('successfully loads and displays complete contact page data', () => {
    const presenter = new ContactPresenter();
    const viewModel = presenter.getViewModel();

    // Should load without errors
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();

    // Check social links data
    expect(viewModel.socialLinks).toHaveLength(4);

    // Check contact details
    expect(viewModel.contact.email).toBe('john@example.com');

    // Verify each social link has proper structure
    const githubCard = viewModel.socialLinks.find((link) => link.name === 'GitHub');
    const linkedinCard = viewModel.socialLinks.find((link) => link.name === 'LinkedIn');
    const stackoverflowCard = viewModel.socialLinks.find((link) => link.name === 'Stack Overflow');

    expect(githubCard).toBeDefined();
    expect(linkedinCard).toBeDefined();
    expect(stackoverflowCard).toBeDefined();

    // Check GitHub link details
    if (githubCard) {
      expect(githubCard.name).toBe('GitHub');
      expect(githubCard.platform).toBe('Open Source Platform');
      expect(githubCard.description).toBe('My code repositories and contributions');
      expect(githubCard.href).toBe('https://github.com/johndoe');
      expect(githubCard.iconName).toBe('github');
      expect(githubCard.color).toBe('dark');
      expect(githubCard.stats).toBe('50+ repositories');
    }

    // Check LinkedIn link details
    if (linkedinCard) {
      expect(linkedinCard.name).toBe('LinkedIn');
      expect(linkedinCard.platform).toBe('Professional Network');
      expect(linkedinCard.description).toBe('Connect with me professionally');
      expect(linkedinCard.href).toBe('https://linkedin.com/in/johndoe');
      expect(linkedinCard.iconName).toBe('linkedin');
      expect(linkedinCard.color).toBe('blue');
      expect(linkedinCard.stats).toBe('Senior Engineer');
    }

    // Check Stack Overflow link details
    if (stackoverflowCard) {
      expect(stackoverflowCard.name).toBe('Stack Overflow');
      expect(stackoverflowCard.platform).toBe('Developer Community');
      expect(stackoverflowCard.description).toBe('Helping other developers');
      expect(stackoverflowCard.href).toBe('https://stackoverflow.com/users/123/johndoe');
      expect(stackoverflowCard.iconName).toBe('stackoverflow');
      expect(stackoverflowCard.color).toBe('orange');
      expect(stackoverflowCard.stats).toBe('2k+ reputation');
    }
  });
});
