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

export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Only run on web platform
    if (typeof window === 'undefined') {
      console.log('[PWA] Not in browser environment');
      return;
    }

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      console.log('[PWA] App already installed in standalone mode');
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      console.log('[PWA] beforeinstallprompt event fired');
      event.preventDefault();
      const evt = event as BeforeInstallPromptEvent;
      window.deferredPrompt = evt;
      setInstallPrompt(evt);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('[PWA] appinstalled event fired');
      setIsInstalled(true);
      setIsInstallable(false);
      setInstallPrompt(null);
      window.deferredPrompt = undefined;
    };

    console.log('[PWA] Setting up install prompt listeners');
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;

    try {
      await installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;

      if (outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setInstallPrompt(null);
      }
    } catch (error) {
      console.error('Installation error:', error);
    }
  };

  return {
    isInstallable,
    isInstalled,
    install,
  };
}
