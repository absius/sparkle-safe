import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// need to update this mutation to match full model of jewelry
export const ADD_Jewelry = gql`
  mutation addJewelry($jewelry: [ID]!) {
    addJewelry(jewelry: $jewelry) {
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

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;
