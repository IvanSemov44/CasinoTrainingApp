import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface Window {
    deferredPrompt?: BeforeInstallPromptEvent;
  }
}

/**
 * Custom hook for managing PWA install prompt functionality
 *
 * @returns Object containing install state and install function
 * @example
 * ```tsx
 * const { isInstallable, isInstalled, install } = useInstallPrompt();
 *
 * if (isInstallable && !isInstalled) {
 *   return <button onClick={install}>Install App</button>;
 * }
 * ```
 */
export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // Always assume installable if on web (beforeinstallprompt may not fire but app still is installable)
  const [isInstallable, setIsInstallable] = useState(typeof window !== 'undefined');
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Only run on web platform
    if (typeof window === 'undefined') {
      return;
    }

    // Check if app is already installed
    if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const evt = event as BeforeInstallPromptEvent;
      window.deferredPrompt = evt;
      setInstallPrompt(evt);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      window.deferredPrompt = undefined;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    // Try native beforeinstallprompt first
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;

        if (outcome === 'accepted') {
          setIsInstalled(true);
          setIsInstallable(false);
          setInstallPrompt(null);
          return;
        }
      } catch (error) {
        // Fall through to alternative methods
      }
    }

    // Fallback: Try Chrome Web Store install (if available)
    const windowWithChrome = window as unknown as {
      chrome?: { webstore?: { install?: () => void } };
    };
    if (typeof windowWithChrome.chrome?.webstore?.install === 'function') {
      try {
        windowWithChrome.chrome.webstore.install?.();
        setIsInstalled(true);
        return;
      } catch {
        // Chrome Web Store install not available
      }
    }

    // Fallback: beforeinstallprompt not available
    throw new Error('Install prompt not available');
  };

  return {
    isInstallable,
    isInstalled,
    install,
  };
}
