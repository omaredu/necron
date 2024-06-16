import Promo from "@services/domain/entities/promo.entity";
import PromosRepository from "@services/domain/repositories/promos.repository";

class ProductsService {
  constructor(private promosRepository: PromosRepository) {}

  list(): Promise<Promo[]> {
    return this.promosRepository.list();
  }
}

export default ProductsService;
