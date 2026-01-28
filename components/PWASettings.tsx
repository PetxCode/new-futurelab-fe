import React, { useEffect, useState } from "react";
import { pwaManager } from "../pwaUtils";

interface CacheStats {
  cacheNames: string[];
  totalSize: number;
  usage: number;
  quota: number;
  percentage: number;
}

/**
 * Component for managing PWA cache and storage settings
 */
export const PWASettings: React.FC = () => {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const cacheStats = await pwaManager.getCacheStats();
      const storageStats = await pwaManager.getStorageStats();

      setStats({
        ...cacheStats,
        usage: storageStats.usage,
        quota: storageStats.quota,
        percentage: storageStats.percentage,
      });
    } catch (error) {
      console.error("Failed to load cache stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = async () => {
    if (
      !window.confirm(
        "Are you sure you want to clear all cached data? You may need to re-download some content.",
      )
    ) {
      return;
    }

    setClearing(true);
    try {
      await pwaManager.clearAllCaches();
      await loadStats();
      alert("Cache cleared successfully!");
    } catch (error) {
      console.error("Failed to clear cache:", error);
      alert("Failed to clear cache");
    } finally {
      setClearing(false);
    }
  };

  const handleRequestPersistentStorage = async () => {
    try {
      const persisted = await pwaManager.requestPersistentStorage();
      if (persisted) {
        alert(
          "Persistent storage granted! Your data will be preserved even if space is low.",
        );
      } else {
        alert("Persistent storage was not granted.");
      }
    } catch (error) {
      console.error("Failed to request persistent storage:", error);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-400">Loading cache information...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 font-heading">
          Offline Storage
        </h3>

        {/* Storage Usage */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Storage Usage</span>
              <span className="text-sm text-slate-400">
                {formatBytes(stats?.usage || 0)} /{" "}
                {formatBytes(stats?.quota || 0)}
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(stats?.percentage || 0, 100)}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {stats?.percentage || 0}% of available storage used
            </p>
          </div>

          {/* Cache Information */}
          <div className="pt-4 border-t border-slate-700">
            <h4 className="text-sm font-medium mb-2">Cached Data:</h4>
            {stats?.cacheNames && stats.cacheNames.length > 0 ? (
              <ul className="space-y-1">
                {stats.cacheNames.map((cacheName) => (
                  <li
                    key={cacheName}
                    className="text-sm text-slate-400 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full" />
                    {cacheName}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-400">No cached data yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleRequestPersistentStorage}
          className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          Enable Persistent Storage
        </button>
        <button
          onClick={handleClearCache}
          disabled={clearing}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-700 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
        >
          {clearing ? "Clearing..." : "Clear All Cache"}
        </button>
      </div>

      {/* Info */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h4 className="text-sm font-medium mb-2">Offline Features:</h4>
        <ul className="text-sm text-slate-400 space-y-1">
          <li className="flex items-center gap-2">
            <span>✓</span> View your courses and assignments
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Use the code editor
          </li>
          <li className="flex items-center gap-2">
            <span>✓</span> Play coding games
          </li>
          <li className="flex items-center gap-2">
            <span>✗</span> Sync with server (works when online)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PWASettings;
