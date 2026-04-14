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
      clientName: "James R.",
      role: "Day Trader — Nasdaq & S&P 500",
      content:
        "I was skeptical at first, like with every indicator. But after 3 weeks on demo, I subscribed. The signals are clean, no repaint, and the alerts save me from sitting in front of my screen all day. Easily the best money I spend each month.",
      rating: 5,
    },
    {
      clientName: "Léa M.",
      role: "Swing Trader — Forex",
      content:
        "I used to rely on 4-5 free indicators stacked on top of each other. SimplifyPro replaced all of them. My charts are cleaner, my entries are better, and I finally stopped second-guessing myself on EUR/USD.",
      rating: 5,
    },
    {
      clientName: "Tom K.",
      role: "Part-time Trader — Crypto",
      content:
        "Not going to lie, it doesn't catch every move — no indicator does. But the win rate is solid and the risk/reward on the signals is usually 1:2 or better. That's all I need to be profitable on BTC and ETH.",
      rating: 4,
    },
    {
      clientName: "Priya S.",
      role: "Beginner — Started 6 months ago",
      content:
        "I had zero experience with trading when I started. The green and red arrows made it so simple to understand entries and exits. The video tutorials helped a lot too. I'm not rich yet, but I'm learning and actually making consistent small gains.",
      rating: 5,
    },
    {
      clientName: "Daniel W.",
      role: "Full-time Trader — DAX & Gold",
      content:
        "What I appreciate most is the daily performance page. They show every signal, including the losses. That level of transparency is rare in this industry. The indicator itself is solid on 15min and 1H for indices.",
      rating: 5,
    },
    {
      clientName: "Ana C.",
      role: "Swing Trader — Stocks & ETFs",
      content:
        "I was paying $150/month for another premium indicator that gave me the same results as free ones. Switched to SimplifyPro at $49 and my results actually improved. The alerts on my phone are a game changer for swing trading.",
      rating: 4,
    },
  ];

  for (const data of testimonials) {
    await payload.create({ collection: "testimonials", data });
  }

  payload.logger.info("Seeded 6 testimonials");
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
  {
    asset: "dax40",
    file: "dax40.png",
    alt: "DAX 40 daily performance",
    timeframe: "1 minute Chart",
  },
  {
    asset: "bitcoin",
    file: "bitcoin.png",
    alt: "Bitcoin daily performance",
    timeframe: "1 hour Chart",
  },
  {
    asset: "eurusd",
    file: "eur-usd.png",
    alt: "EUR/USD daily performance",
    timeframe: "15 minutes Chart",
  },
  {
    asset: "gold",
    file: "gold.png",
    alt: "Gold daily performance",
    timeframe: "3 minutes Chart",
  },
  {
    asset: "dowjones",
    file: "dow-jones.png",
    alt: "Dow Jones daily performance",
    timeframe: "5 minutes Chart",
  },
  {
    asset: "nasdaq",
    file: "nasdaq.png",
    alt: "Nasdaq daily performance",
    timeframe: "1 minute Chart",
  },
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
