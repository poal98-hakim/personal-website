export interface ProjectDetailViewModel {
  id: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  longDescriptionParagraphs?: string[];
  role?: string;
  tags: string[];
  achievements?: string[];
  lastUpdated?: string;
  externalLinks?: {
    type: 'linkedin' | 'website';
    label: string;
    url: string;
  }[];
  loading: boolean;
  error: string | null;
}
