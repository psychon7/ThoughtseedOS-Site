import { useState, useEffect } from "react";
import { AppleMenu } from "./AppleMenu";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { HelpDialog } from "@/components/dialogs/HelpDialog";
import { AboutDialog } from "@/components/dialogs/AboutDialog";
import { ContactDialog } from "@/components/dialogs/ContactDialog";
import { ServiceDialog } from "@/components/dialogs/ServiceDialog";
import { useLaunchApp } from "@/hooks/useLaunchApp";
import { useAppStoreShallow } from "@/stores/helpers";
import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2, VolumeX, Settings } from "lucide-react";
import { useSound, Sounds } from "@/hooks/useSound";
import { ProjectsFolder } from "@/apps/finder/components/ProjectsFolder";
import serviceService from "@/services/serviceService";

const helpItems = [
  {
    icon: "🏢",
    title: "About Us",
    description: "Learn about ThoughtSeed company and our mission",
  },
  {
    icon: "💼",
    title: "Our Services",
    description: "Explore our service offerings and expertise",
  },
  {
    icon: "📂",
    title: "View Projects",
    description: "Browse our portfolio of successful projects",
  },
  {
    icon: "✉️",
    title: "Contact Us",
    description: "Get in touch with our team",
  },
];

const thoughtseedMetadata = {
  name: "ThoughtSeedOS",
  version: "1.0.0",
  creator: {
    name: "ThoughtSeed",
    url: "#",
  },
  description: "Growing innovation since 2020",
  icon: "/icons/mac.png",
};

// Load services from the service service
const serviceItems = serviceService.getAllServices().map(service => ({
  id: service.id,
  name: service.name,
  description: service.description,
  icon: service.icon
}));

interface MenuBarProps {
  children?: React.ReactNode;
}

function Clock() {
  const [time, setTime] = useState(new Date());
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format the display based on viewport width
  let displayTime;

  if (viewportWidth < 420) {
    // For small screens: just time without AM/PM (e.g., "1:34")
    const timeString = time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    displayTime = timeString.replace(/\s?(AM|PM)$/i, "");
  } else if (viewportWidth >= 420 && viewportWidth <= 768) {
    // For medium screens: time with AM/PM (e.g., "1:00 AM")
    displayTime = time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } else {
    // For larger screens (> 768px): full date and time (e.g., "Wed May 7 1:34 AM")
    const shortWeekday = time.toLocaleDateString([], { weekday: "short" });
    const month = time.toLocaleDateString([], { month: "short" });
    const day = time.getDate();
    const timeString = time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    displayTime = `${shortWeekday} ${month} ${day} ${timeString}`;
  }

  return <div className="ml-auto mr-2">{displayTime}</div>;
}

