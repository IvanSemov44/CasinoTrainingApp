/**
 * Network status hook for detecting connectivity
 *
 * Note: This is a basic implementation. For full functionality,
 * install @react-native-community/netinfo:
 * npm install @react-native-community/netinfo
 */
import { useState, useEffect } from 'react';

export interface NetworkStatus {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string | null;
}

/**
 * Hook to monitor network connectivity status
 *
 * For production, install @react-native-community/netinfo
 * and this hook will automatically use it.
 */
export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: null,
    isInternetReachable: null,
    type: 'unknown',
  });

  useEffect(() => {
    // Try to use @react-native-community/netinfo if available
    const setupNetInfo = async () => {
      try {
        // Dynamic import - will fail if package not installed
        const NetInfo = require('@react-native-community/netinfo');

        // Get initial state
        NetInfo.fetch().then(
          (state: { isConnected: boolean; isInternetReachable: boolean; type: string }) => {
            setNetworkStatus({
              isConnected: state.isConnected,
              isInternetReachable: state.isInternetReachable,
              type: state.type,
            });
          }
        );

        // Subscribe to changes
        const unsubscribe = NetInfo.addListener(
          (state: { isConnected: boolean; isInternetReachable: boolean; type: string }) => {
            setNetworkStatus({
              isConnected: state.isConnected,
              isInternetReachable: state.isInternetReachable,
              type: state.type,
            });
          }
        );

        return unsubscribe;
      } catch {
        // Fallback for when netinfo is not available
        // Assume connected in dev mode, unknown in production
        setNetworkStatus({
          isConnected: __DEV__ ? true : null,
          isInternetReachable: __DEV__ ? true : null,
          type: 'unknown',
        });
        return undefined;
      }
    };

    const unsubscribe = setupNetInfo();

    return () => {
      if (unsubscribe && typeof unsubscribe.then === 'function') {
        unsubscribe.then((cleanup?: () => void) => cleanup?.());
      }
    };
  }, []);

  return networkStatus;
}

/**
 * Hook to check if the app is online
 */
export function useIsOnline(): boolean {
  const { isConnected } = useNetworkStatus();
  return isConnected === true;
}

export default useNetworkStatus;
