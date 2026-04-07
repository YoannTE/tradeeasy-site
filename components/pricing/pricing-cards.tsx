import { PricingCardMonthly } from "./pricing-card-monthly";
import { PricingCardAnnual } from "./pricing-card-annual";

export function PricingCards() {
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
      <PricingCardMonthly />
      <PricingCardAnnual />
    </div>
  );
}
