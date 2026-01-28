/**
 * PWA Utilities for offline functionality and updates
 */

import React from "react";

export interface PWAUpdateEvent {
  type: "update" | "offline" | "online";
  message: string;
}

class PWAManager {
  private listeners: Set<(event: PWAUpdateEvent) => void> = new Set();
  private swRegistration: ServiceWorkerRegistration | null = null;
  private isOnline = navigator.onLine;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Handle online/offline events
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.notifyListeners({
        type: "online",
        message: "You are back online. Syncing data...",
      });
      this.checkForUpdates();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
      this.notifyListeners({
        type: "offline",
        message: "You are offline. Changes will sync when you are back online.",
      });
    });
  }

  /**
   * Subscribe to PWA events
   */
  subscribe(callback: (event: PWAUpdateEvent) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of PWA events
   */
  private notifyListeners(event: PWAUpdateEvent) {
    this.listeners.forEach((listener) => listener(event));
  }

  /**
   * Check if app is online
   */
  getOnlineStatus(): boolean {
    return this.isOnline;
  }

  /**
   * Check for service worker updates
   */
  async checkForUpdates() {
    if (!("serviceWorker" in navigator)) {
      console.warn("Service Worker not supported");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();
        this.swRegistration = registration;
      }
    } catch (error) {
      console.error("Failed to check for updates:", error);
    }
  }

  /**
   * Skip waiting and activate new service worker
   */
  async skipWaiting() {
    if (this.swRegistration?.waiting) {
      this.swRegistration.waiting.postMessage({ type: "SKIP_WAITING" });
      // Reload after a short delay to allow SW to update
      setTimeout(() => window.location.reload(), 500);
    }
  }

  /**
   * Get cache statistics
   */
  async getCacheStats(): Promise<{
    cacheNames: string[];
    totalSize: number;
  }> {
    if (!("caches" in window)) {
      return { cacheNames: [], totalSize: 0 };
    }

    const cacheNames = await caches.keys();
    let totalSize = 0;

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const responses = await cache.matchAll();

      for (const response of responses) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }

    return {
      cacheNames,
      totalSize,
    };
  }

  /**
   * Clear all caches
   */
  async clearAllCaches(): Promise<boolean> {
    if (!("caches" in window)) {
      return false;
    }

    const cacheNames = await caches.keys();
    const results = await Promise.all(
      cacheNames.map((name) => caches.delete(name)),
    );

    return results.every((result) => result);
  }

  /**
   * Clear specific cache
   */
  async clearCache(cacheName: string): Promise<boolean> {
    if (!("caches" in window)) {
      return false;
    }

    return caches.delete(cacheName);
  }

  /**
   * Prefetch critical resources for offline use
   */
  async prefetchResources(urls: string[]): Promise<void> {
    if (!("caches" in window)) {
      return;
    }

    try {
      const cache = await caches.open("prefetch-v1");
      await cache.addAll(urls);
    } catch (error) {
      console.error("Failed to prefetch resources:", error);
    }
  }

  /**
   * Check storage quota
   */
  async getStorageStats(): Promise<{
    usage: number;
    quota: number;
    percentage: number;
  }> {
    if (!navigator.storage?.estimate) {
      return { usage: 0, quota: 0, percentage: 0 };
    }

    const estimate = await navigator.storage.estimate();
    return {
      usage: estimate.usage || 0,
      quota: estimate.quota || 0,
      percentage: Math.round(
        ((estimate.usage || 0) / (estimate.quota || 1)) * 100,
      ),
    };
  }

  /**
   * Request persistent storage
   */
  async requestPersistentStorage(): Promise<boolean> {
    if (!navigator.storage?.persist) {
      return false;
    }

    try {
      return await navigator.storage.persist();
    } catch (error) {
      console.error("Failed to request persistent storage:", error);
      return false;
    }
  }
}

// Create singleton instance
export const pwaManager = new PWAManager();

/**
 * React Hook for PWA updates
 */
export function usePWAUpdate() {
  const [pwaEvent, setPwaEvent] = React.useState<PWAUpdateEvent | null>(null);
  const [showPrompt, setShowPrompt] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = pwaManager.subscribe((event) => {
      setPwaEvent(event);
      if (event.type === "update") {
        setShowPrompt(true);
      }
    });

    return unsubscribe;
  }, []);

  const handleUpdate = () => {
    pwaManager.skipWaiting();
  };

  return { pwaEvent, showPrompt, handleUpdate, setShowPrompt };
}

// Auto-check for updates every 5 minutes
if ("serviceWorker" in navigator) {
  setInterval(() => pwaManager.checkForUpdates(), 5 * 60 * 1000);
}
