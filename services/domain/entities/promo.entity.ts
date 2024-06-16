import Entity from "./entity";
import PromoActivation from "./promo-activation.entity";
import PromoReward from "./promo-reward.entity";

export const promoTypes = {
  money: "money",
  percentage: "percentage",
  bonus: "bonus",
} as const;

export type PromoType = (typeof promoTypes)[keyof typeof promoTypes];

interface Promo extends Entity {
  productId: string;
  description: string;
  promoType: PromoType;
  promoActivation: PromoActivation;
  promoReward: PromoReward;
}

export default Promo;
