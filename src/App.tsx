import { AppManager } from "./apps/base/AppManager";
import { appRegistry } from "./config/appRegistry";
import { useEffect, useState } from "react";
import { applyDisplayMode } from "./utils/displayMode";
import { Toaster } from "./components/ui/sonner";
import { useAppStoreShallow } from "@/stores/helpers";
import { BootScreen } from "./components/dialogs/BootScreen";
// import { getNextBootMessage, clearNextBootMessage } from "./utils/bootMessage";
import { AnyApp } from "./apps/base/types";

// Convert registry to array
const apps: AnyApp[] = Object.values(appRegistry);

function App() {
  const { displayMode, isFirstBoot, setHasBooted } = useAppStoreShallow(
    (state) => ({
      displayMode: state.displayMode,
      isFirstBoot: state.isFirstBoot,
      setHasBooted: state.setHasBooted,
    })
  );
  // const [bootScreenMessage, setBootScreenMessage] = useState<string | null>(null);
  // Always show boot screen on initial load
  const [showBootScreen, setShowBootScreen] = useState(true);
  // Track if boot animation has completed
  // const [bootCompleted, setBootCompleted] = useState(false);

  useEffect(() => {
    applyDisplayMode(displayMode);
  }, [displayMode]);

  useEffect(() => {
    // Check for system operation boot messages
    // const persistedMessage = getNextBootMessage();
    // if (persistedMessage) {
    //   setBootScreenMessage(persistedMessage);
    // }

    // Mark as booted in app state
    if (isFirstBoot) {
      setHasBooted();
    }

    // Update document title
    document.title = "ThoughtSeedOS";
    
    // Update meta descriptions
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ThoughtSeedOS - Vintage Mac-style virtual desktop experience');
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'ThoughtSeedOS - Vintage Mac-style virtual desktop experience');
    }
    
    const twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', 'ThoughtSeedOS - Vintage Mac-style virtual desktop experience');
    }
  }, [isFirstBoot, setHasBooted]);

  // Handle boot completion
  const handleBootComplete = () => {
    // clearNextBootMessage();
    // setBootCompleted(true);
    // Delay hiding the boot screen to allow for smooth transition
    setTimeout(() => {
      setShowBootScreen(false);
    }, 500);
  };

  if (showBootScreen) {
    return (
      <BootScreen
        isOpen={true}
        onOpenChange={() => {}}
        onBootComplete={handleBootComplete}
      />
    );
  }

  return (
    <>
      <AppManager apps={apps} />
      <Toaster
        position="bottom-left"
        offset={`calc(env(safe-area-inset-bottom, 0px) + 32px)`}
      />
    </>
  );
}

export default App;
