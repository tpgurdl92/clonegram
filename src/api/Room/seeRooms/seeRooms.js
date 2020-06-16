import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default{
    Query:{
        seeRooms:(_,__,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
            return prisma.rooms({
                where:{OR:[
                    {participantA:{id:user.id}},
                    {participantB:{id:user.id}}
                ]
                }
            }).$fragment(ROOM_FRAGMENT);
        }
    }
}