import React from "react";
import { loadDashboardStats } from "./dashboard/stats";
import { StatCard } from "./dashboard/StatCard";
import { AlertsPanel } from "./dashboard/AlertsPanel";
import { PipelinePanel } from "./dashboard/PipelinePanel";
import { UsersIcon, SparkleIcon, EuroIcon, AlertIcon } from "./dashboard/icons";

const numberFormatter = new Intl.NumberFormat("fr-FR");
const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export async function BeforeDashboard() {
  let stats;
  try {
    stats = await loadDashboardStats();
  } catch (error) {
    console.error("Failed to load dashboard stats", error);
    return (
      <div className="sp-dashboard sp-dashboard--error">
        <h2 className="sp-dashboard__title">Tableau de bord</h2>
        <p>Impossible de charger les statistiques pour le moment.</p>
      </div>
    );
  }

  const totalSubscribers = stats.activeSubscribers + stats.trialSubscribers;

  return (
    <div className="sp-dashboard">
      <div className="sp-dashboard__header">
        <h2 className="sp-dashboard__title">Mon tableau de bord</h2>
        <p className="sp-dashboard__subtitle">
          Vue d&apos;ensemble de ton activité SimplifyPro aujourd&apos;hui.
        </p>
      </div>

      <div className="sp-dashboard__stats">
        <StatCard
          label="Abonnés actifs"
          value={numberFormatter.format(totalSubscribers)}
          hint={`${stats.activeSubscribers} payants · ${stats.trialSubscribers} en essai`}
          icon={<UsersIcon />}
          tone="indigo"
        />
        <StatCard
          label="Nouveaux cette semaine"
          value={numberFormatter.format(stats.newUsersLast7Days)}
          trend={
            stats.newUsersLast7Days > 0
              ? `+${stats.newUsersLast7Days} sur 7 jours`
              : undefined
          }
          icon={<SparkleIcon />}
          tone="emerald"
        />
        <StatCard
          label="Revenus mensuels estimés"
          value={currencyFormatter.format(
            stats.estimatedMonthlyRevenueCents / 100,
          )}
          hint="Basé sur les abonnés payants actuels"
          icon={<EuroIcon />}
          tone="sky"
        />
        <StatCard
          label="Alertes à traiter"
          value={numberFormatter.format(stats.alerts.length)}
          hint={
            stats.alerts.length > 0
              ? "Paiements · essais · accès en attente"
              : "Tout est à jour"
          }
          icon={<AlertIcon />}
          tone={stats.alerts.length > 0 ? "rose" : "amber"}
        />
      </div>

      <div className="sp-dashboard__grid">
        <AlertsPanel alerts={stats.alerts} />
        <PipelinePanel pipeline={stats.pipeline} />
      </div>
    </div>
  );
}

export default BeforeDashboard;
