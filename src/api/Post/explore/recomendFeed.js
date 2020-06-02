import { prisma } from "../../../../generated/prisma-client";

export default {
    Query:{
        recommendFeed: async(_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            const {page,postIdList} = args
            const following = await (await prisma.user({id:user.id}).following());
            return prisma.posts({where:{id_not_in:postIdList}},{orderBy:"createdAt_DESC"},{first:20*page,});
        }
    }
}