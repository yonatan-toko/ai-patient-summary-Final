import * as amplitude from '@amplitude/analytics-browser';

/**
 * Call once at app startup.
 * Returns the amplitude object so we can call amplitude.track(...) elsewhere.
 */
export function initAnalytics() {
  const key = import.meta.env.VITE_AMPLITUDE_API_KEY;
  const region = (import.meta.env.VITE_AMPLITUDE_REGION || 'US').toUpperCase();


  amplitude.init(key, {
    serverZone: region,       
    defaultTracking: false,   
  });

  //amplitude.track('page_loaded', { ts: Date.now() });

  return amplitude;
}
