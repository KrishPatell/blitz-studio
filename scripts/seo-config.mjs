// One approved production origin; preview builds must be deliberate and never index.
export function resolveSeoEnvironment(config, override) {
  if (config.launchOrigin !== 'https://blitzstudio.xyz' || config.deploymentOrigin !== config.launchOrigin) {
    throw new Error('Production SEO must use https://blitzstudio.xyz. Never persist a staging deploymentOrigin.');
  }
  if (config.indexPreview) throw new Error('Preview indexing is prohibited.');
  const origin = override || config.deploymentOrigin;
  if (![config.launchOrigin, config.previewOrigin].includes(origin) || new URL(origin).origin !== origin || new URL(origin).protocol !== 'https:') {
    throw new Error('SEO origin must be the approved production or explicit preview origin.');
  }
  return { origin, indexing: origin === config.launchOrigin };
}
