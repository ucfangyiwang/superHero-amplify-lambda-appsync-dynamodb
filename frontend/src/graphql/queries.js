
import { ApolloClient, InMemoryCache, gql ,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_AWS_ENDPOINT,
});
console.log(process.env.REACT_APP_AWS_ENDPOINT)
console.log(process.env.REACT_APP_AWS_KEY)
const authLink = setContext((_, { headers }) => {
  const apiKey = process.env.REACT_APP_AWS_KEY;
  return {
    headers: {
      ...headers,
      'x-api-key': apiKey,
    }
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export async function searchHeroByname(name) {
  const query = gql`
    query SearchHeroByName($name: String!) {
      heroes: searchHerobyName(name: $name) {
        id
        name
      }
    }
  `;

  try {
    const response = await client.query({ query, variables: { name } });
    const heroes = response.data.heroes;
    console.log(heroes);
    return heroes;
  } catch (error) {
    console.error(error);
    throw new Error('some thing wrong when search hero');
  }
}
export async function searchHeroById(id) {
  const query = gql`
    query SearchHeroById($id: ID!) {
      hero: searchHerobyId(id: $id) {
        id
        name
          intelligence
          strength
          speed
          durability
          power
          combat
        image 

      }
    }
  `;
try {
  const response = await client.query({ query, variables: { id } });
  const hero = response.data.hero;
  console.log(hero);
  return hero;
} catch (error) {
  console.error(error);
  throw new Error('some thing wrong when search hero');
}
}



export async function editHero(input) {
  // JSON.parse(JSON.stringify(input))
  const mutation = gql`
    mutation EditHero($input: HeroInput!) {
      hero: editHero(input: $input) {
        id
        name
          intelligence
          strength
          speed
          durability
          power
          combat     
        image 
      }
    }
  `;
  const { hero } = await client.mutate({mutation, variables: { input }});
  return hero;
}

export async function saveHero(input) {
  // JSON.parse(JSON.stringify(input))
  const mutation = gql`
    mutation SaveHero($input: HeroInput!) {
      hero: saveHero(input: $input) {
        id
        name
        intelligence
          strength
          speed
          durability
          power
          combat     
        image 
      }
    }
  `;
  const { hero } = await client.mutate({mutation,variables: { input }});
  return hero;
}

export async function unsaveHero(id) {
  const mutation = gql`
    mutation DeleteHerofromSave($id: ID!) {
        hero: deleteHerofromSave(id: $id){
            id
        }
    }
  `;
  const { hero } = await client.mutate({mutation,variables: { id }});
  return hero;
}
export async function getSavedHeroes() {
  const query = gql`
    query {
      heroes: getSaveHeros {
        id
        name
          intelligence
          strength
          speed
          durability
          power
          combat
        image  
      }
    }
  `;
  try {
    const response = await client.query({ query, variables: { query } });
    const hero = response.data.heroes;
    console.log(hero);
    return hero;
  } catch (error) {
    console.error(error);
    throw new Error('some thing wrong when getSavedHeroes');
  }

}