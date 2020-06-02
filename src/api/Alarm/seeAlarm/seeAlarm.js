import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middleware";

export default {
    Query:{
        seeAlarm:async(_,args,{request})=>{
            const {user} = request;
            let result = [];
            const follows=await prisma.follows({where:{to:user.id}});
            follows.map(item=>{
                result.push({
                    id:item.id,
                    userid:item.from,
                    type:"follow",
                    createdAt:item.createdAt       
                })
            });
            console.log(follows);
            const posts = await prisma.posts({where:{user:{id:user.id}}});
            const likes= await prisma.likes({where:{post:{id_in:[...posts.map(post=>post.id)]}}});

            likes.map(item=>{
                result.push({
                    id:item.id,
                    type:"like",
                    createdAt:item.createdAt
                });
            });
            return result;
        }
    }
}
