import { prisma } from "../../../../generated/prisma-client"


export default {
    Query:{
        recommendFollowing:async(_,__,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
            const followers = await prisma.users({where:{AND:[{following_some:{id:user.id}},{followers_none:{id:user.id}}]}});
            return followers;
        }
    }
}