// PWA Architecture Overview

/\*
┌─────────────────────────────────────────────────────────────────┐
│ FutureLab PWA Architecture │
└─────────────────────────────────────────────────────────────────┘

1. INSTALLATION FLOW
   ═══════════════════════════════════════════════════════════════════

User Browser → Manifest.json Check → App Install
│ │ │
├─ Check manifest ├─ Name, icons verified ├─ Add to Home
├─ Verify HTTPS ├─ Theme colors loaded ├─ Standalone mode
└─ Icons cached └─ Install prompt shown └─ Splash screen

2.  SERVICE WORKER LIFECYCLE
    ═══════════════════════════════════════════════════════════════════

                  ┌─────────────┐
                  │   Install   │
                  │   Service   │
                  │   Worker    │
                  └──────┬──────┘
                         │
                         ↓
            ┌────────────────────────┐
            │   Activate & Cache     │
            │   Static Assets        │
            └────────┬───────────────┘
                     │
                     ↓
        ┌────────────────────────────┐
        │  Intercept Network Request │
        │  & Serve from Cache        │
        └────────┬───────────────────┘
                 │
                 ├─ Cache Hit → Serve from cache
                 │
                 └─ Cache Miss → Fetch from network
                        │
                        └─ Store in cache for next time

3.  SMART CACHING STRATEGY
    ═══════════════════════════════════════════════════════════════════

Network Request Arrives
│
↓
What type?
│
┌─────┼─────┬──────────────┬──────────────┬───────────┐
│ │ │ │ │ │
↓ ↓ ↓ ↓ ↓ ↓
Image Font CSS/JS CDN API Other
│ │ │ │ │ │
│ │ │ │ │ │
↓ ↓ ↓ ↓ ↓ ↓
Cache Cache Stale While Stale While Network Network
First First Revalidate Revalidate First First
30d 30d 24h 7d 24h 24h

4. OFFLINE MODE
   ═══════════════════════════════════════════════════════════════════

User Offline
│
↓
Browser Check
│
├─ Service Worker Active?
│ ├─ Yes → Continue with cached content
│ └─ No → Show offline.html page
│
↓
Serve Cached Content
│
├─ Courses & Assignments (from cache)
├─ Code Editor (functional with local code)
├─ Games (cached game data)
└─ UI & Static Assets (all cached)
│
↓
User Goes Online
│
├─ Detect connection
├─ Trigger sync
├─ Show "Syncing..." notification
└─ Upload offline changes & sync data

5. CACHE HIERARCHY
   ═══════════════════════════════════════════════════════════════════

┌──────────────────────────────────┐
│ Browser Cache Memory │
│ (Fast, limited storage) │
└──────────────────────────────────┘
↓
┌──────────────────────────────────┐
│ Service Worker Cache │
│ (Persistent, ~50-100MB) │
│ │
│ ├─ images cache │
│ ├─ fonts cache │
│ ├─ static-resources cache │
│ ├─ cdn-resources cache │
│ ├─ api-calls cache │
│ └─ prefetch cache │
└──────────────────────────────────┘
↓
┌──────────────────────────────────┐
│ LocalStorage/IndexedDB │
│ (User data, settings) │
└──────────────────────────────────┘

6. UPDATE MECHANISM
   ═══════════════════════════════════════════════════════════════════

Every 5 Minutes or On User Action
│
↓
Check for Updates
│
┌────┴────┐
│ │
↓ ↓
New Ver Same Ver
│ │
│ └─ Continue normally
│
↓
New Service Worker
(Waiting state)
│
↓
User Notified
│
├─ "Update available" prompt
└─ Click "Install"
│
↓
Skip Waiting
│
├─ Reload page
├─ New service worker activated
└─ Users sees new version

7. COMPONENT ARCHITECTURE
   ═══════════════════════════════════════════════════════════════════

App.tsx
│
├─ PWANotification (shows offline/update status)
│ │
│ └─ Subscribes to pwaManager events
│
├─ Main App Components
│ │
│ ├─ Dashboard
│ ├─ CodingEngine
│ ├─ Assignments
│ └─ etc.
│
└─ Settings Page
│
└─ PWASettings (cache management)
│
├─ Show cache stats
├─ Clear cache button
├─ Storage quota display
└─ Request persistent storage

8. DATA FLOW - ONLINE vs OFFLINE
   ═══════════════════════════════════════════════════════════════════

ONLINE MODE:
┌─────────────┐ API Request ┌────────────┐
│ App Data │──────────────→│ Server │
│ Manager │ │ (API) │
└──────┬──────┘ └────────────┘
│ │
├─────────────────────────────
│ │
↓ ↓
Cache Database
(PWA) (Server)

OFFLINE MODE:
┌─────────────┐ Local Access ┌──────────┐
│ App Data │────────────────→│ Cache │
│ Manager │ │ (PWA) │
└──────┬──────┘ └──────────┘
│
↓
UI Updates
(No server sync)

9. FILE SIZE MANAGEMENT
   ═══════════════════════════════════════════════════════════════════

Max File Size: 5MB per file
Max Cache Size: 50-100MB total

File Distribution:
├─ App Bundle: 500KB-1MB
├─ Images: 20-50MB
├─ Fonts: 100-300KB
├─ CSS/JS: 500KB-1MB
├─ API Cache: 5-10MB
└─ Other: 10-20MB

10. SECURITY CONSIDERATIONS
    ═══════════════════════════════════════════════════════════════════

✓ HTTPS Required for PWA
✓ Service Worker isolated context
✓ Limited to same domain
✓ Manifest signed by browser
✓ Automatic CORS handling
✓ Cache busting on app update

\*/
