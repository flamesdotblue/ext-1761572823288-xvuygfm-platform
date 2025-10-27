// Utility functions for IST time and seeded predictions

// Get current time parts in Asia/Kolkata without external libs
export function getISTParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = fmt.formatToParts(date).reduce((acc, p) => {
    if (p.type !== 'literal') acc[p.type] = p.value;
    return acc;
  }, {});

  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const hour = Number(parts.hour);
  const minute = Number(parts.minute);
  const second = Number(parts.second);

  return {
    year,
    month,
    day,
    hour,
    minute,
    second,
    // labels
    dateLabel: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    timeLabel: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`,
    minuteLabel: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
  };
}

// Simple string hash -> 32-bit int
function xfnv1a(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  // final avalanche
  h += h << 13; h ^= h >>> 7;
  h += h << 3; h ^= h >>> 17;
  h += h << 5;
  return h >>> 0;
}

// Mulberry32 PRNG
function mulberry32(a) {
  return function () {
    let t = (a += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedRandom(seedStr) {
  const seed = xfnv1a(seedStr);
  return mulberry32(seed);
}

export function numberInfo(n) {
  const bigSmall = n >= 5 ? 'Big' : 'Small';
  const color = n % 2 === 0 ? 'Red' : 'Green';
  return { n, bigSmall, color };
}

export function predictForMinute(parts) {
  const seedStr = `${parts.year}${String(parts.month).padStart(2, '0')}${String(parts.day).padStart(2, '0')}${String(parts.hour).padStart(2, '0')}${String(parts.minute).padStart(2, '0')}`;
  const rng = seedRandom(seedStr);

  // Generate 3 numbers 0-9 deterministically for the minute
  const nums = [
    Math.floor(rng() * 10),
    Math.floor(rng() * 10),
    Math.floor(rng() * 10),
  ];

  const details = nums.map((n) => numberInfo(n));

  // Primary outcome based on the first number
  const primary = details[0];

  return {
    minuteKey: seedStr,
    minuteLabel: parts.minuteLabel,
    numbers: details, // array of { n, bigSmall, color }
    primary, // { n, bigSmall, color }
  };
}
