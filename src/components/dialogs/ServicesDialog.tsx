import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WindowFrame } from "@/components/layout/WindowFrame";
import serviceService from "@/services/serviceService";

interface ServicesDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  instanceId?: string;
  onServiceSelect?: (service: any) => void;
}

export function ServicesDialog({ 
  isOpen, 
  onOpenChange, 
  instanceId = "services-dialog",
  onServiceSelect
}: ServicesDialogProps) {
  if (!isOpen) return null;
  
  // Use useEffect to ensure window is brought to front when opened
  useEffect(() => {
    if (isOpen) {
      // Force foreground when opened
      const windowElement = document.querySelector(`[data-instance-id="${instanceId}"]`);
      if (windowElement) {
        windowElement.setAttribute('style', 'z-index: 9999 !important');
      }
    }
  }, [isOpen, instanceId]);
  
  // Get all services
  const services = serviceService.getAllServices();
  
  const handleServiceClick = (service: any) => {
    if (onServiceSelect) {
      onServiceSelect(service);
    }
    onOpenChange(false);
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[5000] pointer-events-none">
      <div className="pointer-events-auto">
        <WindowFrame
          appId="finder"
          instanceId={instanceId}
          title="ThoughtSeed Services"
          onClose={() => onOpenChange(false)}
          isForeground={true}
        >
          <div className="p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="font-chicago text-xl mb-4">Our Services</h2>
            <p className="mb-6 text-sm font-geneva-12">
              ThoughtSeed offers a range of specialized services to help businesses grow and innovate.
              Click on any service to learn more.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleServiceClick(service)}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{service.icon}</span>
                    <h3 className="font-chicago text-md">{service.name}</h3>
                  </div>
                  <p className="text-sm font-geneva-12">{service.description}</p>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
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
