import { gql } from "@apollo/client";

import Product from "@services/domain/entities/product.entity";
import ProductsRepository from "@services/domain/repositories/products.repository";

import Client from "@services/infrastructure/client";
import ProductAdapter from "@services/infrastructure/adapters/product.adapter";

class ProductsImpl implements ProductsRepository {
  constructor(
    private readonly client: Client,
    private readonly adapter: ProductAdapter,
  ) {}

  async list(): Promise<Product[]> {
    const client = this.client.getClient("GraphQL");

    const QUERY = gql`
      query ListProducts {
        products {
          ...ProductFragment
        }
      }
    `;

    const { data } = await client.query({ query: QUERY });

    return data.products.map((product: any) => this.adapter.perform(product));
  }

  async get(id: string): Promise<Product | null> {
    const products = await this.list();

    return products.find((product) => product.id === id) || null;
  }
}

export default ProductsImpl;
