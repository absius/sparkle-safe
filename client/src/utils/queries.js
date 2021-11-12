import { gql } from "@apollo/client";

// still need to update to match jewelry model
export const QUERY_JEWELRY = gql`
  query getJewelry($jewelry: ID) {
    jewelry(description: $description) {
      _id
      jewelryName
      description
      jewelryPrice
      assessedValue
      jewelryAssessor
      purchaseDate
      jewelryWarranty
      receiptPhoto
      createdAt
    }
  }
`;

// still needs to be checked against jewelry model
export const QUERY_ALL_JEWELRY = gql`
  {
    jewelry {
      _id
      jewelryName
      description
      jewelryPrice
      assessedValue
      jewelryAssessor
      purchaseDate
      jewelryWarranty
      receiptPhoto
      createdAt
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      jewelry {
        _id
        jewelryName
        description
        jewelryPrice
        assessedValue
        jewelryAssessor
        purchaseDate
        jewelryWarranty
        receiptPhoto
        createdAt
      }
    }
  }
`;
