import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './schema'
import { APP_PORT, IN_PROD } from './config'


const DB_USER = 'xxxxxxx';
const DB_PASS = 'XXXXXXX';
const DB_HOST = 'xxxxxxxxxxxxxxxxxx';
const DB_NAME = 'xxxxxxx';

// If mongoDB connects only then spin up the server otherwise throw an error
(async () => {
    try{
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`, { useNewUrlParser : true }
        )
        
        const app = express();
        app.disable('x-powered-by');

        const server = new ApolloServer({
            typeDefs,
            resolvers,
            playground : !IN_PROD
        });

        server.applyMiddleware({ app }); // app is from an existing express app

        app.listen({ port: APP_PORT }, () =>
        console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
        )
    } catch(e) {
        console.log(e);
    }
})();

