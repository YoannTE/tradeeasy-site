import React from "react";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const UsersIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...strokeProps}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const SparkleIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...strokeProps}>
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const EuroIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...strokeProps}>
    <path d="M19 6a8 8 0 1 0 0 12" />
    <path d="M4 10h10" />
    <path d="M4 14h10" />
  </svg>
);

export const AlertIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" {...strokeProps}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
