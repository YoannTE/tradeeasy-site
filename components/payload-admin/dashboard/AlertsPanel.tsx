import React from "react";
import Link from "next/link";
import type { AlertItem } from "./stats";

interface AlertsPanelProps {
  alerts: AlertItem[];
}

const severityEmoji: Record<AlertItem["severity"], string> = {
  danger: "●",
  warning: "●",
  info: "●",
  success: "●",
};

export const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="sp-panel">
      <div className="sp-panel__header">
        <div>
          <h3 className="sp-panel__title">Alertes &amp; Rappels</h3>
          <p className="sp-panel__subtitle">
            Actions à traiter en priorité aujourd&apos;hui.
          </p>
        </div>
        <Link
          href="/admin/collections/subscriptions"
          className="sp-panel__link"
        >
          Tout voir
        </Link>
      </div>

      {alerts.length === 0 ? (
        <div className="sp-panel__empty-state">
          <span className="sp-panel__empty-badge">Tout est OK</span>
          <p className="sp-panel__empty">Aucune alerte à traiter.</p>
        </div>
      ) : (
        <ul className="sp-alert-list">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className={`sp-alert sp-alert--${alert.severity}`}
            >
              <div className="sp-alert__body">
                <div className="sp-alert__head">
                  <span
                    className={`sp-alert__dot sp-alert__dot--${alert.severity}`}
                  >
                    {severityEmoji[alert.severity]}
                  </span>
                  <span className="sp-alert__title">{alert.title}</span>
                </div>
                <p className="sp-alert__detail">{alert.detail}</p>
              </div>
              <Link
                href={alert.href}
                className={`sp-alert__cta sp-alert__cta--${alert.severity}`}
              >
                {alert.cta}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlertsPanel;
