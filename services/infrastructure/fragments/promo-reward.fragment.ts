import { gql } from "@apollo/client";

import EntityFragment from "./entity.fragment";

const PromoRewardFragment = gql`
  fragment PromoRewardFragment on PromoReward {
    # entity common fields
    ${EntityFragment}

    # entity specific fields
    promoId
    value
    quantity
    rewardId
  }
`;

export default PromoRewardFragment;
