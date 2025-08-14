export interface ProjectCardData {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProjectSection {
  projects: ProjectCardData[];
  loading: boolean;
  error: string | null;
  count: number;
}

export interface ProjectsViewModel {
  professional: ProjectSection;
  personal: ProjectSection;
  retryProfessional?: () => void;
  retryPersonal?: () => void;
}
