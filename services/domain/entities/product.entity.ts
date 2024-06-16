import Entity from "./entity";
import Promo from "./promo.entity";

interface Product extends Entity {
  sku: string;
  description: string;
  name: string;
  price: number;
  factoryPrice: number;
  promos: Promo[];
}

export default Product;
