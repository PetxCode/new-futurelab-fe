import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { pwaManager } from "../pwaUtils";

/**
 * Component to handle PWA update notifications and offline status
 */
export const PWANotification: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    // Subscribe to PWA events
    const unsubscribe = pwaManager.subscribe((event) => {
      if (event.type === "online") {
        toast.success("You are back online!", { duration: 3000 });
        setIsOnline(true);
      } else if (event.type === "offline") {
        toast.error("You are offline. Changes will sync when you reconnect.", {
          duration: 4000,
        });
        setIsOnline(false);
      } else if (event.type === "update") {
        setShowUpdate(true);
      }
    });

    // Update online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      unsubscribe();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-sm z-50">
          <div className="bg-red-600 text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
            <svg
              className="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 2.476m8.6 10.368A6 6 0 015.477 5.11m10.89 4.768A8.987 8.987 0 002.5 10c0 4.97 4.03 9 9 9 1.977 0 3.84-.605 5.39-1.64"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium text-sm">You are offline</span>
          </div>
        </div>
      )}

      {/* Update available notification */}
      {showUpdate && (
        <div className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-sm z-50">
          <div className="bg-blue-600 text-white rounded-lg px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 flex-shrink-0 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="font-medium text-sm">Update available</span>
            </div>
            <button
              onClick={() => {
                setShowUpdate(false);
                pwaManager.skipWaiting();
              }}
              className="flex-shrink-0 font-semibold text-sm hover:underline"
            >
              Install
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PWANotification;
