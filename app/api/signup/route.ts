import { ID } from "appwrite";
import { account, User } from "../utils/appwrite";

export async function POST(request: Request){
    const { email,password } = await request.json();
    try {
        const user = await account.create(
            ID.unique(), 
            email,
            password
        );
        const session = await account.createEmailPasswordSession(
            email, 
            password
        );
        const User: User = {
            _id: user.$id,
            Email: user.email
        }
    return Response.json(
        { success: true, message: "User signedin successfully", User, session },
        { status: 200 }
      );
    } catch (error) {
        console.error("Error in signing up the user", error);
    return Response.json(
      { success: false, message: "Error in signing up the user" },
      { status: 400 }
    );
    } 
}




