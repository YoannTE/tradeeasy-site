import React from "react";
import { loadDashboardStats } from "./dashboard/stats";
import { StatCard } from "./dashboard/StatCard";
import { RecentUsersTable } from "./dashboard/RecentUsersTable";

const numberFormatter = new Intl.NumberFormat("fr-FR");

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
        <h2 className="sp-dashboard__title">Tableau de bord SimplifyPro</h2>
        <p className="sp-dashboard__subtitle">
          Vue d&apos;ensemble de l&apos;activité de ton indicateur.
        </p>
      </div>

      <div className="sp-dashboard__stats">
        <StatCard
          label="Abonnés actifs"
          value={numberFormatter.format(totalSubscribers)}
          hint={`${stats.activeSubscribers} payants · ${stats.trialSubscribers} en essai`}
          tone="success"
        />
        <StatCard
          label="Nouveaux inscrits (30j)"
          value={numberFormatter.format(stats.newUsersLast30Days)}
        />
        <StatCard
          label="Total utilisateurs"
          value={numberFormatter.format(stats.totalUsers)}
        />
        <StatCard
          label="Paiements en échec"
          value={numberFormatter.format(stats.paymentFailedCount)}
          hint={
            stats.paymentFailedCount > 0
              ? "À vérifier dans Abonnements"
              : "Rien à signaler"
          }
          tone={stats.paymentFailedCount > 0 ? "danger" : "default"}
        />
      </div>

      <RecentUsersTable users={stats.recentUsers} />
    </div>
  );
}

export default BeforeDashboard;
