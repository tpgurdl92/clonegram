import "./env";
import {GraphQLServer} from 'graphql-yoga';
import {PubSubOptions} from 'graphql-subscriptions';
import schema from "./schema";
import logger from 'morgan';
import { isAuthenticated } from "./middleware"
import "./passport";
import {authenticateJwt} from "./passport";
import { uploadMiddleware, uploadController } from "./upload";
import {jwtVerify} from "./utils";

const PORT = process.env.PORT || 4000;

//
//const server = new GraphQLServer({typeDefs,resolvers});
const server = new GraphQLServer({schema, context:({request,connection}) =>{ console.log(connection); return({request,isAuthenticated,myId:jwtVerify(connection)}) },});
server.express.use(logger("dev"));
//server.express.use(logger("dev"));
server.express.post("/api/upload", uploadMiddleware,uploadController)
server.express.use(authenticateJwt);
server.start({port:PORT}, ()=> console.log(`Server running on http://localhost:${PORT}`));