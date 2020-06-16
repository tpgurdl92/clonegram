import { prisma } from "../../../../generated/prisma-client"
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Mutation:{
        createRoom:async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
            const {toId, text} = args;
            const date=new Date();
            const room=await prisma.createRoom({
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
