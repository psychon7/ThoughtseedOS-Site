import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectWindowProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    id: string;
    name: string;
    description: string;
    icon: string;
    tags: string[];
    screenshots: string[];
    tech?: string[];
  } | null;
  instanceId?: string;
}

export function ProjectWindow({ isOpen, onOpenChange, project, instanceId = "project-window" }: ProjectWindowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project || !isOpen) return null;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  // Use useEffect to ensure dialog is brought to front when opened
  useEffect(() => {
    if (isOpen) {
      // Force the project window to the foreground by manipulating the DOM
      setTimeout(() => {
        const projectWindowElement = document.querySelector('.project-window-content');
        if (projectWindowElement) {
          projectWindowElement.parentElement?.style.setProperty('z-index', '999999');
        }
      }, 10);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="project-window-content fixed bg-[#E0E0E0] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] p-0 pt-0 pb-0 w-[560px] max-w-[90vw] max-h-[80vh] overflow-visible resize">
        <DialogHeader className="border-b border-gray-300 pl-4 pr-2 py-1 flex justify-between items-center">
          <DialogTitle className="font-chicago text-center text-md m-0">{project.name}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-5 w-5 p-0">
            <X className="h-3 w-3" />
          </Button>
        </DialogHeader>
        
        <div className="flex p-4 h-[calc(100%-32px)]">
          {/* Left side: Screenshots carousel */}
          <div className="w-1/2 pr-4 relative">
            <div className="border border-gray-400 bg-white p-1 h-[240px] flex items-center justify-center relative">
              {project.screenshots.length > 0 ? (
                <img 
                  src={project.screenshots[currentImageIndex]} 
                  alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback image on error
                    (e.target as HTMLImageElement).src = '/assets/placeholder.png';
                  }}
                />
              ) : (
                <div className="text-gray-400">No screenshots available</div>
              )}
              
              {project.screenshots.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-1"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                    {project.screenshots.map((_, index) => (
                      <div 
                        key={index} 
                        className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Right side: Project details */}
          <div className="w-1/2 pl-2 flex flex-col overflow-y-auto">
            <div className="flex items-center mb-2">
              <img 
                src={project.icon} 
                alt={project.name} 
                className="w-6 h-6 mr-2 [image-rendering:pixelated]" 
              />
              <h3 className="font-chicago text-lg">{project.name}</h3>
            </div>
            
            <p className="my-2 font-geneva-12 text-sm">{project.description}</p>
            
            {project.tech && project.tech.length > 0 && (
              <div className="mb-2">
                <h4 className="font-chicago text-xs mb-1">Technologies:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech?.map((tech, index) => (
                    <span key={index} className="bg-gray-200 text-xs px-2 py-0.5 rounded font-geneva-12">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mb-2">
              <h4 className="font-chicago text-xs mb-1">Tags:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-xs px-2 py-0.5 rounded font-geneva-12">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-auto text-center">
              <Button 
                onClick={() => onOpenChange(false)}
                className="bg-[#3B3B3B] text-white font-chicago hover:bg-black text-xs px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
