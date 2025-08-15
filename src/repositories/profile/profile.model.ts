import z from 'zod';

export interface SocialLinkPM {
  name: string;
  platform: string;
  description: string;
  href: string;
  icon: string;
  color: string;
  stats: string;
}

export interface ProfilePM {
  name: string;
  bio: string;
  location: string;
  email: string;
  githubUsername: string;
  socialLinks: SocialLinkPM[];
}

const SocialLinkDTOSchema = z.object({
  name: z.string(),
  platform: z.string(),
  description: z.string(),
  href: z.string(),
  icon: z.string(),
  color: z.string(),
  stats: z.string(),
});

export const UserDTOSchema = z.object({
  name: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  bio: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  location: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
  email: z.string(),
  githubUsername: z.string(),
  socialLinks: z.array(SocialLinkDTOSchema),
});
