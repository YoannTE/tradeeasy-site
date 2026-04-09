import fs from "fs";
import path from "path";
import type { Payload } from "payload";

export async function seedDatabase(payload: Payload) {
  await seedTestimonials(payload);
  await seedVideos(payload);
  await seedFaqs(payload);
  await seedDailyPerformance(payload);
}

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

async function seedTestimonials(payload: Payload) {
  const existing = await payload.find({ collection: "testimonials", limit: 1 });
  if (existing.docs.length > 0) return;

  const testimonials = [
    {
      clientName: "Marcus T.",
      role: "Full-time Crypto Trader",
      content:
        "I've tried dozens of indicators... This is the first one that actually stays consistent.",
      rating: 5,
    },
    {
      clientName: "Sarah Jenkins",
      role: "Swing Trader",
      content:
        "SimplifyPro simplified my workflow. I no longer spend 8 hours staring at candles.",
      rating: 5,
    },
    {
      clientName: "David L.",
      role: "Forex Specialist",
      content:
        "The transparency is what got me. They don't hide their losing trades.",
      rating: 5,
    },
  ];

  for (const data of testimonials) {
    await payload.create({ collection: "testimonials", data });
  }

  payload.logger.info("Seeded 3 testimonials");
}

// ---------------------------------------------------------------------------
// Videos
// ---------------------------------------------------------------------------

