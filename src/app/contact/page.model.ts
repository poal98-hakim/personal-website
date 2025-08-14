export interface SocialLink {
  name: string;
  platform: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
  stats: string;
}

export interface SocialLinkData {
  name: string;
  platform: string;
  description: string;
  href: string;
  iconName: string;
  color: string;
  stats: string;
}

export interface ContactInfo {
  email: string;
  emailTitle: string;
  emailDescription: string;
}

export interface ContactViewModel {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  contact: ContactInfo;
  socialLinks: SocialLinkData[];
  loading: boolean;
  error: string | null;
}
