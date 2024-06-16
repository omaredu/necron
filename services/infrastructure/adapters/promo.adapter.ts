import Promo, { promoTypes } from "@/services/domain/entities/promo.entity";

import Adapter, { EntityFields } from "./adapter";

import PromoActivationAdapter from "./promo-activation.adapter";
import PromoRewardAdapter from "./promo-reward.adapter";

class PromoAdapter extends Adapter<Promo> {
  constructor(
    private readonly promoActivationAdapter: PromoActivationAdapter,
    private readonly promoRewardAdapter: PromoRewardAdapter,
  ) {
    super();
  }

  adapt(item: unknown): Omit<Promo, EntityFields> {
    const { productId, description, type, activation, reward } = item as any;

    return {
      productId,
      description,
      promoType: promoTypes[type as keyof typeof promoTypes],
      promoActivation: this.promoActivationAdapter.perform(activation),
      promoReward: this.promoRewardAdapter.perform(reward),
    };
  }
}

export default PromoAdapter;
