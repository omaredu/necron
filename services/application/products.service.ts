import Product from "@services/domain/entities/product.entity";
import ProductsRepository from "@services/domain/repositories/products.repository";

class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  list(): Promise<Product[]> {
    return this.productsRepository.list();
  }

  get(id: string): Promise<Product | null> {
    return this.productsRepository.get(id);
  }
}

export default ProductsService;
