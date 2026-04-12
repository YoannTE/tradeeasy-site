"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Copy, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PendingAccessUser } from "./get-pending-access-users";

export function PendingAccessList({ users }: { users: PendingAccessUser[] }) {
  if (users.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-12 text-center">
        <p className="text-zinc-400">
          Aucun acces en attente. Tous les clients ont recu leur acces ✓
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <PendingAccessRow key={user.id} user={user} />
      ))}
    </div>
  );
}

function PendingAccessRow({ user }: { user: PendingAccessUser }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email;

  const createdAt = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCopy = async () => {
    await navigator.clipboard.writeText(user.tradingviewUsername);
    setCopied(true);
    toast.success("Pseudo copie");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGrant = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/grant-tradingview-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body.error || "Erreur serveur");
        }

        setDone(true);
        toast.success(`Acces accorde a @${user.tradingviewUsername}`);
        setTimeout(() => router.refresh(), 800);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Erreur inconnue");
      }
    });
  };

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <span>{createdAt}</span>
            {user.plan && (
              <>
                <span>·</span>
                <span className="uppercase">{user.plan}</span>
              </>
            )}
            {user.subscriptionStatus && (
              <>
                <span>·</span>
                <span className="uppercase">{user.subscriptionStatus}</span>
              </>
            )}
          </div>
          <p className="mt-1 truncate text-base font-semibold text-zinc-100">
            {fullName}
          </p>
          <p className="truncate text-sm text-zinc-400">{user.email}</p>

          <div className="mt-3 flex items-center gap-2">
            <code className="rounded bg-zinc-800 px-2 py-1 font-mono text-sm text-zinc-100">
              @{user.tradingviewUsername}
            </code>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 gap-1 text-xs"
            >
              {copied ? (
                <Check className="h-3 w-3" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copie" : "Copier"}
            </Button>
          </div>
        </div>

        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            onClick={handleGrant}
            disabled={isPending || done}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                En cours
              </>
            ) : done ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Accorde
              </>
            ) : (
              "Accorder l'acces"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
