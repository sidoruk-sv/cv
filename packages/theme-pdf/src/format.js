export function displayUrl(url) {
  if (!url) {
    return '';
  }

  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/** Plain-text URL shape that ats-reader regexes can match (no https://). */
export function contactLinkText(url, fallback = '') {
  const bare = displayUrl(url);

  if (!bare) {
    return fallback;
  }

  if (/linkedin\.com/i.test(bare)) {
    return bare;
  }

  if (bare.startsWith('www.')) {
    return bare;
  }

  return `www.${bare}`;
}

/** Shorter contact URLs for single-line PDF header (drops leading www.). */
export function contactLinkTextCompact(url, fallback = '') {
  return contactLinkText(url, fallback).replace(/^www\./i, '');
}

export function formatLocationText(location, { compact = false } = {}) {
  if (!location) {
    return '';
  }

  if (compact) {
    return [location.city, location.countryCode].filter(Boolean).join(', ');
  }

  return [location.city, location.region, location.countryCode]
    .filter(Boolean)
    .join(', ');
}

export const DEFAULT_CONTACT_ORDER = [
  'location',
  'email',
  'phone',
  'linkedin',
  'url',
];

export function getContactOrder(resume) {
  const theme = resume?.meta?.theme;
  const order = theme?.contactOrderPdf ?? theme?.contactOrder;

  if (!Array.isArray(order) || order.length === 0) {
    return DEFAULT_CONTACT_ORDER;
  }

  return order;
}

export function profileContactId(profile) {
  const network = (profile.network || '').toLowerCase();

  if (network.includes('linkedin')) {
    return 'linkedin';
  }

  return network.replace(/\s+/g, '-').toLowerCase() || 'profile';
}

export function buildContactEntries(basics, { compact = false } = {}) {
  const location = formatLocationText(basics.location, { compact });
  const linkText = compact ? contactLinkTextCompact : contactLinkText;

  const entries = {};

  if (basics.email) {
    entries.email = {
      id: 'email',
      kind: 'link',
      href: `mailto:${basics.email}`,
      text: basics.email,
    };
  }

  if (basics.phone) {
    entries.phone = {
      id: 'phone',
      kind: 'text',
      text: basics.phone,
    };
  }

  if (location) {
    entries.location = {
      id: 'location',
      kind: 'text',
      text: location,
    };
  }

  if (basics.url) {
    entries.url = {
      id: 'url',
      kind: 'link',
      href: basics.url,
      text: linkText(basics.url),
    };
  }

  for (const profile of basics.profiles || []) {
    if (!profile.url) {
      continue;
    }

    const id = profileContactId(profile);

    entries[id] = {
      id,
      kind: 'link',
      href: profile.url,
      text: linkText(profile.url, profile.username),
    };
  }

  return entries;
}

export function sortContactEntries(entries, order) {
  const items = [];
  const used = new Set();
  const standardIds = new Set(['email', 'phone', 'location', 'url']);

  for (const id of order) {
    if (id === 'profiles' || id === 'linkedin') {
      for (const entry of Object.values(entries)) {
        if (!standardIds.has(entry.id) && !used.has(entry.id)) {
          items.push(entry);
          used.add(entry.id);
        }
      }
      continue;
    }

    if (entries[id] && !used.has(id)) {
      items.push(entries[id]);
      used.add(id);
    }
  }

  for (const entry of Object.values(entries)) {
    if (!used.has(entry.id)) {
      items.push(entry);
      used.add(entry.id);
    }
  }

  return items;
}

export function formatMonthYear(dateStr) {
  if (!dateStr) {
    return 'Present';
  }

  const normalized = dateStr.length === 4 ? `${dateStr}-01-01` : `${dateStr}-01`;
  const date = new Date(normalized);

  if (Number.isNaN(date.getTime())) {
    return dateStr;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatDateRange(startDate, endDate) {
  const start = formatMonthYear(startDate);
  const end = endDate === '' || endDate === undefined || endDate === null
    ? 'Present'
    : formatMonthYear(endDate);

  return `${start} - ${end}`;
}

export function normalizeResume(resume) {
  const copy = structuredClone(resume);

  if (Array.isArray(copy.work)) {
    copy.work = copy.work.map((job) => {
      if (job.endDate === undefined || job.endDate === null) {
        return {
          ...job,
          endDate: '',
        };
      }

      return job;
    });
  }

  return copy;
}
