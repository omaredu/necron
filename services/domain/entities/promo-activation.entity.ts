import Entity from "./entity";

interface PromoActivation extends Entity {
  promoId: string;
  minQuantity?: number;
  minValue?: number;
}

export default PromoActivation;
