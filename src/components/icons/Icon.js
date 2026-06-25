import React from "react";

/**
 * Lightweight inline SVG icon set (Lucide-style) so the storefront never
 * relies on emoji for structural icons. Stroke-based, inherits `currentColor`.
 *
 * Usage: <Icon name="cart" size={20} />   |   <Icon name="star" filled />
 */

const STROKE = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>,
  cart: (
    <>
      <circle cx="9" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
      <path d="M2 3h2.2l2.3 12.4a1.6 1.6 0 0 0 1.6 1.3h9.1a1.6 1.6 0 0 0 1.6-1.2L21 7H6" />
    </>
  ),
  pin: <><path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="2.6" /></>,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  arrowLeft: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
  heart: <path d="M19.5 12.6 12 20l-7.5-7.4a4.5 4.5 0 0 1 6.4-6.3l1.1 1 1.1-1a4.5 4.5 0 0 1 6.4 6.3Z" />,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" />,
  bell: <><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  trash: <><path d="M3 6h18" /><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" /><path d="M19 6v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6" /><path d="M10 11v6M14 11v6" /></>,
  check: <path d="M20 6 9 17l-5-5" />,
  truck: <><path d="M14 16V5a1 1 0 0 0-1-1H2v12h2" /><path d="M14 9h4l3 3v4h-3" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>,
  package: <><path d="m7.5 4.3 9 5.2v9L7.5 13.3Z" /><path d="M16.5 9.5 21 7" /><path d="m3 7 9 5.2L21 7l-9-5.2L3 7Z" /><path d="M12 12.2V22" /><path d="m3 7 9 5.2V22L3 17V7Z" /></>,
  home: <><path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 21v-7h6v7" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  shield: <><path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
  tag: <><path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><circle cx="7.5" cy="7.5" r="1.4" /></>,
  gift: <><path d="M20 12v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8" /><path d="M2 8h20v4H2z" /><path d="M12 8v13" /><path d="M12 8C12 5 10 3 8 3a2.5 2.5 0 0 0 0 5h4Zm0 0c0-3 2-5 4-5a2.5 2.5 0 0 1 0 5h-4Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" />,
  hybrid: <><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none" /></>,
  leaf: <><path d="M11 20A7 7 0 0 1 4 13C4 7 9 3 20 4c1 11-3 16-9 16Z" /><path d="M11 20c0-4 1.5-7.5 5-10" /></>,
  cookie: <><circle cx="12" cy="12" r="9" /><circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" /><circle cx="14" cy="9" r="1" fill="currentColor" stroke="none" /><circle cx="15" cy="14" r="1" fill="currentColor" stroke="none" /><circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" /></>,
  vape: <><rect x="3" y="9" width="14" height="6" rx="2" /><path d="M17 11h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" /><path d="M6 9V7" /></>,
  joint: <><path d="m3 16 13-3 5-1-1 4-13 3Z" /><path d="m3 16 2 2" /></>,
  droplet: <path d="M12 3s6 6.4 6 10.5A6 6 0 0 1 6 13.5C6 9.4 12 3 12 3Z" />,
  cup: <><path d="M5 8h12l-1 11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 8Z" /><path d="M9 8V5a3 3 0 0 1 6 0v3" /></>,
  lotion: <><path d="M8 8h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2Z" /><path d="M9 8V5h4v3" /></>,
  bagShop: <><path d="M6 7h12l1 13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 7Z" /><path d="M9 7V5a3 3 0 0 1 6 0v2" /></>,
  badge: <><path d="m12 2 2.4 1.8 3-.2.9 2.9 2.4 1.7-1.1 2.8 1.1 2.8-2.4 1.7-.9 2.9-3-.2L12 22l-2.4-1.8-3 .2-.9-2.9L3.3 16l1.1-2.8L3.3 10.4l2.4-1.7.9-2.9 3 .2L12 2Z" /><path d="m9.5 12 1.8 1.8 3.4-3.4" /></>,
  flame: <path d="M12 3c2 3 5 4.5 5 8.5a5 5 0 0 1-10 0c0-1.6.7-2.7 1.5-3.5C9 9.5 9 11 10 11.5 10 8 11 5 12 3Z" />,
  filter: <path d="M3 5h18l-7 8v6l-4-2v-4L3 5Z" />,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  menu: <><path d="M3 6h18M3 12h18M3 18h18" /></>,
};

const FILLED = new Set(["star", "heart", "hybrid", "flame", "droplet"]);

export default function Icon({ name, size = 20, filled = false, className = "", strokeWidth = 2, style }) {
  const glyph = STROKE[name];
  if (!glyph) return null;
  const isFilled = filled || (FILLED.has(name) && filled);
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  );
}
