import { profileRepository } from '@/repositories/profile';
import type { ContactViewModel, SocialLinkData } from './page.model';

export class ContactPresenter {
  private getStaticHeroData() {
    return {
      title: "Let's Connect",
      subtitle: 'Ready to collaborate and build something amazing together',
      description:
        "Whether you have a project idea, want to discuss opportunities, or just want to chat about the latest in web development - I'd love to hear from you",
    };
  }

  public getViewModel(): ContactViewModel {
    const heroData = this.getStaticHeroData();

    try {
      // Load profile data from repository (static JSON)
      const profileResult = profileRepository.getProfile();

      if (!profileResult.ok) {
        return {
          hero: heroData,
          contact: {
            email: '',
            emailTitle: 'Contact unavailable',
            emailDescription: 'Please try again later.',
          },
          socialLinks: [],
          loading: false,
          error: profileResult.error.message,
        };
      }

      const profile = profileResult.data;

      // Transform social links (pass icon name, not component)
      const transformedSocialLinks: SocialLinkData[] = profile.socialLinks.map((link) => ({
        name: link.name,
        platform: link.platform,
        description: link.description,
        href: link.href,
        iconName: link.icon,
        color: link.color,
        stats: link.stats,
      }));

      return {
        hero: heroData,
        contact: {
          email: profile.email,
          emailTitle: 'Drop me an email',
          emailDescription:
            'The fastest way to reach me. I typically respond within 24 hours and love discussing new projects and opportunities.',
        },
        socialLinks: transformedSocialLinks,
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        hero: heroData,
        contact: {
          email: '',
          emailTitle: 'Contact unavailable',
          emailDescription: 'Please try again later.',
        },
        socialLinks: [],
        loading: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }
}
