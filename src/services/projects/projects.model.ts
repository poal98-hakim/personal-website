export interface ProjectDTO {
  id: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  longDescription?: string;
  role?: string;
  tags: string[];
  achievements?: string[];
  lastUpdated?: string;
  externalLinks?: {
    type: 'linkedin' | 'website';
    label: string;
    url: string;
  }[];
}

export interface GithubRepoDTO {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  homepage: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}
