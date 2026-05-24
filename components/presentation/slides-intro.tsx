import Image from "next/image";

export function SlidesIntro() {
  return (
    <>
      {/* Slide 1 — Cover */}
      <section data-background-color="#0b0f14">
        <div className="flex flex-col items-center justify-center text-center h-full gap-8">
          <h1 className="max-w-[18ch]">
            Arrêtez de deviner.
            <br />
            Commencez à trader avec certitude.
          </h1>
          <div className="flex items-center gap-6 text-6xl">
            <span style={{ color: "var(--sp-green)" }}>↑</span>
            <span style={{ color: "var(--sp-red)" }}>↓</span>
          </div>
          <p className="text-xl max-w-[60ch]">
            Une flèche. Une décision. Zéro hésitation.
            <br />
            Découvrez la méthode <strong>SimplifyPro</strong>.
          </p>
        </div>
      </section>

      {/* Slide 2 — Le problème */}
      <section data-background-color="#0b0f14">
        <div className="grid grid-cols-2 gap-12 h-full items-center">
          <div className="space-y-6">
            <h2>L&apos;illusion de la complexité sur vos graphiques.</h2>
            <p>
              Empiler les indicateurs ne donne pas plus de précision. Cela crée
              de la confusion, masque les vrais signaux et vous fait rater des
              opportunités critiques.
            </p>
            <ul
              className="space-y-3 text-base"
              style={{ color: "var(--sp-muted)" }}
            >
              <li>• Bandes de Bollinger en conflit</li>
              <li>• Moyennes mobiles multiples</li>
              <li>• MACD &amp; RSI contradictoires</li>
              <li>• Volume illisible</li>
            </ul>
          </div>
          <div className="relative">
            <Image
              src="/presentation/video/chart-overloaded.png"
              alt="Graphique surchargé : moyennes mobiles, MACD, RSI, Stochastique"
              width={1920}
              height={860}
              className="sp-screenshot w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Slide 3 — La solution : le signal pur */}
      <section data-background-color="#0b0f14">
        <div className="grid grid-cols-[1fr_1.4fr] gap-12 h-full items-center">
          <div className="space-y-6">
            <h2>Le signal de trading pur, sans le bruit parasite.</h2>
            <p>
              Créé par des traders, pour des traders. Nous avons condensé des
              années de tests complexes et de multiples indicateurs en un seul
              outil visuel <strong>instantané et infaillible</strong>.
            </p>
            <div className="flex gap-4 text-sm">
              <div className="sp-card flex items-center gap-3 px-4 py-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ background: "var(--sp-green)" }}
                />
                <span>Vert = Acheter</span>
              </div>
              <div className="sp-card flex items-center gap-3 px-4 py-2">
                <span
                  className="inline-block w-4 h-4 rounded"
                  style={{ background: "var(--sp-red)" }}
                />
                <span>Rouge = Vendre</span>
              </div>
            </div>
          </div>
          <Image
            src="/presentation/video/indicator-signals.png"
            alt="Indicateur SimplifyPro V7.0 sur NAS100"
            width={1920}
            height={860}
            className="sp-screenshot sp-screenshot-glow w-full h-auto"
          />
        </div>
      </section>
    </>
  );
}
