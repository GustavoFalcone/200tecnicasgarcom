const DEFAULT_CONFIG = {
  utmifyPixelId: '',
  metaPixelIds: [],
  googleAdsId: '',
  checkoutDomains: [],
  debug: false
};

const config = {
  ...DEFAULT_CONFIG,
  ...(window.__TRACKING_CONFIG__ || {})
};

const ATTRIBUTION_KEY = 'lp_atividades_attribution';
const SESSION_KEY = 'lp_atividades_session_id';
const VISITOR_KEY = 'lp_atividades_visitor_id';
const PLACEHOLDER_RE = /^(COLOQUE_AQUI|YOUR_|SEU_|PIXEL_ID|G-|AW-)/i;
const ATTRIBUTION_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'utm_id',
  'src',
  'sck',
  'xcod',
  'fbclid',
  'fbc',
  'fbp',
  'gclid',
  'gbraid',
  'wbraid',
  'ttclid',
  'msclkid',
  'kwai_click_id'
];

function isConfigured(value) {
  return Boolean(value && !PLACEHOLDER_RE.test(String(value)));
}

function safeStorage(type) {
  try {
    const storage = window[type];
    const testKey = `_${type}_test`;
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return storage;
  } catch {
    return null;
  }
}

const local = safeStorage('localStorage');
const session = safeStorage('sessionStorage');

function uuid() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrCreate(storage, key) {
  const existing = storage?.getItem(key);
  if (existing) return existing;
  const next = uuid();
  storage?.setItem(key, next);
  return next;
}

function readJson(storage, key) {
  try {
    return JSON.parse(storage?.getItem(key) || '{}');
  } catch {
    return {};
  }
}

function writeJson(storage, key, value) {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can fail in private browsing; tracking must not block checkout.
  }
}

export function captureAttribution() {
  const query = new URLSearchParams(window.location.search);
  const previous = readJson(local, ATTRIBUTION_KEY);
  const captured = {};

  ATTRIBUTION_PARAMS.forEach((key) => {
    const value = query.get(key);
    if (value) captured[key] = value;
  });

  const next = {
    ...previous,
    ...captured,
    landing_page: previous.landing_page || window.location.href,
    referrer: previous.referrer || document.referrer || '',
    visitor_id: getOrCreate(local, VISITOR_KEY),
    session_id: getOrCreate(session, SESSION_KEY),
    updated_at: new Date().toISOString()
  };

  writeJson(local, ATTRIBUTION_KEY, next);
  return next;
}

export function getAttribution() {
  return {
    ...readJson(local, ATTRIBUTION_KEY),
    session_id: getOrCreate(session, SESSION_KEY),
    visitor_id: getOrCreate(local, VISITOR_KEY)
  };
}

function loadScript(src, attrs = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;
  Object.entries(attrs).forEach(([key, value]) => {
    if (value === true) script.setAttribute(key, '');
    else if (value !== false && value != null) script.setAttribute(key, value);
  });
  document.head.appendChild(script);
}

function installUtmify() {
  loadScript('https://cdn.utmify.com.br/scripts/utms/latest.js');

  if (isConfigured(config.utmifyPixelId)) {
    window.pixelId = config.utmifyPixelId;
    loadScript('https://cdn.utmify.com.br/scripts/pixel/pixel.js');
  }
}

function installMetaPixel() {
  const ids = Array.isArray(config.metaPixelIds)
    ? config.metaPixelIds.filter(isConfigured)
    : [];

  if (!ids.length || window.fbq) return;

  /* eslint-disable */
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  ids.forEach((id) => window.fbq('init', id));
}

function installGoogleAds() {
  if (!isConfigured(config.googleAdsId)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', config.googleAdsId);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.googleAdsId)}`);
}

function isCheckoutHref(href) {
  if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return false;
  }

  if (/COLOQUE_AQUI_O_CHECKOUT/i.test(href)) return true;

  try {
    const url = new URL(href, window.location.href);
    if (url.origin === window.location.origin) return false;
    const host = url.hostname.toLowerCase();
    const configured = config.checkoutDomains.some((domain) => host.includes(String(domain).toLowerCase()));
    return configured || /checkout|pay|pagamento|kiwify|hotmart|pepper|perfectpay|eduzz|monetizze/.test(host + url.pathname);
  } catch {
    return false;
  }
}

export function decorateCheckoutUrl(href) {
  if (!isCheckoutHref(href)) return href;

  try {
    const url = new URL(href, window.location.href);
    const attribution = getAttribution();

    ATTRIBUTION_PARAMS.forEach((key) => {
      if (attribution[key] && !url.searchParams.has(key)) {
        url.searchParams.set(key, attribution[key]);
      }
    });

    if (!url.searchParams.has('external_id')) {
      url.searchParams.set('external_id', attribution.visitor_id);
    }

    if (!url.searchParams.has('session_id')) {
      url.searchParams.set('session_id', attribution.session_id);
    }

    return url.toString();
  } catch {
    return href;
  }
}

export function trackEvent(name, payload = {}) {
  const eventPayload = {
    ...getAttribution(),
    ...payload,
    event_name: name,
    page_url: window.location.href,
    event_time: Math.floor(Date.now() / 1000)
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...eventPayload });

  if (window.fbq) {
    const metaEvent = name === 'InitiateCheckout' ? 'InitiateCheckout' : name;
    window.fbq('track', metaEvent, eventPayload);
  }

  if (window.gtag) {
    const googleEvent = name === 'InitiateCheckout' ? 'begin_checkout' : name.toLowerCase();
    window.gtag('event', googleEvent, eventPayload);
  }

  window.dispatchEvent(new CustomEvent('landing:tracking-event', { detail: eventPayload }));

  if (config.debug) {
    console.info('[tracking]', name, eventPayload);
  }
}

function bindCheckoutClicks() {
  document.addEventListener(
    'click',
    (event) => {
      const link = event.target.closest?.('a[href]');
      if (!link || !isCheckoutHref(link.getAttribute('href'))) return;

      const originalHref = link.getAttribute('href');
      const decoratedHref = decorateCheckoutUrl(originalHref);
      if (decoratedHref !== originalHref) {
        link.setAttribute('href', decoratedHref);
      }

      trackEvent('InitiateCheckout', {
        checkout_url: decoratedHref,
        checkout_label: link.textContent?.trim().slice(0, 120) || ''
      });
    },
    true
  );
}

function boot() {
  captureAttribution();
  installUtmify();
  installMetaPixel();
  installGoogleAds();
  bindCheckoutClicks();

  window.trackLandingEvent = trackEvent;
  window.getLandingAttribution = getAttribution;

  trackEvent('PageView');
  trackEvent('ViewContent', { content_name: '+250 atividades de reabilitacao' });
}

boot();
