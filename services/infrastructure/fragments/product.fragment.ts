import { gql } from "@apollo/client";

import EntityFragment from "./entity.fragment";

const ProductFragment = gql`
  fragment ProductFragment on Product {
    # entity common fields
    ${EntityFragment}

    # entity specific fields
    sku
    description
    name
    price
    factoryPrice
    promos {
      ...PromoFragment
    }
  }
`;

export default ProductFragment;
