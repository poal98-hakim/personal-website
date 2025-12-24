import { render, screen } from '@/test-utils';
import { SocialLinks } from './SocialLinks';
import type { SocialLink } from '../../page.model';

// Mock the icon mapping
jest.mock('@tabler/icons-react', () => ({
  IconBrandGithub: () => <div data-testid="github-icon" />,
  IconBrandLinkedin: () => <div data-testid="linkedin-icon" />,
  IconBrandX: () => <div data-testid="x-icon" />,
}));

describe('SocialLinks', () => {
  const mockSocialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      description: 'My code repositories',
      href: 'https://github.com/user',
      iconName: 'github',
    },
    {
      name: 'LinkedIn',
      description: 'Professional network',
      href: 'https://linkedin.com/in/user',
      iconName: 'linkedin',
    },
  ];

  test('renders social links with names and descriptions', () => {
    render(<SocialLinks socialLinks={mockSocialLinks} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('My code repositories')).toBeInTheDocument();
    expect(screen.getByText('Professional network')).toBeInTheDocument();
  });

  test('renders links with correct href attributes', () => {
    render(<SocialLinks socialLinks={mockSocialLinks} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });

    expect(githubLink).toHaveAttribute('href', 'https://github.com/user');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/user');
  });

  test('opens links in new tab with security attributes', () => {
    render(<SocialLinks socialLinks={mockSocialLinks} />);

    const links = screen.getAllByRole('link');

    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('renders appropriate icons for each social platform', () => {
    render(<SocialLinks socialLinks={mockSocialLinks} />);

    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  test('renders nothing when no social links provided', () => {
    const { container } = render(<SocialLinks socialLinks={[]} />);
    // Should not render any social link elements
    expect(container.querySelector('a')).toBeNull();
  });

  test('handles unknown icon names gracefully', () => {
    const linksWithUnknownIcon: SocialLink[] = [
      {
        name: 'Unknown Platform',
        description: 'Some platform',
        href: 'https://unknown.com',
        iconName: 'unknown',
      },
    ];

    render(<SocialLinks socialLinks={linksWithUnknownIcon} />);

    expect(screen.getByText('Unknown Platform')).toBeInTheDocument();
    // Should not crash when icon is unknown
  });

  test('renders single social link correctly', () => {
    const singleLink: SocialLink[] = [
      {
        name: 'GitHub',
        description: 'Code repositories',
        href: 'https://github.com/user',
        iconName: 'github',
      },
    ];

    render(<SocialLinks socialLinks={singleLink} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Code repositories')).toBeInTheDocument();
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
  });
});
