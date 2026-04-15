import React from "react";

export const Logo: React.FC = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "8px 0",
    }}
  >
    <svg
      width="44"
      height="44"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="SimplifyPro"
    >
      <path
        d="M 50 6 L 88 27 L 88 73 L 50 94 L 12 73 L 12 27 Z"
        stroke="currentColor"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="M 35 28 L 65 28 L 65 38 L 45 38 L 45 46 L 65 46 L 65 72 L 35 72 L 35 62 L 55 62 L 55 54 L 35 54 Z"
        fill="currentColor"
      />
    </svg>
    <span
      style={{
        fontSize: 26,
        fontWeight: 800,
        letterSpacing: -0.5,
        color: "currentColor",
      }}
    >
      SimplifyPro
    </span>
  </div>
);

export default Logo;
