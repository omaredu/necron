import PromoActivation from "@/services/domain/entities/promo-activation.entity";

import Adapter, { EntityFields } from "./adapter";

class PromoActivationAdapter extends Adapter<PromoActivation> {
  adapt(item: unknown): Omit<PromoActivation, EntityFields> {
    const { promoId, minQuantity, minValue } = item as any;

    return {
      promoId,
      minQuantity: minQuantity ?? undefined,
      minValue: minValue ?? undefined,
    };
  }
}

export default PromoActivationAdapter;
