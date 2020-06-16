import { prisma } from "../../../../generated/prisma-client"

export default {
    Subscription:{
        newRequest:{
            subscribe:async(_,__,{request})=>{
                const {user} = request;
            return prisma.$subscribe.room({AND:[
                    {mutation_in:"CREATED"},
                    {node:
                        {participantB:{id:user.id},
                        admissionB:false,}
                    }
                   ]
            });
            },
            resolve: payload =>payload
        }
    }
}