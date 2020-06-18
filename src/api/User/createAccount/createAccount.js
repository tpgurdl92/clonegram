import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation:{
        createAccount: async(_, args)=>{
            const {username, email, firstName ="", lastName = "", bio= ""} = args;
            const exists = await prisma.$exists.user({
                OR:[
                    {username},{email}
                ]
            });
            if(exists){
                throw  Error("This username/email is already taken");
            }
            try{ 
                const user=await prisma.createUser({username, email, firstName, lastName, bio});
                await prisma.updateUser({data:{following:{connect:{id:"ckanmgwk3001s0766kn5468w7"}}},where:{id:user.id}});
                return true;
            }catch(e){
                console.log(e);
                return false;
            }
        }
        
    }
}