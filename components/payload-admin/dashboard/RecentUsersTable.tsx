import React from "react";
import Link from "next/link";
import type { DashboardStats } from "./stats";

interface RecentUsersTableProps {
  users: DashboardStats["recentUsers"];
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function displayName(user: DashboardStats["recentUsers"][number]): string {
  const parts = [user.firstName, user.lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : "—";
}

export const RecentUsersTable: React.FC<RecentUsersTableProps> = ({
  users,
}) => {
  if (users.length === 0) {
    return (
      <div className="sp-panel">
        <h3 className="sp-panel__title">Dernières inscriptions</h3>
        <p className="sp-panel__empty">Aucun utilisateur pour le moment.</p>
      </div>
    );
  }

  return (
    <div className="sp-panel">
      <div className="sp-panel__header">
        <h3 className="sp-panel__title">Dernières inscriptions</h3>
        <Link href="/admin/collections/users" className="sp-panel__link">
          Voir tous
        </Link>
      </div>
      <div className="sp-table">
        <div className="sp-table__row sp-table__row--head">
          <div>Nom</div>
          <div>Email</div>
          <div>Inscrit le</div>
        </div>
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/admin/collections/users/${user.id}`}
            className="sp-table__row sp-table__row--link"
          >
            <div>{displayName(user)}</div>
            <div className="sp-table__email">{user.email}</div>
            <div className="sp-table__muted">{formatDate(user.createdAt)}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentUsersTable;
