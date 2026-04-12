"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DashboardActions() {
  const t = useTranslations("dashboard.actions");
  const router = useRouter();
  const [billingLoading, setBillingLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  async function handleManageBilling() {
    setBillingLoading(true);
    try {
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setBillingLoading(false);
    }
  }

  async function handleCancelSubscription() {
    await handleManageBilling();
  }

  async function handleLogout() {
    setLogoutLoading(true);
    try {
      await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/");
      router.refresh();
    } catch {
      setLogoutLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        onClick={handleManageBilling}
        disabled={billingLoading}
        variant="outline"
        className="border-zinc-700"
      >
        {billingLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {t("loading")}
          </>
        ) : (
          t("manageBilling")
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button variant="destructive" className="border-red-800">
              {t("cancelSubscription")}
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("cancelTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("cancelDescription")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("keepSubscription")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelSubscription}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {t("yesCancel")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button
        onClick={handleLogout}
        disabled={logoutLoading}
        variant="ghost"
        className="text-zinc-400 hover:text-white"
      >
        {logoutLoading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <>
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </>
        )}
      </Button>
    </div>
  );
}
