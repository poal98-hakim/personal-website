// Reusable test stubs for consistent mocking across tests

export const profileStub = {
  name: 'John Doe',
  bio: 'Senior Frontend Engineer passionate about React and TypeScript',
  location: 'London, UK',
  email: 'john@example.com',
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

export const projectsStub = {
  professional: [
    {
      id: 'prof-1',
      title: 'Enterprise Dashboard',
      subtitle: 'Analytics Platform',
      shortDescription: 'A comprehensive analytics dashboard for enterprise clients',
      longDescription:
        'Built a scalable analytics platform handling millions of data points daily with real-time updates and advanced filtering capabilities.',
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
  personal: [
    {
      id: 'personal-1',
      title: 'Weather Forecast App',
      subtitle: 'Weather Application',
      shortDescription: 'Beautiful weather app with detailed forecasts',
      longDescription:
        'A sleek weather application providing detailed forecasts, weather maps, and location-based alerts with a beautiful user interface.',
      role: 'Creator',
      tags: ['javascript', 'css', 'api'],
      achievements: ['10k+ downloads', 'Featured on Product Hunt', '4.8★ rating'],
      externalLinks: [
        { type: 'demo', label: 'Live Demo', url: 'https://weather-app-demo.com' },
        { type: 'github', label: 'Source Code', url: 'https://github.com/user/weather-app' },
      ],
    },
    {
      id: 'personal-2',
      title: 'Task Manager',
      subtitle: 'Productivity Tool',
      shortDescription: 'Minimalist task management application',
      longDescription:
        'A clean and intuitive task management app with drag-and-drop functionality, due date tracking, and team collaboration features.',
      role: 'Solo Developer',
      tags: ['react', 'firebase', 'drag-drop'],
      achievements: ['500+ active users', 'Open source', 'Zero crashes'],
      externalLinks: [
        { type: 'github', label: 'Repository', url: 'https://github.com/user/task-manager' },
      ],
    },
  ],
};
