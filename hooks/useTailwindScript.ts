import { useState, useEffect } from "react";

const CACHE_KEY = "tailwind_js_v2"; // bump version to bust stale/empty cached values

export function useTailwindScript() {
  const [tailwindScript, setTailwindScript] = useState(() => {
    try {
      // Clean up old key from previous version
      localStorage.removeItem("tailwind_js");
      const cached = localStorage.getItem(CACHE_KEY) || "";
      // Reject obviously broken cached values (< 10KB means it failed to save correctly)
      return cached.length > 10000 ? cached : "";
    } catch {
      return "";
    }
  });

  useEffect(() => {
    if (!tailwindScript) {
      // Fetch the local file from public/ and cache it in localStorage
      fetch("/tailwindcss.js")
        .then((res) => res.text())
        .then((text) => {
          if (text.length < 10000) {
            console.error("tailwindcss.js seems too small — check public/tailwindcss.js");
            return;
          }
          try {
            localStorage.setItem(CACHE_KEY, text);
          } catch (e) {
            console.warn("Failed to cache tailwind to localStorage", e);
          }
          setTailwindScript(text);
        })
        .catch((err) => {
          console.error("Failed to load tailwindcss.js", err);
        });
    }
  }, [tailwindScript]);

  const [blobUrl, setBlobUrl] = useState<string>("");

  useEffect(() => {
    if (tailwindScript && !blobUrl) {
      const blob = new Blob([tailwindScript], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);
    }
  }, [tailwindScript, blobUrl]);

  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  // We use a Blob URL as the src so that document.currentScript.src is not null,
  // which is required by the Tailwind CDN for async PostCSS compilation.
  // This also guarantees it works completely offline since the file is served from memory.
  const scriptTag = blobUrl
    ? `<script src="${blobUrl}"><\/script>`
    : "";

  const isReady = !!blobUrl;

  return { tailwindScript, scriptTag, isReady, blobUrl };
}
