import { prisma } from "../../../../generated/prisma-client"


export default {
    Mutation:{
        respondRequest:async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
            const {roomId,acception} =args;
            const date = new Date();
            try{
                const userSwitch =await prisma.room({id:roomId}).participantA({id:user.id});
                if(acception){
                    if(userSwitch){
                        await prisma.updateRoom({data:{admissionA:true},where:{id:roomId}});
                    }else{
                        await prisma.updateRoom({data:{admissionB:true},where:{id:roomId}});
                    }
                }else{
                    if(userSwitch){
                        await prisma.updateRoom({data:{showMessageDateA:date},where:{id:roomId}});
                    }else{
                        await prisma.updateRoom({data:{showMessageDateA:date},where:{id:roomId}});
                    }
                }
            }catch(e){
                console.log(e);
                return false;
            }
            return true;
        }
    }
}