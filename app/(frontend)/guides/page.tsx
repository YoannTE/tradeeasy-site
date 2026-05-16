import { redirect } from "next/navigation";

// Il n'existe actuellement qu'un seul guide : on redirige directement
// vers sa page plutot que d'afficher une liste a un seul element.
// Pour retablir la liste, remettre le composant GuideList ici.
export default function GuidesPage() {
  redirect("/guides/install-simplifypro-tradingview");
}
