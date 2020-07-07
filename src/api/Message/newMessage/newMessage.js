import { prisma } from "../../../../generated/prisma-client";
import {MESSAGE_FRAGMENT} from "../../../fragment";
import * as jwt from 'jsonwebtoken';

export default {
    Subscription:{
        newMessage:{
            subscribe:async(_,args,ctx,dd)=>{
                console.log('sub');
                //console.log(_);
                const {myId} = ctx;
                
                console.log(ctx);
                /*if(ctx.myId){
                    console.log(ctx.connection.context);
                    jwt.verify( ctx.connection.context.Authorization, process.env.JWT_SECRET, (err, decoded) => {
                        if (err) {
                            //error
                            console.log(err);
                        } else {
                           myId=decoded.id;
                        }
                    });
                }*/
                return prisma.$subscribe.message({AND:[
                    {mutation_in:["CREATED"]},
                    {
                        node:{
                            OR:[
                                   
                                    {to:{id:myId}}
                                ]
                        }    
                    }
                    ]}).node().$fragment(MESSAGE_FRAGMENT);
                    

            },
            resolve: (payload,args,ctx) =>{
                console.log(payload);
                const {myId} = ctx;
                if(payload.to.id===myId){
                    payload.to.itsMe =true;
                    payload.from.itsMe=false;
                }else if(payload.from.id===myId){
                    payload.to.itsMe =false;
                    payload.from.itsMe=true;
                }else{
                    throw ('message classify error');
                }
                if(payload.room.participantA.id===myId){
                    payload.room.participantA.itsMe=true;
                    payload.room.participantB.itsMe=false;
                }else if(payload.room.participantB.id===myId){
                    payload.room.participantA.itsMe=false;
                    payload.room.participantB.itsMe=true;
                }else{
                    throw ('room classify error');
                }
                
                return payload
            },
        }
    }
}