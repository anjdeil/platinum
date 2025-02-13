import { LOYALTY_LEVELS } from "./consts";

type LoyaltyLevel = "Silver" | "Gold" | "Platinum";
type LoyaltyResult = { level?: LoyaltyLevel; nextLevelAmount?: string };

export const getLoyaltyLevel = (totalSpent: number): LoyaltyResult => {
  if (totalSpent < LOYALTY_LEVELS[0].amount) {
    return { nextLevelAmount: (LOYALTY_LEVELS[0].amount - totalSpent).toFixed(2) };
  }

  for (let i = LOYALTY_LEVELS.length - 1; i >= 0; i--) {
    if (totalSpent >= LOYALTY_LEVELS[i].amount) {
      return i < LOYALTY_LEVELS.length - 1
        ? { level: LOYALTY_LEVELS[i].name, nextLevelAmount: (LOYALTY_LEVELS[i + 1].amount - totalSpent).toFixed(2) }
        : { level: LOYALTY_LEVELS[i].name };
    }
  }

  return {};
};