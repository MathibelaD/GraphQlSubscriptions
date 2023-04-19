require("dotenv").config();
const mongUrl = process.env.MONGODB;
const express = require("express");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { createServer } = require("http");
const {makeExecutableSchema } = require("@graphql-tools/schema");
const {SubscriptionServer} = require("subscriptions-transport-ws");
const { ApolloServer } = require("apollo-server-express");
const {execute, subscribe} = require("graphql");
const mongoose = require("mongoose");

(async function() {
    const app = express();

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    });
    const subscriptionServer = SubscriptionServer.create(
        {schema, execute, subscribe},
        {server: httpServer, path: '/graphql'}
    )

    const server = new ApolloServer({
        schema, plugins: [{
            async serverWillStart(){
                return {
                    async drainServer() {
                        subscriptionServer.close();
                    }
                }
            }
        }]
    })
    await server.start();
    server.applyMiddleware({app});

    mongoose.connect(mongUrl, {useNewUrlParser: true});
    const port = 4000
    httpServer.listen(port, () => {
        console.log(`http Server running on por ${port}`);
    });
})();