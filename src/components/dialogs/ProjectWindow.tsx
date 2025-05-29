import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { Project } from "@/services/projectService";

interface ProjectWindowProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  instanceId?: string;
}

export function ProjectWindow({ isOpen, onOpenChange, project, instanceId = "project-window" }: ProjectWindowProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project || !isOpen) return null;
  
  // Move these handlers inside useEffect to avoid React hooks rules violation
  // This is needed because we're defining these functions after a conditional return
  useEffect(() => {
    // Reset image index when project changes
    setCurrentImageIndex(0);
  }, [project]);
  
  const handlePrevImage = () => {
    if (!project.screenshots || project.screenshots.length <= 1) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.screenshots.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!project.screenshots || project.screenshots.length <= 1) return;
    setCurrentImageIndex((prev) => 
      prev === project.screenshots.length - 1 ? 0 : prev + 1
    );
  };

  // Use useEffect to ensure dialog is brought to front when opened
  useEffect(() => {
    if (isOpen) {
      // Force the project window to the foreground by manipulating the DOM
      setTimeout(() => {
        const projectWindowElement = document.querySelector(`[data-instance-id="${instanceId}"]`);
        if (projectWindowElement) {
          projectWindowElement.parentElement?.style.setProperty('z-index', '999999');
        }
      }, 10);
    }
  }, [isOpen, instanceId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent 
        className="project-window-content fixed bg-[#E0E0E0] border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] p-0 pt-0 pb-0 w-[700px] h-[500px] min-w-[400px] min-h-[400px] max-w-[90vw] max-h-[90vh] overflow-auto resize"
        data-instance-id={instanceId}
      >
        <DialogHeader className="border-b border-gray-300 pl-4 pr-2 py-1 flex justify-between items-center">
          <DialogTitle className="font-chicago text-center text-md m-0">{project.name}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="h-5 w-5 p-0">
            <X className="h-3 w-3" />
          </Button>
        </DialogHeader>
        
        <div className="flex flex-col h-[calc(100%-32px)] overflow-auto">
          {/* Top section: Image carousel - Full width */}
          <div className="w-full relative border-b border-gray-300">
            <div className="bg-white flex items-center justify-center relative" style={{ height: '300px' }}>
              {project.screenshots && project.screenshots.length > 0 ? (
                <img 
                  src={project.screenshots[currentImageIndex]} 
                  alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                  className="max-h-[290px] max-w-[95%] object-contain"
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
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-all border border-gray-300 shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-all border border-gray-300 shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            
            {/* Image navigation dots */}
            {project.screenshots.length > 1 && (
              <div className="absolute bottom-2 left-0 right-0">
                <div className="flex justify-center items-center gap-2 bg-white/70 py-1 mx-auto w-fit px-3 rounded-full">
                  {project.screenshots.map((_, index) => (
                    <div 
                      key={index} 
                      className={`w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform ${
                        index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
                <div className="text-xs text-center font-geneva-12 text-gray-600 mt-1">
                  Image {currentImageIndex + 1} of {project.screenshots.length}
                </div>
              </div>
            )}
          </div>
          
          {/* Bottom section: Project details in a grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {/* Left column: Project info */}
            <div className="flex flex-col">
              <div className="flex items-center mb-2">
                <img 
                  src={project.icon} 
                  alt={project.name} 
                  className="w-7 h-7 mr-2 [image-rendering:pixelated]" 
                />
                <h3 className="font-chicago text-lg">{project.name}</h3>
              </div>
              
              <p className="my-2 font-geneva-12 text-sm">{project.description}</p>
              
              {/* Year information */}
              {project.year && (
                <div className="mb-3">
                  <h4 className="font-chicago text-xs mb-1">Year:</h4>
                  <p className="font-geneva-12 text-sm">{project.year}</p>
                </div>
              )}
              
              {/* Project URL */}
              {project.url && (
                <div className="mb-4 mt-auto">
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-geneva-12 inline-flex items-center text-blue-600 hover:underline bg-blue-50 px-3 py-1 rounded"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    <span className="text-sm">Visit Project</span>
                  </a>
                </div>
              )}
            </div>
            
            {/* Right column: Technologies and tags */}
            <div className="flex flex-col">
              {/* Technologies */}
              {project.tech && project.tech.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-chicago text-xs mb-1">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech?.map((tech, index) => (
                      <span key={index} className="bg-gray-200 text-xs px-2 py-0.5 rounded font-geneva-12">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tags */}
              <div className="mb-4">
                <h4 className="font-chicago text-xs mb-1">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-xs px-2 py-0.5 rounded font-geneva-12">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Close button */}
              <div className="mt-auto text-right">
                <Button 
                  onClick={() => onOpenChange(false)}
                  className="bg-[#3B3B3B] text-white font-chicago hover:bg-black text-xs px-4"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
