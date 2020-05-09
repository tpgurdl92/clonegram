import { prisma } from "../../../generated/prisma-client";

export default {
    Post:{
        isLiked: async(parent,_,{request})=>{
            const {user} = request;
            console.log(user.id);
            console.log(parent.id);
            const {postid} = parent;
            return prisma.$exists.like({AND:[
                {
                    user:{
                        id:user.id
                    }
                },
                {
                    post:{
                        id:postid
                    }
                }
            ]}) 
        },
        likeCount:(parent)=> prisma.likesConnection({where:{post:{id:parent.id}}}).aggregate().count(),
        files:parent => prisma.post({id:parent.id}).files(),
        comment:parent => prisma.post({id:parent.id}).comment(),
        user: parent => prisma.post({id:parent.id}).user(),
        commentCount:(parent)=> prisma.commentsConnection({where:{post:{id:parent.id}}}).aggregate().count(),
    }
}