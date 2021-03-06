import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";


export default{
    Mutation:{
        confirmSecret: async(_,args,{request})=>{
            const {email,secret} =args;
            console.log(request);
            const user = await prisma.user({email});
            if(user.loginSecret === secret){
                if(email!=='testuser@gmail.com'&&secret!=='test user'){
                    await prisma.updateUser({where:{id:user.id},data:{
                        loginSecret:''
                    }});
                }
                return generateToken(user.id);
            }else{
                throw Error("Wrong email/secret combination");
            }
        }
    }
}