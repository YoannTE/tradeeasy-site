import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "success" | "warning" | "danger";
}

const toneColors: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "var(--theme-elevation-800)",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
};

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  tone = "default",
}) => (
  <div className="sp-stat-card">
    <div className="sp-stat-card__label">{label}</div>
    <div className="sp-stat-card__value" style={{ color: toneColors[tone] }}>
      {value}
    </div>
    {hint ? <div className="sp-stat-card__hint">{hint}</div> : null}
  </div>
);

export default StatCard;
