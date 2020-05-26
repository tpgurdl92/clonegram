import "./env";
import {GraphQLServer} from 'graphql-yoga';
import {prisma} from "../generated/prisma-client";
import schema from "./schema";
import logger from 'morgan';
import { isAuthenticated } from "./middleware"
import "./passport";
import {authenticateJwt} from "./passport";
import { uploadMiddleware, uploadController } from "./upload";


const PORT = process.env.PORT || 4000;

//
//const server = new GraphQLServer({typeDefs,resolvers});
const server = new GraphQLServer({schema, context:({request}) => ({request,isAuthenticated})});
server.express.use(logger("dev"));
//server.express.use(logger("dev"));
server.express.post("/api/upload", uploadMiddleware,uploadController)
server.express.use(authenticateJwt);
server.start({PORT},()=> console.log(`Server running on http://localhost:${PORT}`));