/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const editHero = /* GraphQL */ `
  mutation EditHero($input: HeroInput) {
    editHero(input: $input) {
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
export const saveHero = /* GraphQL */ `
  mutation SaveHero($input: HeroInput) {
    saveHero(input: $input) {
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
export const deleteHerofromSave = /* GraphQL */ `
  mutation DeleteHerofromSave($id: ID!) {
    deleteHerofromSave(id: $id) {
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
export const createHero = /* GraphQL */ `
  mutation CreateHero(
    $input: CreateHeroInput!
    $condition: ModelHeroConditionInput
  ) {
    createHero(input: $input, condition: $condition) {
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
export const updateHero = /* GraphQL */ `
  mutation UpdateHero(
    $input: UpdateHeroInput!
    $condition: ModelHeroConditionInput
  ) {
    updateHero(input: $input, condition: $condition) {
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
export const deleteHero = /* GraphQL */ `
  mutation DeleteHero(
    $input: DeleteHeroInput!
    $condition: ModelHeroConditionInput
  ) {
    deleteHero(input: $input, condition: $condition) {
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
