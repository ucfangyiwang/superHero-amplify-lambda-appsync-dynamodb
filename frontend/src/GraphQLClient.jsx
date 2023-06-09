
// import { ApolloProvider,ApolloClient, InMemoryCache,  createHttpLink } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';

// const httpLink = createHttpLink({
//   uri: 'https://7qfgvjlgorbmdciube3o4uab5e.appsync-api.ap-southeast-2.amazonaws.com/graphql',
// });
// const authLink = setContext((_, { headers }) => {
//   const apiKey = 'da2-3h7uwb3vxjd3hizyxeryilnf3e';
//   return {
//     headers: {
//       ...headers,
//       'x-api-key': apiKey,
//     }
//   };
// });
// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });

// function GraphQLClient({children}){
//     return <ApolloProvider client={client}>{children}</ApolloProvider>
// }

// export default GraphQLClient