import "reflect-metadata"; // required by typeORM and type graphql
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";
import Name from "./models/Name";
import RootQuery from "./models/RootQuery";
import Student from "./models/Student";

const schema = buildSchemaSync({
    resolvers: [Name, Student, RootQuery],
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

    playground: false,
    // schema-first
    // typeDefs: <- read in your hand written schema as string
    // resolver: <- big nested dictionary of resolver functions (kind of rest handler)
});

server
    .listen(4000) // 4000 is default too
    .then(result => {
        console.log("server started at:", result.url);
    });
