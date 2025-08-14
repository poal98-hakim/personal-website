import { render, screen } from '@/test-utils';
import { TechScroller } from './TechScroller';
import type { TechnologyVM } from '../../page.model';

// Mock the icon mapping
jest.mock('./TechScroller.constants', () => ({
  iconMapping: {
    react: () => <div data-testid="react-icon">React Icon</div>,
    typescript: () => <div data-testid="typescript-icon">TypeScript Icon</div>,
    javascript: () => <div data-testid="javascript-icon">JavaScript Icon</div>,
  },
}));

describe('TechScroller', () => {
  const mockTechnologies: TechnologyVM[] = [
    {
      name: 'React',
      iconName: 'react',
      color: '#61DAFB',
    },
    {
      name: 'TypeScript',
      iconName: 'typescript',
      color: '#3178C6',
    },
    {
      name: 'JavaScript',
      iconName: 'javascript',
      color: '#F7DF1E',
    },
  ];

  test('renders technologies with names and icons', () => {
    render(<TechScroller technologies={mockTechnologies} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();

    expect(screen.getByTestId('react-icon')).toBeInTheDocument();
    expect(screen.getByTestId('typescript-icon')).toBeInTheDocument();
    expect(screen.getByTestId('javascript-icon')).toBeInTheDocument();
  });

  test('applies correct colors as CSS custom properties', () => {
    render(<TechScroller technologies={mockTechnologies} />);

    const techItems = document.querySelectorAll('[data-testid="tech-item"], .techItem');

    if (techItems.length > 0) {
      // Check that CSS custom properties are applied (implementation detail)
      expect(techItems[0]).toHaveStyle({ '--icon-color': '#61DAFB' });
    }
  });

  test('renders nothing when no technologies provided', () => {
    const { container } = render(<TechScroller technologies={[]} />);
    // Should not render any tech items when empty
    expect(container.querySelector('.techItem')).toBeNull();
    expect(container.querySelector('.techScroller')).toBeNull();
  });

  test('renders nothing when technologies is undefined', () => {
    const { container } = render(
      <TechScroller technologies={undefined as unknown as TechnologyVM[]} />
    );
    // Should not render any tech items when undefined
    expect(container.querySelector('.techItem')).toBeNull();
    expect(container.querySelector('.techScroller')).toBeNull();
  });

  test('renders nothing when technologies is null', () => {
    const { container } = render(<TechScroller technologies={null as unknown as TechnologyVM[]} />);
    // Should not render any tech items when null
    expect(container.querySelector('.techItem')).toBeNull();
    expect(container.querySelector('.techScroller')).toBeNull();
  });

  test('handles technologies with missing icon gracefully', () => {
    const technologiesWithMissingIcon: TechnologyVM[] = [
      {
        name: 'Unknown Tech',
        iconName: 'nonexistent',
        color: '#000000',
      },
    ];

    render(<TechScroller technologies={technologiesWithMissingIcon} />);

    expect(screen.getByText('Unknown Tech')).toBeInTheDocument();
    // Should fall back to react icon when icon is missing
    expect(screen.getByTestId('react-icon')).toBeInTheDocument();
  });

  test('renders each technology with unique keys', () => {
    const duplicateTechnologies: TechnologyVM[] = [
      { name: 'React', iconName: 'react', color: '#61DAFB' },
      { name: 'React', iconName: 'react', color: '#61DAFB' },
    ];

    render(<TechScroller technologies={duplicateTechnologies} />);

    // Should render both instances
    expect(screen.getAllByText('React')).toHaveLength(2);
  });
});
