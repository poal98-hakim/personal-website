import { profileRepository, projectsRepository } from '@/repositories';
import { calculateYearsOfExperience } from './page.utils';

export interface HomePageVM {
  profile: {
    name: string;
    firstName: string;
    bio: string;
    avatarUrl: string;
  };
  stats: {
    yearsOfExperience: number;
    projectsCount: number;
    technologiesCount: number;
  };
  socialLinks: Array<{
    name: string;
    href: string;
    icon: string;
    stats: string;
  }>;
  loading: boolean;
  error: string | null;
}

export class HomePagePresenter {
  async getHomePageVM(): Promise<HomePageVM> {
    const profileResult = profileRepository.getProfile();
    const technologiesResult = profileRepository.getTechnologies();
    const professionalProjectsResult = projectsRepository.getProfessionalProjects();
    const personalProjectsResult = await projectsRepository.getPersonalProjects();
    const yearsOfExperience = calculateYearsOfExperience(2017);

    if (!profileResult.ok) {
      return {
        profile: {
          name: '',
          firstName: '',
          bio: '',
          avatarUrl: '/profile-photo.png',
        },
        stats: {
          yearsOfExperience: 0,
          projectsCount: 0,
          technologiesCount: 0,
        },
        socialLinks: [],
        loading: false,
        error: profileResult.error.message,
      };
    }

    if (!technologiesResult.ok) {
      return {
        profile: {
          name: profileResult.data.name,
          firstName: profileResult.data.name.split(' ')[0],
          bio: profileResult.data.bio,
          avatarUrl: '/profile-photo.png',
        },
        stats: {
          yearsOfExperience,
          projectsCount: 0,
          technologiesCount: 0,
        },
        socialLinks: profileResult.data.socialLinks.map((link) => ({
          name: link.name,
          href: link.href,
          icon: link.icon,
          stats: link.stats,
        })),
        loading: false,
        error: technologiesResult.error.message,
      };
    }

    const profile = profileResult.data;
    const technologies = technologiesResult.data;

    // Calculate total technologies count
    const totalTechnologies =
      technologies.frontend.length +
      technologies.styling.length +
      technologies.tools.length +
      technologies.backend.length;

    // Calculate total projects count
    const professionalCount = professionalProjectsResult.ok
      ? professionalProjectsResult.data.length
      : 0;
    const personalCount = personalProjectsResult.ok ? personalProjectsResult.data.length : 0;
    const totalProjectsCount = professionalCount + personalCount;

    return {
      profile: {
        name: profile.name,
        firstName: profile.name.split(' ')[0],
        bio: profile.bio,
        avatarUrl: '/profile-photo.png',
      },
      stats: {
        yearsOfExperience,
        projectsCount: totalProjectsCount,
        technologiesCount: totalTechnologies,
      },
      socialLinks: profile.socialLinks.map((link) => ({
        name: link.name,
        href: link.href,
        icon: link.icon,
        stats: link.stats,
      })),
      loading: false,
      error: null,
    };
  }
}
