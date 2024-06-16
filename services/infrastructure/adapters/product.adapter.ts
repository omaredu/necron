import Product from "@/services/domain/entities/product.entity";

import PromoAdapter from "./promo.adapter";

import Adapter, { EntityFields } from "./adapter";

class ProductAdapter extends Adapter<Product> {
  constructor(private readonly promoAdapter: PromoAdapter) {
    super();
  }

  adapt(item: unknown): Omit<Product, EntityFields> {
    const { sku, description, name, price, factoryPrice, promos } = item as any;

    return {
      sku,
      description,
      name,
      price: price / 100.0,
      factoryPrice: factoryPrice / 100.0,
      promos: promos.map((promo: any) => this.promoAdapter.adapt(promo)),
    };
  }
}

export default ProductAdapter;
