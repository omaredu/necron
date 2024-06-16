import Promo from "@services/domain/entities/promo.entity";

interface ProductRepository {
  list(): Promise<Promo[]>;
}

export default ProductRepository;
