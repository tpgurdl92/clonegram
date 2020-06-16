import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT ,MESSAGE_FRAGMENT} from "../../../fragment";

export default{
    Mutation:{
        sendMessage: async(_,args,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
            const {roomId,toId,text} = args;
            const date=new Date();
            console.log('im in');
            let isCreated= false;
            let room;
            try{
                
                room = await prisma.room({id:roomId}).$fragment(ROOM_FRAGMENT);   
    
                if(!room){
                    console.log("Room not found");
                    throw Error("Room not found")
                }
    
               return await prisma.createMessage({
                    text:text,
                    from:{connect:{id:user.id}},
                    to:{connect:{id:toId}},
                    room:{connect:{id:room.id}}
                }).$fragment(MESSAGE_FRAGMENT);
               
            
            }catch(e){
                console.log(e);
            }
        }
    }
}