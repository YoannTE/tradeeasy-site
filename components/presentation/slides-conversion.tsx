import Image from "next/image";
import {
  Coins,
  Infinity as InfinityIcon,
  LineChart,
  Link2,
  Percent,
  Timer,
  UserPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function SlidesConversion() {
  return (
    <>
      {/* Slide 9 — Confusion vs Clarté */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full gap-8">
          <h2 className="text-center">
            La différence entre la confusion et la clarté.
          </h2>
          <div className="grid grid-cols-2 gap-8 flex-1 items-stretch">
            <div className="sp-card opacity-60 space-y-5 p-8">
              <h3 style={{ color: "var(--sp-muted)" }}>
                Anciens Services de Signaux
              </h3>
              <CompareLine label="Signaux">
                Trop nombreux, contradictoires et difficiles à interpréter.
              </CompareLine>
              <CompareLine label="Sorties">
                Vagues, entièrement laissées à l&apos;intuition du trader.
              </CompareLine>
              <CompareLine label="Prise en main">
                Configuration technique longue et complexe.
              </CompareLine>
              <CompareLine label="Prix">
                À partir de 49 $/mois (sans garanties).
              </CompareLine>
            </div>
            <div className="sp-card sp-card-accent space-y-5 p-8">
              <h3 style={{ color: "var(--sp-green)" }}>
                L&apos;Avantage SimplifyPro
              </h3>
              <CompareLine label="Signaux">
                Rares, filtrés et ultra-précis.
              </CompareLine>
              <CompareLine label="Sorties">
                Claires et exactes (croix de sortie visuelle).
              </CompareLine>
              <CompareLine label="Prise en main">
                Immédiate, Plug &amp; Play dès le premier jour.
              </CompareLine>
              <CompareLine label="Prix">
                Dès <strong>24,50 $/mois</strong> (avec essai gratuit).
              </CompareLine>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 10 — Témoignages */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full gap-8">
          <h2 className="text-center">
            Des résultats prouvés par tous les profils de traders.
          </h2>
          <div className="grid grid-cols-2 gap-6 flex-1">
            <Testimonial
              initial="P"
              name="Priya S."
              tag="La Débutante"
              quote="Les flèches vertes et rouges rendent les entrées et sorties si simples à comprendre. J'apprends et je fais des petits gains constants."
            />
            <Testimonial
              initial="L"
              name="Léa M."
              tag="La Swing Tradeuse"
              quote="J'empilais 5 indicateurs gratuits. SimplifyPro les a tous remplacés. Mes graphiques sont propres et j'ai arrêté d'hésiter sur l'EUR/USD."
            />
            <Testimonial
              initial="J"
              name="James R."
              tag="Le Trader Pro"
              quote="Les alertes m'évitent de rester fixé à l'écran toute la journée pour trader le Nasdaq. Le meilleur investissement mensuel pour mon trading."
              accent="red"
            />
            <Testimonial
              initial="D"
              name="Daniel W."
              tag="La Transparence"
              quote="Leur page de performance montre tout, même les pertes. C'est rare et honnête dans cette industrie. Solide sur le DAX et l'Or."
            />
          </div>
        </div>
      </section>

      {/* Slide 11 — Onboarding 3 étapes */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full justify-center gap-12">
          <h2 className="text-center max-w-[24ch] mx-auto">
            Une intégration immédiate, sans aucune configuration technique.
          </h2>
          <div className="grid grid-cols-3 gap-8 items-stretch">
            <Step
              num="1"
              icon={UserPlus}
              title="Inscription."
              body="Créez votre compte et choisissez votre plan en moins de 60 secondes."
            />
            <Step
              num="2"
              icon={Link2}
              title="Connexion."
              body="Fournissez votre pseudo TradingView. L'accès est débloqué directement sur votre plateforme."
            />
            <Step
              num="3"
              icon={LineChart}
              title="Trading."
              body="Appliquez l'indicateur sur vos graphiques et suivez les signaux. Zéro paramétrage requis."
              dim
            />
          </div>
        </div>
      </section>

      {/* Slide 12 — Pricing -50% */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full justify-center gap-10">
          <h2 className="text-center">
            L&apos;avantage exclusif de l&apos;offre de lancement (-50%).
          </h2>
          <div className="grid grid-cols-2 gap-8 items-stretch max-w-[1100px] mx-auto w-full">
            <PricingCard
              label="Mensuel"
              price="24,50 $"
              unit="/mois"
              strike="49 $"
              features={[
                "Accès complet à l'indicateur",
                "Alertes mobiles & bureau",
                "Guide de formation",
              ]}
            />
            <PricingCard
              highlight
              badge="Meilleure valeur"
              label="Annuel"
              price="174,50 $"
              unit="/an"
              strike="349 $"
              features={[
                "Économisez 40% par rapport au mensuel",
                "Support prioritaire",
                "2 mois totalement gratuits",
                "Accès complet & Alertes",
              ]}
            />
          </div>
          <p className="text-center text-base">
            <strong>Inclus :</strong> 7 jours d&apos;essai gratuit. Annulable à
            tout moment. Zéro risque.
          </p>
        </div>
      </section>

      {/* Slide 13 — Affiliation */}
      <section data-background-color="#0b0f14">
        <div className="grid grid-cols-[1fr_1.1fr] gap-12 h-full items-center">
          <div className="space-y-6">
            <h2>Financez votre trading en partageant SimplifyPro.</h2>
            <p>
              Vous aimez l&apos;indicateur ? Recommandez-le à d&apos;autres
              traders et générez un revenu passif. Plus vous invitez de traders,
              plus vous gagnez, mois après mois.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <AffiliateStat
              icon={Percent}
              big="30%"
              title="de Commission"
              body="Récurrente sur chaque abonnement."
            />
            <AffiliateStat
              icon={Timer}
              big="90 jours"
              title="Cookie"
              body="Maximisez vos chances de conversion."
            />
            <AffiliateStat
              icon={InfinityIcon}
              big="Illimité"
              title="Sans plafond"
              body="Vos gains mensuels sont sans limite."
            />
            <AffiliateStat
              icon={Coins}
              big="Mensuel"
              title="Revenus récurrents"
              body="Paiement automatique chaque mois."
            />
          </div>
        </div>
      </section>

      {/* Slide 14 — CTA final */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col items-center justify-center text-center h-full gap-8">
          <h1 className="max-w-[22ch]">
            Prenez une longueur d&apos;avance dès aujourd&apos;hui, sans aucun
            risque.
          </h1>
          <p className="text-xl max-w-[60ch]">
            Rejoignez les milliers de traders qui ont arrêté de deviner et ont
            révolutionné leur stratégie d&apos;investissement.
          </p>
          <a
            href="https://simplify-pro.com/signup"
            target="_blank"
            rel="noopener"
            className="sp-cta-button mt-4"
          >
            Démarrer l&apos;essai gratuit de 7 jours →
          </a>
          <p
            className="text-xs absolute bottom-6 left-0 right-0 text-center"
            style={{ color: "var(--sp-muted)" }}
          >
            SimplifyPro.com | Le trading comporte des risques significatifs. Les
            performances passées ne garantissent pas les résultats futurs. Ceci
            n&apos;est pas un conseil financier.
          </p>
        </div>
      </section>
    </>
  );
}

function CompareLine({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <p className="text-sm m-0">
        <strong>{label} :</strong> {children}
      </p>
    </div>
  );
}

function Testimonial({
  initial,
  name,
  tag,
  quote,
  accent,
}: {
  initial: string;
  name: string;
  tag: string;
  quote: string;
  accent?: "red";
}) {
  const ringColor = accent === "red" ? "var(--sp-red)" : "var(--sp-green)";
  return (
    <div className="sp-card p-6 space-y-3">
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-lg font-semibold"
          style={{
            border: `2px solid ${ringColor}`,
            color: ringColor,
            boxShadow: `0 0 18px ${ringColor === "var(--sp-green)" ? "var(--sp-green-glow)" : "rgba(239,68,68,0.45)"}`,
          }}
        >
          {initial}
        </span>
        <div>
          <p className="m-0 text-base">
            <strong>{name}</strong>
          </p>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            {tag}
          </span>
        </div>
      </div>
      <p className="text-sm italic m-0">“{quote}”</p>
    </div>
  );
}

function Step({
  num,
  icon: Icon,
  title,
  body,
  dim,
}: {
  num: string;
  icon: LucideIcon;
  title: string;
  body: string;
  dim?: boolean;
}) {
  return (
    <div
      className={`sp-card ${dim ? "" : "sp-card-accent"} p-6 text-center space-y-3`}
    >
      <div className="flex justify-center">
        <Icon
          size={48}
          strokeWidth={1.5}
          style={{ color: "var(--sp-green)" }}
        />
      </div>
      <h3 className="text-xl m-0">
        Étape {num} : {title}
      </h3>
      <p className="text-sm m-0">{body}</p>
    </div>
  );
}

function PricingCard({
  label,
  price,
  unit,
  strike,
  features,
  highlight,
  badge,
}: {
  label: string;
  price: string;
  unit: string;
  strike: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`sp-card ${highlight ? "sp-card-accent" : ""} p-8 space-y-4 relative`}
    >
      {badge && (
        <span className="sp-badge absolute -top-3 right-6">{badge}</span>
      )}
      <p
        className="text-sm m-0 uppercase tracking-wider"
        style={{ color: "var(--sp-muted)" }}
      >
        {label}
      </p>
      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-lg" style={{ color: "var(--sp-muted)" }}>
          {unit}
        </span>
        <span
          className="text-lg line-through"
          style={{ color: "var(--sp-muted)" }}
        >
          {strike}
        </span>
      </div>
      <ul className="space-y-2 text-sm">
        {features.map((f) => (
          <li key={f}>
            <span style={{ color: "var(--sp-green)" }}>•</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AffiliateStat({
  icon: Icon,
  big,
  title,
  body,
}: {
  icon: LucideIcon;
  big: string;
  title: string;
  body: string;
}) {
  return (
    <div className="sp-card p-5 space-y-2">
      <div
        className="flex items-center gap-3"
        style={{ color: "var(--sp-green)" }}
      >
        <Icon size={32} strokeWidth={1.75} />
        <span className="text-3xl font-semibold">{big}</span>
      </div>
      <h3 className="text-lg m-0">{title}</h3>
      <p className="text-sm m-0">{body}</p>
    </div>
  );
}
