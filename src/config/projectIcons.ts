interface ProjectIcon {
  id: string;
  name: string;
  description: string;
  icon: string;
  tags: string[];
  screenshots: string[];
  tech?: string[];
}

export const projectIcons: ProjectIcon[] = [
  {
    id: "project-1",
    name: "Brand Refresh",
    description: "Complete brand identity redesign for a tech startup, including logo, color palette, typography, and brand guidelines.",
    icon: "/icons/applications.png", // Using existing icons from the ryOS system
    tags: ["Branding", "Design", "Strategy"],
    screenshots: ["/assets/screenshots/project1-1.png", "/assets/screenshots/project1-2.png"],
    tech: ["Figma", "Adobe Suite"]
  },
  {
    id: "project-2",
    name: "Growth Campaign",
    description: "Multi-channel marketing campaign that increased client conversion by 45% through targeted content and data-driven optimization.",
    icon: "/icons/chart.png",
    tags: ["Marketing", "Analytics", "Growth"],
    screenshots: ["/assets/screenshots/project2-1.png", "/assets/screenshots/project2-2.png"],
    tech: ["Google Analytics", "HubSpot", "SEMrush"]
  },
  {
    id: "project-3",
    name: "E-commerce Platform",
    description: "Custom e-commerce solution with integrated payment processing, inventory management, and customer analytics dashboard.",
    icon: "/icons/sites.png",
    tags: ["Web Development", "E-commerce", "UX Design"],
    screenshots: ["/assets/screenshots/project3-1.png", "/assets/screenshots/project3-2.png"],
    tech: ["React", "Node.js", "MongoDB", "Stripe API"]
  },
  {
    id: "project-4",
    name: "Mobile App",
    description: "Cross-platform mobile application for event management with real-time updates, ticket scanning, and social integration.",
    icon: "/icons/iphone.png",
    tags: ["Mobile", "UX/UI", "Development"],
    screenshots: ["/assets/screenshots/project4-1.png", "/assets/screenshots/project4-2.png"],
    tech: ["React Native", "Firebase", "Redux"]
  },
  {
    id: "project-5",
    name: "SEO Optimization",
    description: "Comprehensive SEO strategy that improved client's search ranking from page 3 to top 5 results for targeted keywords.",
    icon: "/icons/documents.png",
    tags: ["SEO", "Content", "Analytics"],
    screenshots: ["/assets/screenshots/project5-1.png", "/assets/screenshots/project5-2.png"],
    tech: ["SEMrush", "Ahrefs", "Google Search Console"]
  },
  {
    id: "project-6",
    name: "Branding Workshop",
    description: "Interactive workshop series helping startups define their brand voice, positioning, and visual identity.",
    icon: "/icons/images.png",
    tags: ["Workshop", "Branding", "Strategy"],
    screenshots: ["/assets/screenshots/project6-1.png", "/assets/screenshots/project6-2.png"],
    tech: ["Miro", "Notion", "Figma"]
  }
];

export default projectIcons;
