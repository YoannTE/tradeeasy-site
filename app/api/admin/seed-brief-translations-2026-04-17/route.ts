import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

const SECRET = "sp-seed-2026-04-17-tr6xq9";

const translations = {
  en: {
    date: "Friday, April 17, 2026 (Paris time)",
    recapBody:
      'WALL STREET ON FIRE 🔥\nThe S&P 500 and Nasdaq hit their second consecutive record close. The Nasdaq posted its 12th straight day of gains, its longest streak since 2009. Boursorama S&P 500 +0.26% (11th consecutive gain), Nasdaq-100 +0.5% at 26,333 pts, Dow +0.25% at 48,580 pts. The S&P 500 has gained roughly 11% since March 30, an unprecedented performance since 1957 ABC Bourse according to CMC Markets.\nBut beware: this rally was mainly driven by short covering and automatic fund purchases, without a massive influx of new capital — a setup that makes the rally fragile in the short term ABC Bourse. WTI climbed back toward $94, rates tightened 4 to 4.5 bps — not exactly a classic "risk-on" environment.\nToday\'s stars: AMD +7.8% (new all-time high at $278), Dell +9%, On Semi +10.3%, Microsoft best weekly performance since 2015 ABC Bourse. The SOXX index (semiconductors) gained 31% in 12 sessions.\nCAC 40: nearly flat, -0.14% at 8,263 pts. Paris remains behind Wall Street, held back by luxury.',
    agendaSublabel: "",
    agendaBody:
      "4:00 PM (Paris) — Michigan Consumer Confidence Index (April preliminary) + inflation expectations: this is the only major data point of the day. If inflation expectations come out higher (likely given oil prices), it could cool the mood on rates and the dollar. Otherwise, no other major stat — the session will mostly be driven by end-of-week flows and digesting Netflix's results (released last night after the US close).\nOn earnings: the season continues. ASML posted excellent numbers (€8.8B revenue, raised guidance). Also watch potential reactions to this week's reports (LVMH, Hermès, Kering, US banks).\n\n⚠️ MARKET STRUCTURE ALERT: TRIPLE WITCHING DAY\nIt's the quarterly expiration of index options, equity options and futures contracts. Additional volatility likely, especially in the last trading hour. Unusual volumes, erratic moves possible around 3:30-5:35 PM on the CAC and at the end of the US session. Beware of false signals.",
    geopoliticsBody:
      'HOT OVERNIGHT SIGNALS\nTrump stated that the US and Iran are "very close" to a deal and that Tehran agrees to give up its enriched uranium Boursorama. Israel and Lebanon have agreed to a 10-day ceasefire starting this morning. But at the same time, the Pentagon is threatening to bomb Iran again if Tehran "makes the wrong choice" Boursorama and is maintaining the blockade. Markets are riding the optimistic scenario — any diplomatic reversal will be a shock.',
    tomorrowLabel: "End of the week",
    tomorrowBody: "Rest",
    readingBody:
      "We're in full end-of-rally euphoria: 12 Nasdaq sessions of gains, records everywhere, +11% in 2 weeks on the S&P. But the fundamental context hasn't changed: Hormuz is still largely blocked, oil is at ~$94-100, US inflation is picking up again (March CPI at 3.3% annual including +21% on gasoline), and the Fed has no room to maneuver. The rally is driven by the \"war will end\" narrative — if it doesn't materialize quickly, watch out for the backlash.\nFor this Friday: it's a weekly close + triple witching + Michigan session. Volatility is guaranteed. Profit-taking possible after an exceptional week on Wall Street. Protect your positions, reduce leverage, and don't stay exposed on a late-session breakout without confirmation.",
  },
  es: {
    date: "Viernes, 17 de abril de 2026 (hora de París)",
    recapBody:
      'WALL STREET EN LLAMAS 🔥\nEl S&P 500 y el Nasdaq alcanzaron su segundo récord histórico consecutivo al cierre. El Nasdaq encadenó su 12ª sesión de subidas consecutivas, su mejor racha desde 2009. Boursorama S&P 500 +0,26 % (11ª subida consecutiva), Nasdaq-100 +0,5 % a 26 333 pts, Dow +0,25 % a 48 580 pts. El S&P 500 ha ganado aproximadamente un 11 % desde el 30 de marzo, un rendimiento inédito desde 1957 ABC Bourse según CMC Markets.\nPero cuidado: esta subida ha sido alimentada sobre todo por recompras de posiciones cortas y compras automáticas de fondos, sin la llegada de nuevos capitales masivos, una configuración que hace que la subida sea frágil a corto plazo ABC Bourse. El WTI ha vuelto a subir hacia los 94 $, los tipos se han tensado de 4 a 4,5 pb — no es exactamente un entorno "risk-on" clásico.\nEstrellas del día: AMD +7,8 % (nuevo récord absoluto a 278 $), Dell +9 %, On Semi +10,3 %, Microsoft mejor rendimiento semanal desde 2015 ABC Bourse. El índice SOXX (semiconductores) ha ganado un 31 % en 12 sesiones.\nCAC 40: casi estable, -0,14 % a 8 263 pts. París sigue rezagado respecto a Wall Street, frenado por el lujo.',
    agendaSublabel: "",
    agendaBody:
      "16h00 (París) — Índice Michigan de confianza del consumidor (preliminar de abril) + expectativas de inflación: es el único gran dato del día. Si las expectativas de inflación salen al alza (probable dado el petróleo), podría enfriar el ambiente sobre los tipos y el dólar. Si no, no hay otra estadística importante — la sesión estará guiada sobre todo por los flujos de fin de semana y la digestión de los resultados de Netflix (publicados anoche tras el cierre estadounidense).\nEn cuanto a resultados: la temporada continúa. ASML ha publicado excelentes cifras (facturación de 8.800 M€, previsiones elevadas). Hay que vigilar también las posibles reacciones a las publicaciones de la semana (LVMH, Hermès, Kering, bancos estadounidenses).\n\n⚠️ ALERTA ESTRUCTURA DE MERCADO: DÍA DE LAS 3 BRUJAS\nEs el vencimiento trimestral de las opciones sobre índices, opciones sobre acciones y contratos de futuros. Volatilidad adicional probable, sobre todo en la última hora de cotización. Volúmenes inusuales, movimientos erráticos posibles entre las 15h30-17h35 en el CAC y al final de la sesión estadounidense. Cuidado con las señales falsas.",
    geopoliticsBody:
      'SEÑALES CALIENTES DE LA NOCHE\nTrump declaró que EE.UU. e Irán están "muy cerca" de un acuerdo y que Teherán acepta deshacerse de su uranio enriquecido Boursorama. Israel y Líbano han acordado un alto el fuego de 10 días a partir de esta mañana. Pero al mismo tiempo, el Pentágono amenaza con bombardear de nuevo Irán si Teherán "toma la mala decisión" Boursorama y mantiene el bloqueo. Los mercados surfean sobre el escenario optimista — cualquier revés diplomático será un shock.',
    tomorrowLabel: "Fin de semana",
    tomorrowBody: "Descanso",
    readingBody:
      'Estamos en plena euforia de fin de rally: 12 sesiones al alza en el Nasdaq, récords por todas partes, +11 % en 2 semanas en el S&P. Pero el contexto fundamental no ha cambiado: Ormuz sigue en gran medida bloqueado, el petróleo está a ~94-100 $, la inflación estadounidense vuelve a subir (IPC de marzo al 3,3 % anual incluyendo +21 % en la gasolina), y la Fed no tiene margen de maniobra. El rally está impulsado por el relato de que "la guerra va a terminar" — si no se concreta rápido, cuidado con el efecto rebote.\nPara este viernes: es una sesión de cierre semanal + 3 brujas + Michigan. La volatilidad está garantizada. Posible toma de beneficios tras una semana excepcional en Wall Street. Protege tus posiciones, reduce el apalancamiento y no te quedes expuesto a un breakout de final de sesión sin confirmación.',
  },
  de: {
    date: "Freitag, 17. April 2026 (Pariser Zeit)",
    recapBody:
      'WALL STREET IN FLAMMEN 🔥\nDer S&P 500 und der Nasdaq erreichten ihren zweiten aufeinanderfolgenden Rekordschluss. Der Nasdaq legte seinen 12. Handelstag in Folge zu, seine längste Serie seit 2009. Boursorama S&P 500 +0,26 % (11. Anstieg in Folge), Nasdaq-100 +0,5 % auf 26.333 Punkte, Dow +0,25 % auf 48.580 Punkte. Der S&P 500 hat seit dem 30. März rund 11 % zugelegt, eine seit 1957 beispiellose Performance ABC Bourse laut CMC Markets.\nAber Vorsicht: Dieser Anstieg wurde vor allem durch Short-Eindeckungen und automatische Fondskäufe getrieben, ohne massiven Zufluss neuen Kapitals — eine Konstellation, die den Anstieg kurzfristig fragil macht ABC Bourse. Der WTI stieg wieder Richtung 94 $, die Zinsen zogen um 4 bis 4,5 Basispunkte an — nicht gerade ein klassisches "Risk-on"-Umfeld.\nDie Stars des Tages: AMD +7,8 % (neues Allzeithoch bei 278 $), Dell +9 %, On Semi +10,3 %, Microsoft beste Wochenperformance seit 2015 ABC Bourse. Der SOXX-Index (Halbleiter) legte in 12 Sitzungen 31 % zu.\nCAC 40: nahezu unverändert, -0,14 % auf 8.263 Punkte. Paris bleibt hinter Wall Street zurück, gebremst durch den Luxussektor.',
    agendaSublabel: "",
    agendaBody:
      "16:00 Uhr (Paris) — Michigan-Index des Verbrauchervertrauens (April, vorläufig) + Inflationserwartungen: das ist die einzige wichtige Kennzahl des Tages. Wenn die Inflationserwartungen höher ausfallen (wahrscheinlich angesichts des Ölpreises), könnte das die Stimmung bei Zinsen und Dollar abkühlen. Ansonsten keine weitere wichtige Statistik — die Sitzung wird hauptsächlich von den Wochenschlussflüssen und der Verdauung der Netflix-Zahlen (gestern Abend nach US-Börsenschluss veröffentlicht) geprägt sein.\nBei den Ergebnissen: die Saison geht weiter. ASML hat exzellente Zahlen veröffentlicht (8,8 Mrd. € Umsatz, angehobene Prognosen). Zu beobachten sind auch mögliche Reaktionen auf die Veröffentlichungen dieser Woche (LVMH, Hermès, Kering, US-Banken).\n\n⚠️ WARNUNG MARKTSTRUKTUR: HEXENSABBAT\nEs ist der vierteljährliche Verfallstermin von Indexoptionen, Aktienoptionen und Futures-Kontrakten. Zusätzliche Volatilität wahrscheinlich, vor allem in der letzten Handelsstunde. Ungewöhnliche Volumina, erratische Bewegungen möglich zwischen 15:30 und 17:35 Uhr im CAC und am Ende der US-Sitzung. Vorsicht vor falschen Signalen.",
    geopoliticsBody:
      'HEISSE SIGNALE DER NACHT\nTrump erklärte, die USA und der Iran seien "sehr nah" an einem Abkommen und Teheran stimme zu, sein angereichertes Uran abzugeben Boursorama. Israel und der Libanon haben sich auf einen 10-tägigen Waffenstillstand ab heute Morgen geeinigt. Gleichzeitig droht das Pentagon jedoch, den Iran erneut zu bombardieren, wenn Teheran "die falsche Wahl trifft" Boursorama, und hält die Blockade aufrecht. Die Märkte reiten auf dem optimistischen Szenario — jeder diplomatische Umschwung wird ein Schock sein.',
    tomorrowLabel: "Wochenende",
    tomorrowBody: "Ruhepause",
    readingBody:
      'Wir stecken mitten in einer Endphasen-Euphorie: 12 Nasdaq-Sitzungen im Plus, überall Rekorde, +11 % in 2 Wochen beim S&P. Aber der fundamentale Kontext hat sich nicht verändert: Hormuz ist weiterhin weitgehend blockiert, das Öl steht bei ~94-100 $, die US-Inflation zieht wieder an (März-CPI bei 3,3 % jährlich, inklusive +21 % bei Benzin), und die Fed hat keinen Spielraum. Die Rally wird vom Narrativ getragen, dass "der Krieg bald endet" — wenn sich das nicht schnell konkretisiert, Vorsicht vor dem Rückschlag.\nFür diesen Freitag: eine Wochenschlussitzung + Hexensabbat + Michigan. Die Volatilität ist garantiert. Gewinnmitnahmen sind nach einer außergewöhnlichen Woche an der Wall Street möglich. Schütze deine Positionen, reduziere den Hebel und bleibe nicht ohne Bestätigung bei einem späten Ausbruch exponiert.',
  },
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("token") !== SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    await payload.updateGlobal({
      slug: "daily-brief",
      data: { translations },
      context: { skipTranslation: true },
    });
    return NextResponse.json({
      ok: true,
      locales: Object.keys(translations),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
