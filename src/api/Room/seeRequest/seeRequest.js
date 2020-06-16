import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Query:{
        seeRequest:async(_,__,{request,isAuthenticated})=>{
            isAuthenticated(request);
            const {user} = request;
           /*await prisma.raw('select * from User');*/
            const  requestList= await prisma.rooms({where:{
                OR:[
                    {AND:[
                        {participantA:{id:user.id}},
                        {admissionA:false},
                     
                    ]}
                    ,
                    {AND:[
                        {participantB:{id:user.id}}
                        ,
                        {admissionB:false}
                    ]}
                ]
            }
        ,orderBy:"createdAt_DESC",}
        )
        const resultList=requestList.map(item=>{
            if(!item.admissionA){
                return item;
            }
            if(!item.admissionB){
                return item;
            }
        });
        return resultListt;
        }
    }
}