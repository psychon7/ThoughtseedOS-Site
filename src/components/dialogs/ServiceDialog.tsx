import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WindowFrame } from "@/components/layout/WindowFrame";

interface ServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  service: {
    name: string;
    description: string;
    icon: string;
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

  // Sample benefits for service (in a real app, these would come from a data source)
  const benefits = [
    "Personalized strategic approach",
    "Data-driven methodologies",
    "Expert team with industry experience"
  ];
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[5000] pointer-events-none">
      <div className="pointer-events-auto">
        <WindowFrame
          appId="finder"
          instanceId={instanceId}
          title={service.name}
          onClose={() => onOpenChange(false)}
          isForeground={true}
        >
          <div className="p-4">
            <div className="mb-6 flex items-center">
              <span className="text-4xl mr-3">{service.icon}</span>
              <h3 className="font-chicago text-xl">{service.name}</h3>
            </div>
            
            <p className="mb-4 text-sm font-geneva-12">{service.description}</p>
            
            <div className="mb-4">
              <h4 className="font-chicago text-sm mb-2">Benefits:</h4>
              <ul className="list-disc pl-5 text-sm font-geneva-12">
                {benefits.map((benefit, index) => (
                  <li key={index} className="mb-1">{benefit}</li>
                ))}
              </ul>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {["Strategy", "Growth", "Innovation"].map((tag, index) => (
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
