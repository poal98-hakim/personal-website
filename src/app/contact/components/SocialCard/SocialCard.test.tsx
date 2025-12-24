import { render, screen } from '@/test-utils';
import type { SocialLinkData } from '../../page.model';
import { SocialCard } from './SocialCard';

// Mock the Tabler icons
jest.mock('@tabler/icons-react', () => ({
  IconBrandGithub: () => <div data-testid="github-icon" />,
  IconBrandLinkedin: () => <div data-testid="linkedin-icon" />,
  IconBrandStackoverflow: () => <div data-testid="stackoverflow-icon" />,
  IconBrandX: () => <div data-testid="x-icon" />,
  IconExternalLink: () => <div data-testid="external-link-icon" />,
}));

describe('SocialCard', () => {
  const mockSocialData: SocialLinkData = {
    name: 'GitHub',
    platform: 'Open Source Platform',
    description: 'My code repositories and contributions',
    href: 'https://github.com/johndoe',
    iconName: 'github',
    color: 'dark',
    stats: '50+ repositories',
  };

  test('renders social card with all required information', () => {
    render(<SocialCard social={mockSocialData} />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Open Source Platform')).toBeInTheDocument();
    expect(screen.getByText('My code repositories and contributions')).toBeInTheDocument();
    expect(screen.getByText('50+ repositories')).toBeInTheDocument();
  });

  test('renders as a clickable link with correct attributes', () => {
    render(<SocialCard social={mockSocialData} />);

    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(cardLink).toHaveAttribute('target', '_blank');
    expect(cardLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('displays correct icon for GitHub', () => {
    render(<SocialCard social={mockSocialData} />);
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
  });

  test('displays correct icon for LinkedIn', () => {
    const linkedinData: SocialLinkData = {
      ...mockSocialData,
      name: 'LinkedIn',
      platform: 'Professional Network',
      iconName: 'linkedin',
      color: 'blue',
    };

    render(<SocialCard social={linkedinData} />);
    expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument();
  });

  test('displays correct icon for Stack Overflow', () => {
    const stackoverflowData: SocialLinkData = {
      ...mockSocialData,
      name: 'Stack Overflow',
      platform: 'Developer Community',
      iconName: 'stackoverflow',
      color: 'orange',
    };

    render(<SocialCard social={stackoverflowData} />);
    expect(screen.getByTestId('stackoverflow-icon')).toBeInTheDocument();
  });

  test('falls back to GitHub icon for unknown icon names', () => {
    const unknownIconData: SocialLinkData = {
      ...mockSocialData,
      iconName: 'unknown-platform',
    };

    render(<SocialCard social={unknownIconData} />);
    // Should fallback to GitHub icon
    expect(screen.getByTestId('github-icon')).toBeInTheDocument();
  });

  test('displays external link icon', () => {
    render(<SocialCard social={mockSocialData} />);
    expect(screen.getByTestId('external-link-icon')).toBeInTheDocument();
  });

  test('handles long text content gracefully', () => {
    const longTextData: SocialLinkData = {
      ...mockSocialData,
      name: 'Very Long Platform Name That Might Wrap',
      description:
        'This is a very long description that might wrap across multiple lines and should be handled gracefully by the component layout without breaking the design.',
      stats: 'A very long stats text that might also wrap',
    };

    render(<SocialCard social={longTextData} />);

    expect(screen.getByText('Very Long Platform Name That Might Wrap')).toBeInTheDocument();
    expect(
      screen.getByText(
        'This is a very long description that might wrap across multiple lines and should be handled gracefully by the component layout without breaking the design.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('A very long stats text that might also wrap')).toBeInTheDocument();
  });

  test('maintains accessibility attributes', () => {
    render(<SocialCard social={mockSocialData} />);

    const cardLink = screen.getByRole('link');

    // Link should be accessible
    expect(cardLink).toBeInTheDocument();
    expect(cardLink).toHaveAttribute('href');

    // External link should have security attributes
    expect(cardLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
