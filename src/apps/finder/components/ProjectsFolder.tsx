import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import projectIcons from "@/config/projectIcons";
import { ProjectWindow } from "@/components/dialogs/ProjectWindow";
import { X } from "lucide-react";

interface ProjectsFolderProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectsFolder({ isOpen, onOpenChange }: ProjectsFolderProps) {
  const [selectedProject, setSelectedProject] = useState<typeof projectIcons[0] | null>(null);
  const [isProjectWindowOpen, setIsProjectWindowOpen] = useState(false);
  
  // Reset project window state when folder is closed
  useEffect(() => {
    if (!isOpen) {
      setIsProjectWindowOpen(false);
      // Also clear the selected project when folder closes
      setSelectedProject(null);
    } else {
      // When the folder is opened, force it to the foreground
      const dialogElement = document.querySelector('.projects-dialog-content');
      if (dialogElement) {
        dialogElement.parentElement?.style.setProperty('z-index', '99999');
      }
    }
  }, [isOpen]);

  const handleProjectClick = (projectId: string) => {
    const project = projectIcons.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleProjectDoubleClick = (projectId: string) => {
    const project = projectIcons.find(p => p.id === projectId);
    if (project) {
      // First close the projects folder
      onOpenChange(false);
      
      // Then set the project and open its window after a small delay
      setTimeout(() => {
        setSelectedProject(project);
        setIsProjectWindowOpen(true);
      }, 100);
    }
  };
  
  // If project window should be shown, render only that
  if (selectedProject && isProjectWindowOpen) {
    return (
      <ProjectWindow 
        isOpen={true}
        onOpenChange={(open) => {
          setIsProjectWindowOpen(open);
          if (!open) {
            // When project window closes, clear the selected project
            setSelectedProject(null);
          }
        }}
        project={selectedProject}
        instanceId="project-detail"
      />
    );
  }
  
  // If folder isn't open, don't render anything
  if (!isOpen) return null;
  
  // Otherwise render the projects folder
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="projects-dialog-content fixed bg-[#E0E0E0] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] w-[450px] p-0 pt-0 pb-0 overflow-visible resize">
        <DialogHeader className="border-b border-gray-300 pl-4 pr-2 py-1 flex justify-between items-center">
          <DialogTitle className="font-chicago text-center text-md m-0">Projects</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-5 w-5 p-0">
            <X className="h-3 w-3" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col h-[320px] overflow-hidden">
          {/* Finder toolbar */}
          <div className="flex items-center bg-[#E0E0E0] border-b border-gray-300 p-1">
            <button className="mr-1 p-1 hover:bg-gray-300 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="mr-1 p-1 hover:bg-gray-300 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="mr-1 p-1 hover:bg-gray-300 rounded">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 12H12M12 12H16M12 12V8M12 12V16" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="flex-1 mx-2">
              <input
                type="text"
                className="w-full border border-gray-400 h-5 px-2 bg-white font-geneva-12 text-xs"
                value="/"
                readOnly
              />
            </div>
          </div>
          
          {/* Column headers */}
          <div className="flex border-b border-gray-300 bg-[#E0E0E0] text-[11px] font-chicago px-2 py-1">
            <div className="w-1/2">Name</div>
            <div className="w-1/6">Type</div>
            <div className="w-1/6">Size</div>
            <div className="w-1/6">Modified</div>
          </div>
          
          {/* Project list */}
          <div className="bg-white flex-1 overflow-y-auto">
            {projectIcons.map((project) => (
              <div
                key={project.id}
                className="flex items-center px-2 py-1 hover:bg-blue-100 cursor-pointer border-b border-gray-100"
                onClick={() => handleProjectClick(project.id)}
                onDoubleClick={() => handleProjectDoubleClick(project.id)}
              >
                <div className="w-1/2 flex items-center">
                  <img 
                    src={project.icon} 
                    alt={project.name} 
                    className="w-4 h-4 mr-2"
                  />
                  <span className="font-geneva-12 text-xs">{project.name}</span>
                </div>
                <div className="w-1/6 font-geneva-12 text-xs">Project--</div>
                <div className="w-1/6 font-geneva-12 text-xs">--</div>
                <div className="w-1/6 font-geneva-12 text-xs">25/05/25</div>
              </div>
            ))}
          </div>
          
          {/* Status bar */}
          <div className="bg-[#E0E0E0] border-t border-gray-300 px-2 py-1 text-[10px] font-geneva-12">
            {projectIcons.length} items
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
