import Product from "@services/domain/entities/product.entity";

interface ProductRepository {
  list(): Promise<Product[]>;
  get(id: string): Promise<Product | null>;
}

export default ProductRepository;
