import { gql } from "@apollo/client";

import Promo from "@services/domain/entities/promo.entity";
import PromosRepository from "@services/domain/repositories/promos.repository";

import Client from "@services/infrastructure/client";
import PromoAdapter from "@services/infrastructure/adapters/promo.adapter";

class PromosImpl implements PromosRepository {
  constructor(
    private readonly client: Client,
    private readonly adapter: PromoAdapter,
  ) {}

  async list(): Promise<Promo[]> {
    const client = this.client.getClient("GraphQL");

    const QUERY = gql`
      query ListPromos {
        promos {
          ...PromoFragment
        }
      }
    `;

    const { data } = await client.query({ query: QUERY });

    return data.promos.map((promo: any) => this.adapter.perform(promo));
  }
}

export default PromosImpl;
