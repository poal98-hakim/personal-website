import { profileRepository } from '@/repositories';
import type { ProfilePM } from '@/repositories/profile';
import type { TechnologiesDTO } from '@/services/profile';
import type { AboutViewModel, TechnologyVM } from './page.model';

export class AboutPresenter {
  // Get static personal and experience data
  private getStaticData() {
    return {
      personalInfo: {
        name: 'Hakim Abdelcadir',
        role: 'Senior Frontend Engineer',
        location: 'London, UK',
        tagline: 'Crafting exceptional digital experiences with modern web technologies',
        avatarSrc: '/profile-photo.png',
        bio: [
          "I'm a passionate Senior Frontend Engineer, based in UK. With a deep love for creating exceptional user experiences, I transform complex ideas into beautiful, functional, and accessible web applications.",
          'My journey in web development is driven by curiosity and continuous learning. I specialize in React ecosystems, TypeScript, and modern frontend architectures, always staying at the forefront of emerging technologies and best practices.',
          'Beyond coding, I find inspiration in the kitchen, experimenting with flavors and techniques from different cuisines, and through traveling the world, discovering new cultures and perspectives that enrich both my personal and professional outlook.',
          'These diverse experiences have taught me that creativity, attention to detail, and genuine curiosity are universal ingredients for success, whether building great software, exploring new destinations, or sharing a meal with others.',
        ],
      },
      socialLinks: [],
      experience: {
        title: 'Senior Frontend Engineer',
        company: 'Aveni',
        location: 'London, UK',
        description:
          'Leading frontend development initiatives, architecting scalable React applications, and mentoring junior developers. Focused on delivering user-centric solutions with cutting-edge web technologies.',
      },
    };
  }

  // Map profile and technologies PMs to view model
  private mapPMToVM(
    staticData: ReturnType<typeof AboutPresenter.prototype.getStaticData>,
    profile: ProfilePM,
    technologies: TechnologiesDTO
  ): AboutViewModel {
    // Flatten all technologies from different categories
    const allTechnologies = [
      ...technologies.frontend,
      ...technologies.styling,
      ...technologies.tools,
      ...technologies.backend,
    ];

    // Map technologies to view model with icon names
    const technologiesWithIcons: TechnologyVM[] = allTechnologies.map((tech) => ({
      name: tech.name,
      iconName: tech.icon, // pass icon name, not component
      color: tech.color,
    }));

    // Duplicate the array for seamless scrolling loop
    const duplicatedTechnologies = [...technologiesWithIcons, ...technologiesWithIcons];

    // Map social links from profile
    const socialLinks = profile.socialLinks.map((link) => ({
      name: link.name,
      description: link.stats, // Use stats as description for about page
      href: link.href,
      iconName: link.icon, // pass icon name, not component
    }));

    return {
      ...staticData,
      socialLinks,
      technologies: duplicatedTechnologies,
      loading: false,
      error: null,
    };
  }

  // Get view model for server components
  public getViewModel(): AboutViewModel {
    const staticData = this.getStaticData();

    // Get data from repositories
    const profileResult = profileRepository.getProfile();
    const techResult = profileRepository.getTechnologies();

    // Handle errors
    if (!profileResult.ok) {
      return {
        ...staticData,
        technologies: [],
        socialLinks: [],
        loading: false,
        error: profileResult.error.message,
      };
    }

    if (!techResult.ok) {
      return {
        ...staticData,
        technologies: [],
        socialLinks: [],
        loading: false,
        error: techResult.error.message,
      };
    }

    return this.mapPMToVM(staticData, profileResult.data, techResult.data);
  }
}
