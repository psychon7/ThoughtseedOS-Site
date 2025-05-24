import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AboutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  metadata: {
    name: string;
    version: string;
    creator: {
      name: string;
      url: string;
    };
    description?: string;
    github?: string;
    icon: string;
  };
}

export function AboutDialog({
  isOpen,
  onOpenChange,
  metadata,
}: AboutDialogProps) {
  // Ensure dialog appears on top when opened
  useEffect(() => {
    if (isOpen) {
      // Force dialog to the foreground with highest z-index
      const dialogElement = document.querySelector('.about-dialog-content');
      if (dialogElement) {
        dialogElement.parentElement?.style.setProperty('z-index', '9999');
      }
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="about-dialog-content fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-system7-window-bg border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] max-w-[280px] z-[5000]">
        <DialogHeader className="flex justify-between items-center p-2 border-b border-gray-300">
          <DialogTitle className="font-chicago text-center w-full">About {metadata.name}</DialogTitle>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)} className="absolute right-2 top-2">
            <X className="h-4 w-4" />
          </Button>
          <DialogDescription className="sr-only">Information about the application</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-center p-4 pb-8">
          <div>
          </div>

          {metadata.description && (
            <>
              <div className="w-full border-t border-gray-300 my-2" />
              <div className="text-center text-xs font-geneva-12">
                <p>{metadata.description}</p>
              </div>
            </>
          )}

          <div className="w-full border-t border-gray-300 my-2" />

          <div className="text-center text-xs font-geneva-12">
            <p>Created by <a href={metadata.creator.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{metadata.creator.name}</a></p>
          </div>

          {metadata.github && (
            <>
              <div className="w-full border-t border-gray-300 my-2" />
              <div className="text-center text-xs font-geneva-12">
                <p>
                  <a href={metadata.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View on GitHub
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
