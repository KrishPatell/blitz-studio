# Autoplay and mobile loading — 6 October 2026

The hero and five service videos now autoplay muted, inline, and looping, with no native controls, visible play/pause buttons, or click-to-pause overlays. Service sources remain unset until the video intersects the viewport. The hero prepares its sources after first paint only if visible. Videos pause when offscreen or the tab is backgrounded, then resume when visible. Browser-blocked autoplay retries on normal page pointer/keyboard interaction; operating-system playback restrictions can still take precedence.

The phone hero is 457,805 bytes, down from 917,595 bytes (50.1% smaller). The five phone service previews total 567,665 bytes instead of 2,505,011 bytes (77.3% smaller). Phone variants are 640px wide, 24fps H.264 / yuv420p, without audio, with fast-start metadata. The desktop hero is 1,041,770 bytes instead of 3,184,049 bytes (67.3% smaller). Original authoring assets remain in the repository. See `video-validation.json` for all codec and duration checks.

The old hero poster was an almost-black first frame. The new WebP poster is a visible portfolio frame and appears while media loads. Phone first-screen staggered entrance animations were removed so content does not wait through the animation delay.

The one-page stylesheet is now inlined in the HTML to remove an additional render-blocking hosting request. Scripts and media URLs are content-versioned so the update does not reuse old cached files. Two shell requests to the previous live HTML took about 3.1–3.5 seconds to first byte; its CSS took about 3.8 seconds. Those are this machine’s network observations, not phone benchmarks or a verified attribution to the hosting server alone. Inlining removes the sequential stylesheet fetch but does not eliminate the initial network/hosting response delay.

## Verification

- Actual browser viewport 375×667 (Chromium): no horizontal overflow, zero video-control elements, and hero animation `none`.
- Initial load: hero selected the phone source, played without any interaction, readyState 4; all five offscreen service videos had empty currentSrc, readyState 0, and no prepared URLs.
- Scrolling: all five service previews selected phone MP4s and playback times advanced without pressing a video control. All reported no media errors. Clips above the viewport paused.
- Mobile navigation remained functional after removing the control handlers.
- Desktop source selection and visible playback checked separately.
- `npm run build`, `npm run verify`, and `git diff --check` pass. Verification rejects native video controls and removed overlay/button classes, checks all local sources, and checks JavaScript syntax.

These are browser viewport and asset-size checks, not measured real-device Core Web Vitals. Physical iOS Safari / Android network and power-mode behavior was not certified. The existing static host currently returns full MP4 files for byte-range GETs, so small fast-start variants also reduce the cost of that hosting behavior.
