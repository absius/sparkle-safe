import { gql } from "@apollo/client";

// still need to update to match jewelry model
export const QUERY_JEWELRY = gql`
  query getJewelry($jewelry: ID) {
    jewelry(description: $description) {
      _id
      name
      description
      purchasePrice
      purveyor
      image
    }
  }
`;

// still needs to be checked against jewelry model
export const QUERY_ALL_JEWELRY = gql`
  {
    jewelry {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
