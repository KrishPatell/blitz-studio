# Google Analytics installation — 17 October 2026

The user requested installation of their exact Google tag, measurement ID `G-E9JLN2HQNT`, and a push to main. The shared SEO head generator inserts the asynchronous loader and initialization on all22 pages. Its existing replacement markers keep repeated builds from duplicating tags.

The existing privacy notice and cookie/privacy pages now disclose Google Analytics instead of incorrectly claiming that no analytics exists. Notice acknowledgement is versioned to2 so visitors who acknowledged the previous essential-only disclosure receive the updated notice. It remains an acknowledgement, not an analytics consent switch; the settings copy states that explicitly. No CSS, typography, artwork or navigation behavior changed.

Evidence: `node scripts/verify-analytics.mjs` checks exactly one loader and config per page, executes the inline initialization in a VM and verifies the queued ID, and checks the policy disclosures. The browser also showed one matching loader. This verifies installation and initialization, not ingestion into the user's private Google Analytics dashboard.

Desktop and mobile layout review used the browser viewport capability. The effective DOM viewport widths were1920px and520px, respectively (the browser scaled the requested sizes). Both had no horizontal overflow. The notice remained bottom aligned, the new copy fitted its existing card, and Got it removed it. Screenshots are saved in `output/analytics-uat/desktop.jpg` and `output/analytics-uat/mobile.jpg`. The card retained its existing responsive geometry and action row. No separate artwork review is needed for this copy-only disclosure change.

Google's cookie descriptions were checked against its primary documentation: https://support.google.com/analytics/answer/11397207 . The policy does not assert a fixed cookie lifetime or claim the site controls the property's Google-side advertising settings.

Reviewed baseline update is limited to the user-requested analytics and necessary disclosure edits; it does not approve unrelated visual changes.
