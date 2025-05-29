import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { AboutFinderDialog } from "@/components/dialogs/AboutFinderDialog";
import { AboutDialog } from "@/components/dialogs/AboutDialog";
import { AnyApp } from "@/apps/base/types";
import { AppId, appRegistry } from "@/config/appRegistry";
import { useLaunchApp } from "@/hooks/useLaunchApp";

interface AppleMenuProps {
  apps: AnyApp[];
}

const thoughtseedMetadata = {
  name: "ThoughtSeedOS",
  version: "1.1.1.1",
  creator: {
    name: "ThoughtSeed",
    url: "#",
  },
  description: "Growing innovation since 2020",
  icon: "/icons/mac.png",
};

export function AppleMenu({ apps }: AppleMenuProps) {
  const [aboutFinderOpen, setAboutFinderOpen] = useState(false);
  const [aboutThoughtSeedOpen, setAboutThoughtSeedOpen] = useState(false);
  const [registeredApps, setRegisteredApps] = useState<AnyApp[]>([]);
  const launchApp = useLaunchApp();

  // Ensure we have a complete list of apps from the registry
  useEffect(() => {
    // Use both the passed apps and ensure we have all registered apps
    const appList = apps.length > 0 ? apps : Object.values(appRegistry);
    setRegisteredApps(appList);
  }, [apps]);

  const handleAppClick = (appId: string) => {
    // Simply launch the app - the instance system will handle focus if already open
    launchApp(appId as AppId);
  };

  // No longer needed since we've removed the Projects menu item

  return (
    <>
      <AboutDialog
        isOpen={aboutThoughtSeedOpen}
        onOpenChange={setAboutThoughtSeedOpen}
        metadata={thoughtseedMetadata}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="default"
            className="h-6 text-md px-3 py-1 border-none hover:bg-gray-200 active:bg-gray-900 active:text-white focus-visible:ring-0"
          >
            <img 
              src="/icons/mac.png" 
              alt="Apple" 
              className="w-4 h-4 [image-rendering:pixelated]"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={1} className="px-0">
          <DropdownMenuItem
            onClick={() => setAboutThoughtSeedOpen(true)}
            className="text-md h-6 px-3 active:bg-gray-900 active:text-white flex items-center gap-2"
          >
            About ThoughtSeedOS
          </DropdownMenuItem>

          <DropdownMenuSeparator className="h-[2px] bg-black my-1" />
          {registeredApps.map((app) => (
            <DropdownMenuItem
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="text-md h-6 px-3 active:bg-gray-900 active:text-white flex items-center gap-2"
            >
              {typeof app.icon === "string" ? (
                <div className="w-4 h-4 flex items-center justify-center">
                  {app.icon}
                </div>
              ) : (
                <img
                  src={app.icon.src}
                  alt=""
                  className="w-4 h-4 [image-rendering:pixelated]"
                />
              )}
              {app.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <AboutFinderDialog
        isOpen={aboutFinderOpen}
        onOpenChange={setAboutFinderOpen}
      />
    </>
  );
}
