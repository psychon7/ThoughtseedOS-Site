import servicesData from '@/data/services.json';

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  approach: string;
  benefits: string[];
  deliverables: string[];
  featured?: boolean;
}

class ServiceService {
  private services: Service[];
  
  constructor() {
    this.services = servicesData.services;
  }
  
  /**
   * Get all services
   */
  getAllServices(): Service[] {
    return this.services;
  }
  
  /**
   * Get a service by ID
   */
  getServiceById(id: string): Service | undefined {
    return this.services.find(service => service.id === id);
  }
  
  /**
   * Get featured services
   */
  getFeaturedServices(): Service[] {
    return this.services.filter(service => service.featured);
  }
  
  /**
   * Get services by tag
   */
  getServicesByTag(tag: string): Service[] {
    return this.services.filter(service => 
      service.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }
  
  /**
   * Search services by term (searches in name, description, tags)
   */
  searchServices(term: string): Service[] {
    const searchTerm = term.toLowerCase();
    return this.services.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      service.approach.toLowerCase().includes(searchTerm) ||
      service.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm)) ||
      service.deliverables.some(deliverable => deliverable.toLowerCase().includes(searchTerm))
    );
  }
}

export const serviceService = new ServiceService();
export default serviceService;
