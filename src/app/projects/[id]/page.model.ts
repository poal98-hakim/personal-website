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
  externalLinks?: ExternalLinkVM[];
  loading: boolean;
  error: string | null;
}

export interface ExternalLinkVM {
  type: 'linkedin' | 'website' | 'github';
  label: string;
  url: string;
}
