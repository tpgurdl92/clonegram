import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        follow:async(_,args,{request})=>{
            isAuthenticated(request);
            const { id }= args;
            const {user} = request;
            try{
                await prisma.updateUser({where:{id:user.id},data:{
                    following:{
                        connect:{
                            id
                        }
                    }
                }});
                await prisma.createFollow({from:user.id,fromAvatar:user.avatar,fromUserName:user.username,to:id});
                return true;
            }catch{
                return false;
            }
        }
    }
}