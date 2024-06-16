import PromoReward from "@/services/domain/entities/promo-reward.entity";

import Adapter, { EntityFields } from "./adapter";

class PromoRewardAdapter extends Adapter<PromoReward> {
  adapt(item: unknown): Omit<PromoReward, EntityFields> {
    const { promoId, value, quantity, rewardId } = item as any;

    return {
      promoId,
      value: value ?? undefined,
      quantity: quantity ?? undefined,
      rewardId: rewardId ?? undefined,
    };
  }
}

export default PromoRewardAdapter;
