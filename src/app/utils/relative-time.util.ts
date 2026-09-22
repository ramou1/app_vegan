export function parseFlexibleDate(value: string | Date | null | undefined): Date | null {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  const raw = String(value).trim();
  if (!raw) {
    return null;
  }

  if (raw.includes('T') || raw.includes('-')) {
    const iso = new Date(raw);
    return Number.isNaN(iso.getTime()) ? null : iso;
  }

  const [day, month, year] = raw.split(/[\/]/).map(Number);
  if (!day || !month || !year) {
    return null;
  }

  const date = new Date(year, month - 1, day);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatRelativeTime(value: string | Date | null | undefined): string {
  const date = parseFlexibleDate(value);
  if (!date) {
    return 'agora';
  }

  const now = Date.now();
  const diffMs = Math.max(0, now - date.getTime());
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diffMs < minute) {
    return 'agora';
  }
  if (diffMs < hour) {
    return `${Math.floor(diffMs / minute)}min`;
  }
  if (diffMs < day) {
    return `${Math.floor(diffMs / hour)}h`;
  }
  if (diffMs < week) {
    return `${Math.floor(diffMs / day)}d`;
  }
  if (diffMs < month) {
    return `${Math.floor(diffMs / week)}sem`;
  }
  if (diffMs < year) {
    return `${Math.floor(diffMs / month)}m`;
  }

  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toLowerCase();
}
