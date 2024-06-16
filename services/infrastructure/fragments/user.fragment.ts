import { gql } from "@apollo/client";

import EntityFragment from "./entity.fragment";

const UserFragment = gql`
  fragment UserFragment on User {
    # entity common fields
    ${EntityFragment}

    # entity specific fields
    phoneNumber
  }
`;

export default UserFragment;
