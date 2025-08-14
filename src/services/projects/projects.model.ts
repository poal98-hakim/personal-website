export interface ProjectDTO {
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
