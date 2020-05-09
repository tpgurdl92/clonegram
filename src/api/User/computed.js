import { prisma } from "../../../generated/prisma-client";

export default {
    User:{
        posts:({id})=>prisma.user({id}).posts(),
        following:({id})=>prisma.user({id}).following(),
        followers:({id})=>prisma.user({id}).followers(),
        likes:({id})=>prisma.user({id}).likes(),
        followingCount:({id})=>
            prisma
            .usersConnection({where:{followers_some:{id}}})
            .aggregate()
            .count(),
        followersCount:({id})=>
            prisma
            .usersConnection({where:{following_some:{id}}})
            .aggregate()
            .count(),    
        fullName:(parent)=>`${parent.firstName} ${parent.lastName}`
        ,
        amIFollowing:(parent, _, {request}) => {
            const {user }= request;
            const {id:parentId} = parent;
            try{
                return prisma.$exists.user({AND:[{id:parentId},{followers_some:{id:user.id}}]});  
            }catch{
                return false;
            }
        },
        itsMe:(parent,_,{request}) => {
            const { user } = request;
            const {id:parentId} = parent;
            return user.id === parentId;
        },
        postsCount:({id})=> prisma.postsConnection({where:{user:{id}}}).aggregate().count(),
    },
    
}