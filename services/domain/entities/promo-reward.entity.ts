import Entity from "./entity";

interface PromoReward extends Entity {
  promoId: string;
  value?: number;
  quantity?: number;
  rewardId?: string;
}

export default PromoReward;
