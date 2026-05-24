import Image from "next/image";

export function SlidesProduct() {
  return (
    <>
      {/* Slide 4 — Anatomie d'une décision parfaite */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full gap-6">
          <h2 className="text-center">
            L&apos;anatomie d&apos;une décision de trading parfaite.
          </h2>
          <div className="grid grid-cols-[1fr_1.2fr_1fr] gap-8 flex-1 items-center">
            <div className="space-y-4">
              <FeatureCard
                num="1"
                title="Détection de Tendance"
                body="Vert (Haussier), Gris (Range/Incertain), Rouge (Baissier)."
              />
              <FeatureCard
                num="2"
                title="Signaux d'Entrée"
                body="Points d'achat ou de vente ultra-précis."
              />
            </div>
            <Image
              src="/presentation/video/sortie-croix.png"
              alt="Indicateur SimplifyPro avec signal de sortie"
              width={1920}
              height={860}
              className="sp-screenshot sp-screenshot-glow w-full h-auto"
            />
            <div className="space-y-4">
              <FeatureCard
                num="3"
                title="Sortie de Position"
                body="Indique exactement quand clôturer le trade juste avant une correction du marché."
                accent="red"
              />
              <FeatureCard
                num="4"
                title="Filtres de Risque Ajustables"
                body="Paramétrez l'algorithme du Niveau 1 (Agressif) au Niveau 4 (Strict) selon votre stratégie."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Slide 5 — Non-Repaint */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full gap-6">
          <div className="text-center space-y-3 max-w-[80ch] mx-auto">
            <h2>
              Des signaux 100% définitifs avec la garantie{" "}
              <span style={{ color: "var(--sp-green)" }}>Non-Repaint</span>.
            </h2>
            <p className="text-base">
              Contrairement à la majorité des indicateurs qui modifient
              secrètement leurs signaux passés pour paraître précis, les flèches
              <strong> SimplifyPro</strong> sont finales. Ce que vous voyez est
              exactement ce qui s&apos;est passé en temps réel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 flex-1 items-stretch min-h-0">
            <div className="sp-card text-center space-y-3 p-6 opacity-60 flex flex-col">
              <p style={{ color: "var(--sp-muted)" }}>
                Indicateurs Classiques (Illusion)
              </p>
              <div className="flex-1 relative">
                <Image
                  src="/presentation/video/chart-overloaded.png"
                  alt="Indicateur classique surchargé"
                  fill
                  className="sp-screenshot object-contain"
                />
              </div>
            </div>
            <div className="sp-card sp-card-accent text-center space-y-3 p-6 flex flex-col">
              <p style={{ color: "var(--sp-green)" }}>
                <strong>SimplifyPro (Transparence Totale)</strong>
              </p>
              <div className="flex-1 relative">
                <Image
                  src="/presentation/video/indicator-signals.png"
                  alt="SimplifyPro non-repaint"
                  fill
                  className="sp-screenshot object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6 — Alertes multi-canaux */}
      <section data-background-color="#0b0f14">
        <div className="grid grid-cols-[1fr_1.3fr] gap-12 h-full items-center">
          <div className="space-y-6">
            <h2>Ne manquez plus aucune opportunité de marché.</h2>
            <p>
              Libérez-vous de l&apos;écran. Configurez vos alertes nativement
              via <strong>TradingView</strong> en quelques secondes et soyez
              notifié instantanément.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <AlertCard label="Push Notifications iOS & Android" />
              <AlertCard label="Alertes Email en temps réel" />
              <AlertCard label="Pop-ups Bureau" />
              <AlertCard label="Webhook pour le trading automatisé" />
            </div>
          </div>
          <Image
            src="/presentation/video/alert-dialog-msft.png"
            alt="Création d'alerte SimplifyPro V7.0 dans TradingView"
            width={1920}
            height={860}
            className="sp-screenshot sp-screenshot-glow w-full h-auto"
          />
        </div>
      </section>

      {/* Slide 7 — Multi-actifs */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col h-full gap-6">
          <h2 className="text-center">
            Un seul outil de précision pour dominer tous vos actifs.
          </h2>
          <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
            <AssetChart
              src="/presentation/video/multi-asset-btc.png"
              alt="SimplifyPro sur BTC/USD"
              title="Crypto-monnaies"
              caption="Bitcoin · 15 min"
              body="Suivi des tendances lourdes et de la dynamique institutionnelle."
            />
            <AssetChart
              src="/presentation/video/multi-asset-forex.png"
              alt="SimplifyPro sur EUR/USD"
              title="Forex"
              caption="EUR/USD · 1H"
              body="Capture précise des mouvements soutenus du marché des changes."
            />
          </div>
          <p
            className="text-center text-base"
            style={{ color: "var(--sp-muted)" }}
          >
            Compatible également avec les{" "}
            <strong style={{ color: "var(--sp-text)" }}>indices</strong>{" "}
            (Nasdaq, DAX, S&amp;P 500) et les{" "}
            <strong style={{ color: "var(--sp-text)" }}>
              matières premières
            </strong>{" "}
            (Or, Pétrole) — sur toutes les unités de temps.
          </p>
        </div>
      </section>

      {/* Slide 8 — Multi-Timeframe */}
      <section data-background-color="#0b0f14">
        <div className="grid grid-cols-[1.3fr_1fr] gap-12 h-full items-center">
          <div className="space-y-6">
            <h2>
              La vision macro instantanée avec le tableau de bord
              multi-timeframe.
            </h2>
            <p>
              Ne tradez plus jamais à l&apos;aveugle contre le marché. Le
              tableau de bord intégré vous donne la tendance globale sur toutes
              les unités de temps en un seul coup d&apos;œil. Alignez vos
              entrées sur la tendance macro pour maximiser vos probabilités de
              succès.
            </p>
          </div>
          <div className="sp-card sp-card-accent p-6 space-y-3 max-w-[380px]">
            <div className="text-sm" style={{ color: "var(--sp-muted)" }}>
              Tendance Globale
              <br />
              <span className="text-xs opacity-70">Trend Table</span>
            </div>
            <TfRow tf="1m" status="up" />
            <TfRow tf="5m" status="up" />
            <TfRow tf="15m" status="neutral" />
            <TfRow tf="1H" status="down" />
            <TfRow tf="Daily" status="down" />
            <div className="text-xs pt-2" style={{ color: "var(--sp-muted)" }}>
              Alignement Macro : Neutre / Baissier
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  num,
  title,
  body,
  accent,
}: {
  num: string;
  title: string;
  body: string;
  accent?: "red" | "green";
}) {
  const borderColor =
    accent === "red" ? "var(--sp-red)" : "var(--sp-card-border)";
  return (
    <div
      className="sp-card space-y-2"
      style={{ borderColor, padding: "1rem 1.25rem" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-7 h-7 rounded-md text-sm font-semibold"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {num}
        </span>
        <h3 className="text-base m-0">{title}</h3>
      </div>
      <p className="text-sm m-0">{body}</p>
    </div>
  );
}

function AlertCard({ label }: { label: string }) {
  return (
    <div className="sp-card text-sm py-3 px-4">
      <span style={{ color: "var(--sp-green)" }}>●</span> {label}
    </div>
  );
}

function AssetChart({
  src,
  alt,
  title,
  caption,
  body,
}: {
  src: string;
  alt: string;
  title: string;
  caption: string;
  body: string;
}) {
  return (
    <div className="sp-card flex flex-col gap-3 p-5 min-h-0">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl m-0">{title}</h3>
        <span className="text-xs" style={{ color: "var(--sp-muted)" }}>
          {caption}
        </span>
      </div>
      <div className="flex-1 relative min-h-0">
        <Image
          src={src}
          alt={alt}
          fill
          className="sp-screenshot object-contain"
        />
      </div>
      <p className="text-sm m-0" style={{ color: "var(--sp-muted)" }}>
        {body}
      </p>
    </div>
  );
}

function TfRow({
  tf,
  status,
}: {
  tf: string;
  status: "up" | "down" | "neutral";
}) {
  const colorMap = {
    up: "var(--sp-green)",
    down: "var(--sp-red)",
    neutral: "var(--sp-muted)",
  };
  return (
    <div className="flex items-center justify-between sp-card py-3 px-4">
      <span className="text-lg font-medium">{tf}</span>
      <span
        className="inline-block w-3 h-3 rounded-full"
        style={{
          background: colorMap[status],
          boxShadow: `0 0 12px ${colorMap[status]}`,
        }}
      />
    </div>
  );
}
