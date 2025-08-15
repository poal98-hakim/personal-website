export interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    lastUpdated?: string;
  };
}
