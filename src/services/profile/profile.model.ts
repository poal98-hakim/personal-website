export interface SocialLinkDTO {
  name: string;
  platform: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  stats: string;
}

export interface UserDTO {
  name: string;
  bio: string;
  location: string;
  email: string;
  socialLinks: SocialLinkDTO[];
}

export interface TechnologyDTO {
  name: string;
  icon: string;
  color: string;
}

export interface TechnologiesDTO {
  frontend: TechnologyDTO[];
  styling: TechnologyDTO[];
  tools: TechnologyDTO[];
  backend: TechnologyDTO[];
}
