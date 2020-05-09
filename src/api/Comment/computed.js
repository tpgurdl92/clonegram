import { prisma } from "../../../generated/prisma-client";

export default {
    Comment:{
        user: async(parent)=>{
            return prisma.comment({id:parent.id}).user();
        }

        
    }
}