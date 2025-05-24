import { AnyApp } from "@/apps/base/types";
import { AppManagerState } from "@/apps/base/types";
import { AppId } from "@/config/appRegistry";
import { useState, useEffect, useRef } from "react";
import { FileIcon } from "@/apps/finder/components/FileIcon";
import { getAppIconPath } from "@/config/appRegistry";
import { useWallpaper } from "@/hooks/useWallpaper";
import { ProjectsFolder } from "@/apps/finder/components/ProjectsFolder";

interface DesktopStyles {
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundRepeat?: string;
  backgroundPosition?: string;
  transition?: string;
}

interface DesktopProps {
  apps: AnyApp[];
  appStates: AppManagerState;
  toggleApp: (appId: AppId, initialData?: unknown) => void;
  onClick?: () => void;
  desktopStyles?: DesktopStyles;
}

export function Desktop({
  apps,
  toggleApp,
  onClick,
  desktopStyles,
}: DesktopProps) {
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  // We only need to store the state of the Projects folder window
  const [isProjectsFolderOpen, setIsProjectsFolderOpen] = useState(false);
  const { wallpaperSource, isVideoWallpaper } = useWallpaper();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add visibility change and focus handlers to resume video playback
  useEffect(() => {
    if (!isVideoWallpaper || !videoRef.current) return;

    const resumeVideoPlayback = async () => {
      const video = videoRef.current;
      if (!video) return;

      try {
        // If video has ended, reset it to the beginning
        if (video.ended) {
          video.currentTime = 0;
        }

        // Only attempt to play if the video is ready
        if (video.readyState >= 3) {
          // HAVE_FUTURE_DATA or better
          await video.play();
        } else {
          // If video isn't ready, wait for it to be ready
          const handleCanPlay = () => {
            video.play().catch((err) => {
              console.warn("Could not resume video playback:", err);
            });
            video.removeEventListener("canplay", handleCanPlay);
          };
          video.addEventListener("canplay", handleCanPlay);
        }
      } catch (err) {
        console.warn("Could not resume video playback:", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resumeVideoPlayback();
      }
    };

    const handleFocus = () => {
      resumeVideoPlayback();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [isVideoWallpaper]);

  // Add video ready state handling
  useEffect(() => {
    if (!isVideoWallpaper || !videoRef.current) return;

    const video = videoRef.current;
    const handleCanPlayThrough = () => {
      if (video.paused) {
        video.play().catch((err) => {
          console.warn("Could not start video playback:", err);
        });
      }
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
    };
  }, [isVideoWallpaper]);

  const getWallpaperStyles = (path: string): DesktopStyles => {
    if (!path || isVideoWallpaper) return {};

    const isTiled = path.includes("/wallpapers/tiles/");
    return {
      backgroundImage: `url(${path})`,
      backgroundSize: isTiled ? "64px 64px" : "cover",
      backgroundRepeat: isTiled ? "repeat" : "no-repeat",
      backgroundPosition: "center",
      transition: "background-image 0.3s ease-in-out",
    };
  };

  // Set a specific ThoughtSeed wallpaper for the desktop
  const thoughtseedWallpaper = "/assets/wallpapers/blurred-blue.jpg";
  
  const finalStyles = {
    ...getWallpaperStyles(thoughtseedWallpaper),
    ...desktopStyles,
  };

  const handleIconClick = (
    appId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation();
    setSelectedAppId(appId);
  };

  // Handler for Projects folder icon click
  const handleProjectsFolderClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setSelectedAppId('projects-folder');
  };

  // Handler for Projects folder double-click
  const handleProjectsFolderOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsProjectsFolderOpen(true);
  };

  // Note: Project click/open handlers are now in the ProjectsFolder component

  const handleFinderOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    localStorage.setItem("app_finder_initialPath", "/");
    const finderApp = apps.find((app) => app.id === "finder");
    if (finderApp) {
      toggleApp(finderApp.id);
    }
    setSelectedAppId(null);
  };

  return (
    <div className="relative h-full w-full">
      {/* Project dialog at top level for maximum z-index */}
      {/* Project windows are now handled within the ProjectsFolder component */}
      
      <ProjectsFolder
        isOpen={isProjectsFolderOpen}
        onOpenChange={setIsProjectsFolderOpen}
      />
      
      <div
        className="absolute inset-0 min-h-screen h-full z-[1] desktop-background"
        onClick={onClick}
        style={finalStyles}
      >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[-10]"
        src={wallpaperSource}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        data-webkit-playsinline="true"
        style={{
          display: isVideoWallpaper ? "block" : "none"
        }}
      />
      <div className="pt-8 p-4 flex flex-col items-end h-[calc(100%-2rem)] relative z-[1]">
        {/* ThoughtSeed Welcome Text */}
        <div className="absolute top-10 left-10 max-w-[50%] md:max-w-[40%] bg-white/80 p-4 rounded shadow-md z-[0]">
          <h1 className="font-chicago text-2xl mb-2">Welcome to ThoughtSeedOS</h1>
          <p className="text-sm mb-3">Growing innovation since 2020</p>
          <p className="text-xs">Double click on any project icon to explore our work or use the menu bar to navigate services and other features.</p>
        </div>
        
        {/* All Icons Column */}
        <div className="flex flex-col flex-wrap-reverse justify-start gap-3 content-start">
          <FileIcon
            name="ThoughtSeed HD"
            isDirectory={true}
            icon="/icons/disk.png"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAppId("macintosh-hd");
            }}
            onDoubleClick={handleFinderOpen}
            isSelected={selectedAppId === "macintosh-hd"}
            size="large"
          />
          {/* System app icons (limited to 3) */}
          {apps
            .filter((app) => app.id !== "finder" && app.id !== "control-panels" && app.id !== "synth" && app.id !== "ipod" && !app.id.startsWith('project-'))
            .slice(0, 3) 
            .map((app) => (
              <FileIcon
                key={app.id}
                name={app.name}
                isDirectory={false}
                icon={getAppIconPath(app.id)}
                onClick={(e) => handleIconClick(app.id, e)}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  toggleApp(app.id);
                  setSelectedAppId(null);
                }}
                isSelected={selectedAppId === app.id}
                size="large"
              />
            ))}
          {/* Projects Folder Icon */}
          <div 
            className={`flex flex-col items-center justify-center cursor-pointer p-1 ${selectedAppId === 'projects-folder' ? 'bg-gray-200/30 rounded' : ''}`}
            onClick={handleProjectsFolderClick}
            onDoubleClick={handleProjectsFolderOpen}
          >
            <div className="w-12 h-12 mb-1 flex items-center justify-center">
              <img 
                src="/icons/directory.png" 
                alt="Projects"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="text-center font-geneva-12 text-[11px] leading-none text-white drop-shadow-sm whitespace-nowrap pt-1">
              Projects
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
