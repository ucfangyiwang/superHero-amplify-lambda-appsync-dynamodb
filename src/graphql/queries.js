/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const searchHerobyName = /* GraphQL */ `
  query SearchHerobyName($name: String!) {
    searchHerobyName(name: $name) {
      id
      name
      intelligence
      strength
      speed
      durability
      power
      combat
      image
      isSave
      createdAt
      updatedAt
    }
  }
`;
export const searchHerobyId = /* GraphQL */ `
  query SearchHerobyId($id: ID!) {
    searchHerobyId(id: $id) {
      id
      name
      intelligence
      strength
      speed
      durability
      power
      combat
      image
      isSave
      createdAt
      updatedAt
    }
  }
`;
export const getSaveHeros = /* GraphQL */ `
  query GetSaveHeros {
    getSaveHeros {
      id
      name
      intelligence
      strength
      speed
      durability
      power
      combat
      image
      isSave
      createdAt
      updatedAt
    }
  }
`;
export const getHero = /* GraphQL */ `
  query GetHero($id: ID!) {
    getHero(id: $id) {
      id
      name
      intelligence
      strength
      speed
      durability
      power
      combat
      image
      isSave
      createdAt
      updatedAt
    }
  }
`;
export const listHeroes = /* GraphQL */ `
  query ListHeroes(
    $filter: ModelHeroFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeroes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        intelligence
        strength
        speed
        durability
        power
        combat
        image
        isSave
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
