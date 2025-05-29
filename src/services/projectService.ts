import projectsData from '@/data/projects.json';

export interface Project {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  screenshots: string[];
  tech?: string[];
  url?: string;
  client?: string;
  year?: string;
  featured?: boolean;
}

class ProjectService {
  private projects: Project[];
  
  constructor() {
    this.projects = projectsData.projects;
  }
  
  /**
   * Get all projects
   */
  getAllProjects(): Project[] {
    return this.projects;
  }
  
  /**
   * Get a project by ID
   */
  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }
  
  /**
   * Get featured projects
   */
  getFeaturedProjects(): Project[] {
    return this.projects.filter(project => project.featured);
  }
  
  /**
   * Get projects by tag
   */
  getProjectsByTag(tag: string): Project[] {
    return this.projects.filter(project => 
      project.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }
  
  /**
   * Get projects by tech
   */
  getProjectsByTech(tech: string): Project[] {
    return this.projects.filter(project => 
      project.tech?.some(t => t.toLowerCase() === tech.toLowerCase())
    );
  }
  
  /**
   * Search projects by term (searches in name, description, tags, tech)
   */
  searchProjects(term: string): Project[] {
    const searchTerm = term.toLowerCase();
    return this.projects.filter(project => 
      project.name.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      project.tech?.some(tech => tech.toLowerCase().includes(searchTerm)) ||
      project.client?.toLowerCase().includes(searchTerm)
    );
  }
}

export const projectService = new ProjectService();
export default projectService;