async function seedVideos(payload: Payload) {
  const existing = await payload.find({ collection: "videos", limit: 1 });
  if (existing.docs.length > 0) return;

  const videos = [
    {
      title: "How to Install SimplifyPro on TradingView",
      description:
        "Step-by-step guide to add SimplifyPro V6.0 to your TradingView chart.",
      youtubeUrl: "#",
      category: "installation" as const,
      displayOrder: 1,
    },
    {
      title: "Understanding Buy & Sell Signals",
      description: "Learn how to read and act on SimplifyPro's arrow signals.",
      youtubeUrl: "#",
      category: "usage" as const,
      displayOrder: 2,
    },
    {
      title: "Forex Trading Strategy with SimplifyPro",
      description: "A complete forex strategy using SimplifyPro on EUR/USD.",
      youtubeUrl: "#",
      category: "strategy" as const,
      displayOrder: 3,
    },
    {
      title: "Live Trading Session — March 2026",
      description: "Watch a real trading session using SimplifyPro signals.",
      youtubeUrl: "#",
      category: "trading_live" as const,
      displayOrder: 4,
    },
  ];

  for (const data of videos) {
    await payload.create({ collection: "videos", data });
  }

  payload.logger.info("Seeded 4 videos");
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

async function seedFaqs(payload: Payload) {
  const existing = await payload.find({ collection: "faqs", limit: 1 });
  if (existing.docs.length > 0) return;

  const faqs = [
    {
      question: "How does the 7-day free trial work?",
      answer:
        "Sign up with your credit card — you won't be charged during the trial. If you cancel before 7 days, you pay nothing. Your trial starts when we activate your TradingView access (within 12 hours), so you get the full 7 days.",
      displayOrder: 1,
    },
    {
      question: "What happens after my trial ends?",
      answer:
        "Your card is automatically charged $49/mo or $349/year depending on your chosen plan. You can cancel anytime before the trial ends to avoid any charge.",
      displayOrder: 2,
    },
    {
      question: "Is there a money-back guarantee?",
      answer:
        "Yes! We offer a 14-day money-back guarantee after your first payment. If you're not satisfied with SimplifyPro, contact us within 14 days of being charged and we'll issue a full refund — no questions asked.",
      displayOrder: 3,
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes. Cancel from your dashboard in one click. You'll keep access until the end of your billing period. No cancellation fees, no hassle.",
      displayOrder: 4,
    },
    {
      question: "Is SimplifyPro suitable for beginners?",
      answer:
        "Absolutely. SimplifyPro is designed to be simple: green arrows mean buy, red arrows mean sell. No complex setup needed. We also provide video tutorials and step-by-step guides to get you started.",
      displayOrder: 5,
    },
    {
      question:
        "How is SimplifyPro different from free TradingView indicators?",
      answer:
        "Free indicators typically use basic signals (RSI, MACD) that generate a lot of noise and false signals. SimplifyPro uses a proprietary algorithm that filters out market noise and only shows high-probability entry and exit points. Our daily performance page shows real, transparent results.",
      displayOrder: 6,
    },
    {
      question: "How do I get access to the indicator on TradingView?",
      answer:
        "After signing up, provide your TradingView username. Our team will grant you invite-only access within 12 hours. You'll receive an email confirmation as soon as it's activated.",
      displayOrder: 7,
    },
    {
      question: "What markets and timeframes does SimplifyPro support?",
      answer:
        "SimplifyPro works on any market — Indices (Nasdaq, S&P 500, DAX), Forex (EUR/USD, GBP/USD), Crypto (Bitcoin, Ethereum, Solana), Stocks, and Commodities (Gold, Oil). It works on all timeframes from 1 minute to monthly.",
      displayOrder: 8,
    },
    {
      question: "Can I use SimplifyPro on my phone?",
      answer:
        "Yes! Since SimplifyPro runs on TradingView, you can use it on TradingView's mobile app. You can also set up push notification alerts so you never miss a signal, even when you're away from your desk.",
      displayOrder: 9,
    },
    {
      question: "Can I switch between monthly and annual plans?",
      answer:
        "Yes. You can upgrade from monthly to annual at any time from your dashboard. The price difference will be prorated. You can also downgrade from annual to monthly at the end of your billing cycle.",
      displayOrder: 10,
    },
    {
      question: "Is this financial advice?",
      answer:
        "No. SimplifyPro is a technical analysis tool. It does not constitute financial advice. Past performance is not indicative of future results. Always trade responsibly, manage your risk, and never trade with money you can't afford to lose.",
      displayOrder: 11,
    },
  ];

  for (const data of faqs) {
    await payload.create({ collection: "faqs", data });
  }

  payload.logger.info("Seeded 11 FAQs");
}

// ---------------------------------------------------------------------------
// Daily Performance (with image uploads)
// ---------------------------------------------------------------------------

const performanceImages = [
  { asset: "nasdaq", file: "nasdaq.png", alt: "Nasdaq daily performance" },
  {
    asset: "dowjones",
    file: "dow-jones.png",
    alt: "Dow Jones daily performance",
  },
  { asset: "sp500", file: "s-p500.png", alt: "S&P 500 daily performance" },
  { asset: "gold", file: "gold.png", alt: "Gold daily performance" },
  { asset: "dax40", file: "dax40.png", alt: "DAX 40 daily performance" },
  { asset: "eurusd", file: "eur-usd.png", alt: "EUR/USD daily performance" },
  { asset: "bitcoin", file: "bitcoin.png", alt: "Bitcoin daily performance" },
  { asset: "solana", file: "solana.png", alt: "Solana daily performance" },
];

async function seedDailyPerformance(payload: Payload) {
  const existing = await payload.find({
    collection: "daily-performance",
    limit: 1,
  });
  if (existing.docs.length > 0) return;

  const screenshots: { asset: string; image: number | string }[] = [];

  for (const img of performanceImages) {
    const filePath = path.resolve(
      process.cwd(),
      "public/images/daily-performance",
      img.file,
    );

    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`Seed: image not found at ${filePath}, skipping`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);

    const media = await payload.create({
      collection: "media",
      data: { alt: img.alt },
      file: {
        data: fileBuffer,
        mimetype: "image/png",
        name: img.file,
        size: fileBuffer.length,
      },
    });

    screenshots.push({ asset: img.asset, image: media.id });
  }

  if (screenshots.length > 0) {
    await payload.create({
      collection: "daily-performance",
      data: {
        date: new Date().toISOString(),
        screenshots,
      },
    });

    payload.logger.info(
      `Seeded daily performance with ${screenshots.length} screenshots`,
    );
  }
}
