import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        seeUser:async(_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {username} = args;
            const user = await prisma.user({username})
            //const posts = await prisma.user({username}).posts();
            return user;
        }
    }
}