# PWA Quick Reference Guide

## 🚀 Quick Start Commands

### Development

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Testing Locally

```bash
# Build first
npm run build

# Start preview server in another terminal
npm run preview

# Then open: http://localhost:4173 in your browser
```

## 📱 Installation on Devices

### Desktop (Chrome/Edge)

1. Open app in browser
2. Click install button in address bar (or app menu)
3. Click "Install"
4. App opens as a window

### Mobile (Android)

1. Open app in Chrome
2. Tap menu (three dots)
3. Select "Install app"
4. App appears on home screen

### Mobile (iOS 16.4+)

1. Open app in Safari
2. Tap share button
3. Select "Add to Home Screen"
4. App appears on home screen

## 🧪 Testing Offline

### In Browser DevTools

```
1. Open DevTools (F12 or Cmd+Option+I)
2. Go to Network tab
3. Find the "Throttling" dropdown
4. Select "Offline"
5. Page refreshes and continues working
```

### Checking Service Worker

```
1. DevTools → Application tab
2. Service Workers section
3. Should show active service worker
4. Green dot = running, grey = stopped
```

### Checking Caches

```
1. DevTools → Application tab
2. Storage → Cache Storage
3. See all cached resources:
   - images
   - static-resources
   - cdn-resources
   - fonts
   - api-calls
```

### Checking Manifest

```
1. DevTools → Application tab
2. Manifest section
3. Shows app name, icons, colors, etc.
```

## 💻 Integration Code Examples

### Add to App.tsx (Minimal)

```tsx
import PWANotification from "./components/PWANotification";

function App() {
  return (
    <>
      <PWANotification />
      {/* Your app content */}
    </>
  );
}
```

### Add to Settings Page (Optional)

```tsx
import PWASettings from "./components/PWASettings";

function SettingsPage() {
  return (
    <section>
      <h2>Offline & Storage</h2>
      <PWASettings />
    </section>
  );
}
```

### Use PWA Manager Directly

```tsx
import { pwaManager } from "../pwaUtils";
import { useEffect } from "react";

function MyComponent() {
  useEffect(() => {
    // Check online status
    const isOnline = pwaManager.getOnlineStatus();
    console.log("Online:", isOnline);

    // Subscribe to events
    const unsubscribe = pwaManager.subscribe((event) => {
      console.log(`${event.type}: ${event.message}`);
    });

    return unsubscribe;
  }, []);

  return <div>Your component</div>;
}
```

## 🔧 Configuration Changes

### Adjust Cache Size

**File:** `vite.config.ts`

Find this line:

```typescript
maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB
```

Change to (e.g., 10MB):

```typescript
maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
```

### Adjust Cache Duration

**File:** `vite.config.ts`

In `runtimeCaching` array, change `maxAgeSeconds`:

```typescript
expiration: {
  maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
}
```

Examples:

- 1 hour: `60 * 60`
- 1 day: `24 * 60 * 60`
- 7 days: `7 * 24 * 60 * 60`
- 30 days: `30 * 24 * 60 * 60`

### Change App Name/Colors

**File:** `public/manifest.json`

```json
{
  "name": "Your App Name",
  "short_name": "AppName",
  "theme_color": "#000000",
  "background_color": "#ffffff",
  "description": "Your app description"
}
```

## 🔍 Debugging Commands

### Clear All Service Workers

```javascript
// In browser console:
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((r) => r.unregister());
});
```

### Clear All Caches

```javascript
// In browser console:
caches.keys().then((names) => {
  names.forEach((name) => caches.delete(name));
});
```

### Get Cache Statistics

```javascript
// In browser console:
async function getCacheStats() {
  const cacheNames = await caches.keys();
  let totalSize = 0;

  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const responses = await cache.matchAll();

    for (const response of responses) {
      const blob = await response.blob();
      totalSize += blob.size;
    }
  }

  console.log("Total cache size:", totalSize, "bytes");
  console.log("Cache stores:", cacheNames);
}

getCacheStats();
```

### Check Service Worker Status

```javascript
// In browser console:
navigator.serviceWorker.ready.then((reg) => {
  console.log("SW Active:", !!reg.active);
  console.log("SW Waiting:", !!reg.waiting);
  console.log("SW Installing:", !!reg.installing);
  console.log("Registration:", reg);
});
```

## 📊 Performance Monitoring

### Check Network Requests

```javascript
// In browser console (will show in Network tab):
// Load performance data
const perfData = performance.getEntriesByType("resource");
perfData.forEach((entry) => {
  console.log(`${entry.name}: ${Math.round(entry.duration)}ms`);
});
```

### Monitor Cache Hit Ratio

```javascript
// This would typically be done server-side or via analytics
// But you can log it locally:
localStorage.setItem(
  "cacheHits",
  parseInt(localStorage.getItem("cacheHits") || 0) + 1,
);
```

## 🆘 Common Issues & Quick Fixes

| Issue                         | Solution                                        |
| ----------------------------- | ----------------------------------------------- |
| Service Worker not updating   | DevTools → SW → Update, then Ctrl+Shift+R       |
| App won't install             | Enable HTTPS, verify manifest valid JSON        |
| Offline page not showing      | Check offline.html exists, rebuild app          |
| Cache too large               | Use PWASettings to clear, reduce cache duration |
| Still offline after reconnect | DevTools → SW → Update, reload page             |
| Icons not showing             | Verify logo.png exists, check manifest paths    |

## 📚 Documentation Files

- `PWA_SETUP.md` - Complete setup guide
- `PWA_INTEGRATION.md` - Integration examples
- `PWA_SUMMARY.md` - Implementation summary
- `PWA_ARCHITECTURE.md` - Architecture diagrams
- `PWA_CHECKLIST.md` - Full checklist
- `PWA_QUICK_REF.md` - This file

## 🎯 Next Steps

1. **Build & Deploy**

   ```bash
   npm run build
   npm run preview
   ```

2. **Test on Production**
   - Deploy to HTTPS server
   - Test installation on phone
   - Verify offline functionality

3. **Add Components**
   - Import PWANotification in App.tsx
   - Add PWASettings to Settings page
   - Test functionality

4. **Monitor**
   - Check DevTools regularly
   - Monitor user feedback
   - Adjust cache settings as needed

## 📞 Support

For issues or questions:

1. Check PWA_SETUP.md troubleshooting section
2. Review DevTools Application tab
3. Check browser console for errors
4. Review vite.config.ts configuration

---

**Pro Tips:**

- ✅ Always test on real device before releasing
- ✅ Use Chrome DevTools Application tab for debugging
- ✅ Offline functionality works on localhost too!
- ✅ Service Worker registration happens automatically
- ✅ Cache updates happen in background, no interruption

Happy PWA-ing! 🚀
