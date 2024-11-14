import { currentUser , clerkClient} from "@clerk/nextjs/server"; 
import { db } from "./prisma";




export const checkUser = async () => {
    const user = await currentUser();
    //currentUser() returns the current user object

    if(!user) { 
        return null; //if no user is found, return null
    }

    try{
        const loggeInUser = await db.user.findUnique({
         where : {
              clerkUserId: user.id,//check if the user is already in the database using the clerkUserId
        }
    });

    if(loggeInUser){
        return loggeInUser;//if the user is found in the database, return the user
    }

    const name = `${user.firstName} ${user.lastName}`; //it is creating name from the user object
    
    // await clerkClient().users.updateUser(user.id, {
    //     username: name.split(" ").join("-") + user.id.slice(-4),
    //   });

    await clerkClient().users.updateUser(user.id , {
        username : name.split(" ").join("-") + user.id.slice(-4),
    })
    //this updates the username of the user in the clerk database
    //separated by space then joined using - and last four digits of the user id is added
    //eg john-doe-1234

    //now updating the database with the new user
    const newUser = await db.user.create({
        data:{
            clerkUserId: user.id,
            name,
            imageUrl: user.imageUrl,
            email : user.emailAddresses[0].emailAddress,//getting the email address 
            username: name.split(" ").join("-")+user.id.slice(-4),
        }
    })
      return newUser;
    } catch (error) {
        console.log(error);
    }
    
}