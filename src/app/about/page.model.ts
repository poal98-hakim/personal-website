export interface TechnologyVM {
  name: string;
  iconName: string;
  color: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  tagline: string;
  avatarSrc: string;
  bio: string[];
}

export interface SocialLink {
  name: string;
  description: string;
  href: string;
  iconName: string;
}

export interface ExperienceInfo {
  title: string;
  company: string;
  location: string;
  description: string;
}

export interface AboutViewModel {
  personalInfo: PersonalInfo;
  technologies: TechnologyVM[];
  socialLinks: SocialLink[];
  experience: ExperienceInfo;
  loading: boolean;
  error: string | null;
}
