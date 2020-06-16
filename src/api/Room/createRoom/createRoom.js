import { prisma } from "../../../../generated/prisma-client"
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Mutation:{
        createRoom:async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
            const {toId, text} = args;
            const date=new Date();
            let room =await prisma.rooms(
                {where:{OR:[
                    {AND:[{participantA:{id:toId}},{participantB:{id:user.id}}]},
                    {AND:[{participantB:{id:toId}},{participantA:{id:user.id}}]},
                ]}
                }).$fragment(ROOM_FRAGMENT);
            if(room.length>0){
                return room[0];
            }
            room=await prisma.createRoom({
                participantA:{connect:{id:user.id}},
                participantB:{connect:{id:toId}},
                admissionA:true,
                admissionB:false,
                showMessageDateA:date,
                showMessageDateB:date,
                lastCheckTimeA:date,
                lastCheckTimeB:date,
            }).$fragment(ROOM_FRAGMENT);
        
            return room;
        }
    }
}
