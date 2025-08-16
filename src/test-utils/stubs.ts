// Reusable test stubs for consistent mocking across tests

export const profileStub = {
  name: 'John Doe',
  bio: 'Senior Frontend Engineer passionate about React and TypeScript',
  location: 'London, UK',
  email: 'john@example.com',
  githubUsername: 'johndoe',
  socialLinks: [
    {
      name: 'GitHub',
      platform: 'Open Source Platform',
      description: 'My code repositories and contributions',
      href: 'https://github.com/johndoe',
      icon: 'github',
      color: 'dark',
      stats: '50+ repositories',
    },
    {
      name: 'LinkedIn',
      platform: 'Professional Network',
      description: 'Connect with me professionally',
      href: 'https://linkedin.com/in/johndoe',
      icon: 'linkedin',
      color: 'blue',
      stats: 'Senior Engineer',
    },
    {
      name: 'Stack Overflow',
      platform: 'Developer Community',
      description: 'Helping other developers',
      href: 'https://stackoverflow.com/users/123/johndoe',
      icon: 'stackoverflow',
      color: 'orange',
      stats: '2k+ reputation',
    },
  ],
};

export const technologiesStub = {
  frontend: [
    { name: 'React', icon: 'react', color: '#61DAFB' },
    { name: 'TypeScript', icon: 'typescript', color: '#3178C6' },
    { name: 'Next.js', icon: 'nextjs', color: '#000000' },
    { name: 'JavaScript', icon: 'javascript', color: '#F7DF1E' },
  ],
  styling: [
    { name: 'SCSS', icon: 'sass', color: '#CF649A' },
    { name: 'CSS', icon: 'css3', color: '#1572B6' },
  ],
  tools: [
    { name: 'Git', icon: 'git', color: '#F05032' },
    { name: 'Jest', icon: 'jest', color: '#C21325' },
    { name: 'GitHub', icon: 'github', color: '#181717' },
  ],
  backend: [
    { name: 'Node.js', icon: 'nodejs', color: '#339933' },
    { name: 'Python', icon: 'python', color: '#3776AB' },
    { name: 'MongoDB', icon: 'mongodb', color: '#47A248' },
  ],
};

export const githubReposStub = [
  {
    id: 12345,
    name: 'awesome-react-components',
    full_name: 'johndoe/awesome-react-components',
    description: 'A collection of reusable React components with TypeScript support',
    html_url: 'https://github.com/johndoe/awesome-react-components',
    stargazers_count: 42,
    language: 'TypeScript',
    topics: ['react', 'typescript', 'components', 'ui'],
    fork: false,
    archived: false,
    private: false,
    created_at: '2023-06-15T10:30:00Z',
    updated_at: '2024-01-10T14:22:00Z',
    pushed_at: '2024-01-10T14:22:00Z',
  },
];

export const projectsStub = {
  professional: [
    {
      id: 'prof-1',
      title: 'Enterprise Dashboard',
      subtitle: 'Analytics Platform',
      shortDescription: 'A comprehensive analytics dashboard for enterprise clients',
      longDescription:
        'Built a scalable analytics platform handling millions of data points daily with real-time updates and advanced filtering capabilities.\nThe system was designed from the ground up to handle enterprise-scale traffic and provide insights that drive business decisions.',
      role: 'Senior Frontend Developer',
      tags: ['react', 'typescript', 'charts'],
      achievements: [
        'Led team of 5 developers',
        'Improved performance by 40%',
        'Reduced load time by 60%',
      ],
      externalLinks: [
        { type: 'website', label: 'Live Site', url: 'https://enterprise-dashboard.com' },
      ],
    },
    {
      id: 'prof-2',
      title: 'E-commerce Platform',
      subtitle: 'Online Shopping',
      shortDescription: 'Modern e-commerce platform with advanced features',
      longDescription:
        'Developed a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.',
      role: 'Full Stack Developer',
      tags: ['vue', 'node', 'stripe'],
      achievements: ['1M+ monthly users', 'PCI compliance', '$10M+ in transactions'],
      externalLinks: [
        { type: 'website', label: 'Platform', url: 'https://ecommerce-platform.com' },
      ],
    },
  ],
  personal: [],
};