function DefaultMenuItems() {
  const launchApp = useLaunchApp();
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isProjectsFolderOpen, setIsProjectsFolderOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof serviceItems[0] | null>(null);

  // This function was removed since we now use the Projects dialog

  const handleServiceClick = (service: typeof serviceItems[0]) => {
    setSelectedService(service);
    setIsServiceDialogOpen(true);
  };
  
  // Load services on component mount
  useEffect(() => {
    // Services are already loaded via the import
  }, []);

  return (
    <>
      {/* File Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="h-6 text-md px-2 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          >
            File
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={1} className="px-0">
          <DropdownMenuItem
            onClick={() => launchApp('finder')}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            New Finder Window
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsContactDialogOpen(true);
            }}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            New Project Inquiry
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          <DropdownMenuItem 
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Close
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="h-6 text-md px-2 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          >
            Edit
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={1} className="px-0">
          <DropdownMenuItem
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Undo
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          <DropdownMenuItem
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Cut
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Paste
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          <DropdownMenuItem
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Select All
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="h-6 text-md px-2 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          >
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={1} className="px-0">
          <DropdownMenuItem
            onClick={() => setIsHelpDialogOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Projects
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          <DropdownMenuCheckboxItem
            checked={true}
            className="text-md h-6 px-3 pl-8 active:bg-gray-900 active:text-white flex justify-between items-center"
          >
            <span>by Icon</span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={false}
            className="text-md h-6 px-3 pl-8 active:bg-gray-900 active:text-white flex justify-between items-center"
          >
            <span>by List</span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Go Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="h-6 text-md px-2 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          >
            Go
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={1} className="px-0">
          <DropdownMenuItem
            onClick={() => setIsProjectsFolderOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Projects
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsServiceDialogOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Services
          </DropdownMenuItem>
          {serviceItems.map((service, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => handleServiceClick(service)}
              className="text-md h-6 px-3 active:bg-gray-900 active:text-white flex items-center gap-2 pl-6"
            >
              <span>{service.icon}</span>
              {service.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Help Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="h-6 text-md px-2 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          >
            Help
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={1} className="px-0">
          <DropdownMenuItem
            onClick={() => setIsHelpDialogOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            ThoughtSeed Help
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          <DropdownMenuItem
            onClick={() => setIsContactDialogOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            Contact
          </DropdownMenuItem>
          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          <DropdownMenuItem
            onClick={() => setIsAboutDialogOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white"
          >
            About ThoughtSeed
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <HelpDialog
        isOpen={isHelpDialogOpen}
        onOpenChange={setIsHelpDialogOpen}
        appName="ThoughtSeed"
        helpItems={helpItems}
      />
      <AboutDialog
        isOpen={isAboutDialogOpen}
        onOpenChange={setIsAboutDialogOpen}
        metadata={thoughtseedMetadata}
      />
      <ContactDialog
        isOpen={isContactDialogOpen}
        onOpenChange={setIsContactDialogOpen}
      />
      <ServiceDialog
        isOpen={isServiceDialogOpen}
        onOpenChange={setIsServiceDialogOpen}
        service={selectedService}
      />
      <ProjectsFolder isOpen={isProjectsFolderOpen} onOpenChange={setIsProjectsFolderOpen} />
    </>
  );
}

function VolumeControl() {
  const { masterVolume, setMasterVolume } = useAppStoreShallow((s) => ({
    masterVolume: s.masterVolume,
    setMasterVolume: s.setMasterVolume,
  }));
  const { play: playVolumeChangeSound } = useSound(Sounds.VOLUME_CHANGE);
  const launchApp = useLaunchApp();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const getVolumeIcon = () => {
    if (masterVolume === 0) {
      return <VolumeX className="h-5 w-5" />;
    }
    if (masterVolume < 0.5) {
      return <Volume1 className="h-5 w-5" />;
    }
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-md px-1 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0 mr-2"
        >
          {getVolumeIcon()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        sideOffset={1}
        className="p-2 pt-4 w-auto min-w-4 h-40 flex flex-col items-center justify-center"
      >
        <Slider
          orientation="vertical"
          min={0}
          max={1}
          step={0.05}
          value={[masterVolume]}
          onValueChange={(v) => setMasterVolume(v[0])}
          onValueCommit={playVolumeChangeSound}
        />
        <Button
          variant="ghost"
          size="icon"
          className="mt-2 h-6 w-6 text-md border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          onClick={() => {
            launchApp("control-panels", {
              initialData: { defaultTab: "sound" },
            });
            setIsDropdownOpen(false);
          }}
        >
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MenuBar({ children }: MenuBarProps) {
  const { apps } = useAppContext();
  const { getForegroundInstance } = useAppStoreShallow((s) => ({
    getForegroundInstance: s.getForegroundInstance,
  }));

  const foregroundInstance = getForegroundInstance();
  const hasActiveApp = !!foregroundInstance;

  return (
    <div className="fixed top-0 left-0 right-0 flex bg-[#E0E0E0] border-b-[1px] border-black px-2 h-7 items-center shadow-sm z-[99999]"
    >
      <AppleMenu apps={apps} />
      {hasActiveApp ? children : <DefaultMenuItems />}
      <div className="ml-auto flex items-center">
        <div className="hidden sm:flex">
          <VolumeControl />
        </div>
        <Clock />
      </div>
    </div>
  );
}
