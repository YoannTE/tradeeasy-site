import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import { requireAuth } from "@/lib/auth/require-auth";
import { PendingAccessList } from "./pending-access-list";
import { getPendingAccessUsers } from "./get-pending-access-users";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acces en attente — Admin",
  description: "Gerer les acces TradingView a accorder",
};

export default async function PendingAccessPage() {
  const user = await requireAuth();

  if (user.role !== "admin") {
    redirect("/dashboard");
  }

  const payload = await getPayload({ config });
  const users = await getPendingAccessUsers(payload);

  const scriptUrl =
    process.env.TRADINGVIEW_SCRIPT_MANAGE_URL ||
    "https://www.tradingview.com/chart/";

  return (
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-50">Acces en attente</h1>
        <p className="mt-2 text-zinc-400">
          Clients ayant paye mais qui n&apos;ont pas encore recu l&apos;acces
          TradingView.
        </p>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
        <p className="text-sm text-zinc-300">
          <strong className="text-zinc-100">Procedure</strong> : copie le pseudo
          TradingView, ajoute-le sur ton indicateur invite-only, puis clique
          &quot;Accorder l&apos;acces&quot;. Le client recoit un email et son
          essai 7 jours demarre automatiquement.
        </p>
        <a
          href={scriptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          Ouvrir la gestion de l&apos;indicateur TradingView →
        </a>
      </div>

      <PendingAccessList users={users} />
    </div>
  );
}
