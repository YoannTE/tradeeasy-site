import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  hint?: string;
  trend?: string;
  icon: React.ReactNode;
  tone?: "indigo" | "emerald" | "amber" | "rose" | "sky";
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  hint,
  trend,
  icon,
  tone = "indigo",
}) => (
  <div className="sp-stat-card">
    <div className={`sp-stat-card__icon sp-stat-card__icon--${tone}`}>
      {icon}
    </div>
    <div className="sp-stat-card__body">
      <div className="sp-stat-card__label">{label}</div>
      <div className="sp-stat-card__value">{value}</div>
      {trend ? (
        <div className={`sp-stat-card__trend sp-stat-card__trend--${tone}`}>
          {trend}
        </div>
      ) : null}
      {hint ? <div className="sp-stat-card__hint">{hint}</div> : null}
    </div>
  </div>
);

export default StatCard;
