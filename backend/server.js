const{ ApolloServer, gql } =require ('apollo-server-lambda');
const cors =require  ('cors');
const express =require  ('express');
const { readFile } =require ( 'node:fs/promises');
const { resolvers }  =require ('./graphql/resolvers.js');
const dotenv  =require ( 'dotenv');
dotenv.config();

const PORT = process.env.SERVER_PORT
const app = express();
app.use(cors(), express.json());
async function main (){

const typeDefs = await readFile('./graphql/schema.graphql', 'utf8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer));

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
}
main();