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
  "Loading ThoughtSeedOS kernel...",
  "Initializing system components...",
  "Mounting virtual file system...",
  "Loading graphic subsystems...",
  "Checking memory integrity...",
  "ThoughtSeedOS since 2020. Growing innovation through 2025.",
  "Creating bespoke technology solutions...",
  "Loading brand strategy module...",
  "Initializing growth marketing services...",
  "Mounting portfolio projects...",
  "Preparing desktop environment...",
  "Starting user interface...",
  "System ready. Welcome to ThoughtSeedOS."
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
          
          <div className="flex flex-col h-full w-full p-4 overflow-hidden">
            {/* Terminal logs */}
            <div className="flex-1 overflow-auto font-mono text-[#00FF00] text-sm mb-4">
              {visibleLogs.map((log, i) => (
                <div key={i} className="mb-1">
                  <span className="text-white mr-1">&gt;</span> {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
            
            {/* Progress bar */}
            {visibleLogs.length >= bootLogs.length && (
              <div className="w-[80%] mx-auto mb-8">
                <div className="flex justify-between text-[#00FF00] text-xs mb-1">
                  <span>'20</span>
                  <span>'21</span>
                  <span>'22</span>
                  <span>'23</span>
                  <span>'24</span>
                  <span>'25</span>
                </div>
                <div className="h-5 border border-[#333333] bg-[#111111] rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-[#00FF00] transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPrimitive.Portal>
    </Dialog>
  );
}