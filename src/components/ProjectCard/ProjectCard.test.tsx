import { render, screen } from '@/test-utils';
import { ProjectCard } from './ProjectCard';
import type { ProjectCardProps } from './ProjectCard.model';

const mockProject: ProjectCardProps['project'] = {
  id: '1',
  title: 'Test Project',
  description: 'A test project for unit testing',
  tags: ['react', 'typescript', 'testing'],
};

describe('ProjectCard', () => {
  it('renders project title and description', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
  });

  it('renders view details text', () => {
    render(<ProjectCard project={mockProject} />);

    expect(screen.getByText('View Details')).toBeInTheDocument();
  });

  it('renders as a link to project details', () => {
    render(<ProjectCard project={mockProject} />);

    const projectLink = screen.getByRole('link');
    expect(projectLink).toHaveAttribute('href', '/projects/1');
  });

  it('renders limited tags when more than 4 are provided', () => {
    const projectWithManyTags = {
      ...mockProject,
      tags: ['react', 'typescript', 'testing', 'nodejs', 'express'], // 5 total tags
    };
    render(<ProjectCard project={projectWithManyTags} />);

    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
    expect(screen.getByText('testing')).toBeInTheDocument();
    expect(screen.getByText('nodejs')).toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument(); // Remaining tags (5 total - 4 shown = 1 remaining)
  });
});
