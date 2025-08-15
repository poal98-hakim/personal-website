import { UserDTO } from '@/services';
import { ProfilePM } from './profile.model';

export function mapUserDTOtoPM(dto: UserDTO): ProfilePM {
  return {
    name: dto.name || '',
    bio: dto.bio || '',
    location: dto.location || '',
    email: dto.email || '',
    githubUsername: dto.githubUsername,
    socialLinks: dto.socialLinks.map((link) => ({
      name: link.name,
      platform: link.platform,
      description: link.description,
      href: link.href,
      icon: link.icon,
      color: link.color,
      stats: link.stats,
    })),
  };
}
