import { gql } from "@apollo/client";

import EntityFragment from "./entity.fragment";

const ProductFragment = gql`
  fragment PromoFragment on Promo {
    # entity common fields
    ${EntityFragment}

    # entity specific fields
    productId
    description
    type
    activation {
      ...PromoActivationFragment
    }
    reward {
      ...PromoRewardFragment
    }
  }
`;

export default ProductFragment;
