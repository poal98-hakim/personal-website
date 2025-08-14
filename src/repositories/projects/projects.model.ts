import { z } from 'zod';

export interface ProjectPM {
  id: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  longDescription?: string;
  role?: string;
  tags: string[];
  achievements?: string[];
  externalLinks?: {
    type: 'linkedin' | 'website';
    label: string;
    url: string;
  }[];
}

export const ProjectDTOSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  shortDescription: z.string(),
  longDescription: z.string().optional(),
  role: z.string().optional(),
  tags: z.array(z.string()),
  achievements: z.array(z.string()).optional(),
  externalLinks: z
    .array(
      z.object({
        type: z.enum(['linkedin', 'website']),
        label: z.string(),
        url: z.string(),
      })
    )
    .optional(),
});
