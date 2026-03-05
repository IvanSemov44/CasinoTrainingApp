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
  // Always assume installable if on web (beforeinstallprompt may not fire but app still is installable)
  const [isInstallable, setIsInstallable] = useState(typeof window !== 'undefined');
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
    console.log('[useInstallPrompt] install() called. installPrompt:', !!installPrompt);

    // Try native beforeinstallprompt first
    if (installPrompt) {
      try {
        console.log('[useInstallPrompt] Using native beforeinstallprompt');
        await installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;

        if (outcome === 'accepted') {
          console.log('[useInstallPrompt] User accepted installation');
          setIsInstalled(true);
          setIsInstallable(false);
          setInstallPrompt(null);
          return;
        }
      } catch (error) {
        console.error('[useInstallPrompt] Native prompt error:', error);
        // Fall through to alternative methods
      }
    }

    // Fallback: Try Chrome Web Store install (if available)
    if (typeof (window as any).chrome?.webstore?.install === 'function') {
      console.log('[useInstallPrompt] Trying Chrome Web Store install');
      try {
        (window as any).chrome.webstore.install();
        setIsInstalled(true);
        return;
      } catch (error) {
        console.log('[useInstallPrompt] Chrome Web Store install not available');
      }
    }

    // Fallback: beforeinstallprompt not available
    console.log('[useInstallPrompt] beforeinstallprompt not available');
    throw new Error('Install prompt not available');
  };

  return {
    isInstallable,
    isInstalled,
    install,
  };
}
