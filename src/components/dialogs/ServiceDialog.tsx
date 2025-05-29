import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WindowFrame } from "@/components/layout/WindowFrame";
import serviceService from "@/services/serviceService";

interface ServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    name: string;
    description: string;
    icon: string;
    id?: string;
  } | null;
  instanceId?: string;
}

export function ServiceDialog({ isOpen, onOpenChange, service, instanceId = "service-dialog" }: ServiceDialogProps) {
  if (!service || !isOpen) return null;
  
  // Use useEffect to ensure window is brought to front when opened
  useEffect(() => {
    if (isOpen) {
      // Force foreground when opened
      // Find the window element and set its z-index to be very high
      const windowElement = document.querySelector(`[data-instance-id="${instanceId}"]`);
      if (windowElement) {
        windowElement.setAttribute('style', 'z-index: 9999 !important');
      }
    }
  }, [isOpen, instanceId]);

  // Get detailed service data from the service ID if available
  const serviceDetails = service.id ? serviceService.getServiceById(service.id) : null;
  
  // Use the detailed service data if available, otherwise use the passed service
  const displayService = serviceDetails || service;
  
  // Get benefits and tags from the service data or use defaults
  const benefits = serviceDetails?.benefits || [
    "Personalized strategic approach",
    "Data-driven methodologies",
    "Expert team with industry experience"
  ];
  
  const tags = serviceDetails?.tags || ["Strategy", "Growth", "Innovation"];
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[5000] pointer-events-none">
      <div className="pointer-events-auto">
        <WindowFrame
          appId="finder"
          instanceId={instanceId}
          title={displayService.name}
          onClose={() => onOpenChange(false)}
          isForeground={true}
        >
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <div className="mb-6 flex items-center">
              <span className="text-4xl mr-3">{displayService.icon}</span>
              <h3 className="font-chicago text-xl">{displayService.name}</h3>
            </div>
            
            <p className="mb-4 text-sm font-geneva-12">{displayService.description}</p>
            
            {serviceDetails?.approach && (
              <div className="mb-4">
                <h4 className="font-chicago text-sm mb-2">Our Approach:</h4>
                <p className="text-sm font-geneva-12">{serviceDetails.approach}</p>
              </div>
            )}
            
            <div className="mb-4">
              <h4 className="font-chicago text-sm mb-2">Benefits:</h4>
              <ul className="list-disc pl-5 text-sm font-geneva-12">
                {benefits.map((benefit, index) => (
                  <li key={index} className="mb-1">{benefit}</li>
                ))}
              </ul>
            </div>
            
            {serviceDetails?.deliverables && (
              <div className="mb-4">
                <h4 className="font-chicago text-sm mb-2">Deliverables:</h4>
                <ul className="list-disc pl-5 text-sm font-geneva-12">
                  {serviceDetails.deliverables.map((deliverable, index) => (
                    <li key={index} className="mb-1">{deliverable}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-[#3B3B3B] text-white text-xs px-2 py-1 rounded-sm font-geneva-12"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                onClick={() => onOpenChange(false)}
                className="bg-[#3B3B3B] text-white font-chicago hover:bg-black text-sm px-4"
              >
                Close
              </Button>
            </div>
          </div>
        </WindowFrame>
      </div>
    </div>
  );
}
