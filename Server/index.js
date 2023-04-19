require("dotenv").config();
const mongUrl = process.env.MONGODB;
const express = require("express");
const typeDefs = require("./graphql/typeDefs")
const { createServer } = require("http");
const {makeExecutableSchema } = require("@graphql-tools/schema");

(async function() {
    const app = express();

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers,
    })
})();