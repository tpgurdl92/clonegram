import { prisma } from "../../../generated/prisma-client";

export default {
    Alarm:{
        user: async(parent)=>{
            console.log(parent);
            if(parent.type==="follow"){
                return prisma.user({id:parent.userid});
            }else if(parent.type==="like"){
                return prisma.like({id:parent.id}).user();
            }
            
        },
        post: async(parent)=>{
            if(parent.id===""){
                return null;
            }
            return prisma.like({id:parent.id}).post();
        }
    }
}