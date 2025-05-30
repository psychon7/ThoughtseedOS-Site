import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useSound, Sounds } from "@/hooks/useSound";

interface BootScreenProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBootComplete?: () => void;
  title?: string;
}

// Boot log messages
const bootLogs = [
  "ThoughtSeedOS Bootloader v4.2 initializing...",
  "Waking synaptic cores...",
  "Infusing creative DNA into kernel...",
  "Assembling pixel-perfect aesthetics...",
  "Decrypting strategic blueprints...",
  "Linking neural nodes to growth algorithms...",
  "Spawning bespoke solution daemons...",
  "Optimizing brand resonance vectors...",
  "Activating inbound marketing modules...",
  "Uploading portfolio DNA into grid...",
  "Rendering ideation layer...",
  "Igniting UI dreamscape...",
  "ThoughtSeedOS has awakened. Planting ideas. Growing impact."
];

export function BootScreen({
  isOpen,
  onOpenChange,
  onBootComplete,
}: BootScreenProps) {
  const { play } = useSound(Sounds.BOOT, 0.5);
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);
  const [showDesktop, setShowDesktop] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of logs automatically
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleLogs]);
  
  useEffect(() => {
    let logInterval: number;
    let progressInterval: number;
    let bootCompleteTimer: number;
    
    if (isOpen) {
      // Play boot sound
      play();
      
      // Display logs one by one
      let logIndex = 0;
      logInterval = window.setInterval(() => {
        if (logIndex < bootLogs.length) {
          setVisibleLogs(prev => [...prev, bootLogs[logIndex]]);
          logIndex++;
        } else {
          window.clearInterval(logInterval);
          
          // Start progress bar animation after logs are complete
          progressInterval = window.setInterval(() => {
            setProgress(prev => {
              const newProgress = prev + 1;
              if (newProgress >= 100) {
                window.clearInterval(progressInterval);
                return 100;
              }
              return newProgress;
            });
          }, 30);
        }
      }, 300);
      
      // Complete boot after logs and progress bar
      bootCompleteTimer = window.setTimeout(() => {
        setShowDesktop(true);
        
        // Fade out and complete
        const fadeTimer = window.setTimeout(() => {
          onBootComplete?.();
          onOpenChange(false);
        }, 1000);
        
        return () => window.clearTimeout(fadeTimer);
      }, 7000);
    } else {
      setProgress(0);
      setVisibleLogs([]);
      setShowDesktop(false);
    }
    
    return () => {
      window.clearInterval(logInterval);
      window.clearInterval(progressInterval);
      window.clearTimeout(bootCompleteTimer);
    };
  }, [isOpen, play, onBootComplete, onOpenChange]);
  
  if (!isOpen) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {}} modal>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay 
          className="fixed inset-0 z-[75] bg-black backdrop-blur-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <DialogContent 
          className="bg-black p-0 w-full h-full border-none shadow-none z-[80] outline-none overflow-hidden"
          style={{ position: 'fixed', zIndex: 80, transition: 'opacity 1s ease-in-out', opacity: showDesktop ? 0 : 1 }}
        >
          <VisuallyHidden>
            <DialogTitle>ThoughtSeedOS Boot</DialogTitle>
          </VisuallyHidden>
          
          <div className="flex flex-col h-full w-full p-6 overflow-hidden">
            {/* Terminal logs */}
            <div className="flex-1 overflow-auto font-mono text-white text-sm mb-4">
              {visibleLogs.map((log, i) => (
                <div key={i} className="mb-1">
                  <span className="text-white mr-1">&gt;</span> {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
            
            {/* Progress bar */}
            {visibleLogs.length >= bootLogs.length && (
              <div className="w-full mb-8 pl-2">
                <div className="flex justify-between text-white text-xs mb-1">
                  <span>'20</span>
                  <span>'21</span>
                  <span>'22</span>
                  <span>'23</span>
                  <span>'24</span>
                  <span>'25</span>
                </div>
                <div className="h-4 border border-white bg-black overflow-hidden font-mono">
                  <div 
                    className="h-full bg-white transition-all duration-200 flex items-center px-1 justify-start"
                    style={{ width: `${progress}%` }}
                  >
                    {progress >= 10 && <span className="text-black text-xs">Loading...</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}