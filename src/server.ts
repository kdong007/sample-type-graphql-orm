import "reflect-metadata"; // required by typeORM and type graphql
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";
// import RootQueryMutation from "./models/RootQueryMutation";
import Name from "./models/Name";
import RootQueryMutation from "./models/RootQueryMutation";
import Student from "./models/Student";
import { createConnection } from "typeorm";
import Bike from "./models/Bike";

const schema = buildSchemaSync({
    // compile-time import
    resolvers: [Name, Student, RootQueryMutation, Bike],

    // run-time import
    // resolvers: ["./models/*.ts"],
    emitSchemaFile: true,
});

// online communities
// schema -> graphql typing only

// apollo-server
// - typeDefs
// - resolver, function
// - typeDefs+resolver = schema

// express server + apollo-express-handler
// runs the handler on "POST /"
// runs the graphql playground on "GET /"

// node
// - express
// - koa
// - hapi

const server = new ApolloServer({
    schema,

    // schema-first
    // typeDefs: <- read in your hand written schema as string
    // resolver: <- big nested dictionary of resolver functions (kind of rest handler)
});

createConnection({
    type: "postgres",
    host: "localhost",
    port: 6543,
    database: "sample",
    username: "postgres",
    password: "postgres",
    entities: [Student, Bike],
    synchronize: true,
    logging: true,
}).then(conn => {
    console.log("db connected");
    server
        .listen(4000) // 4000 is default too
        .then(result => {
            console.log("server started at:", result.url);
        });
});
