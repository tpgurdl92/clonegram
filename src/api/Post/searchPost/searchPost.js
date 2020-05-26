import { prisma } from "../../../../generated/prisma-client";

export default{
    Query:{
        searchPost: async(_,args) => {
            const {term,action} = args;
            if(action==="ID"){
                return [prisma.post({id:term})];
            }
            else if(action==="TERM"){
                return prisma.posts({where: {OR:[{location_starts_with:term},{caption_starts_with:term}]}})
            }
        }
    }
}