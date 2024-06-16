import { gql } from "@apollo/client";

import EntityFragment from "./entity.fragment";

const PromoActivationFragment = gql`
  fragment PromoActivationFragment on PromoActivation {
    # entity common fields
    ${EntityFragment}

    # entity specific fields
    promoId
    minQuantity
    minValue
  }
`;

export default PromoActivationFragment;
