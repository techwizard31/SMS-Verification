import { databases, Notes } from "../utils/appwrite";
import { ID, Query } from "appwrite";

export async function POST(request: Request){
    const { user_id } = await request.json();
    if (!user_id) {
        return Response.json(
            { success: false, message: "user_id is required" },
            { status: 400 }
        );
    }
    try {
        const response = await databases.listDocuments(
            '67a67b9f0015c3b05b6a',
            '67bcb8650006e6295f65',
            [
                Query.equal('userId', user_id)
            ]  
    )
    const Usernotes:Notes [] = response.documents.map((doc)=>({
        _id: doc.$id,
        user_id: doc.userId,
        Heading: doc.Heading,
        Content: doc.Content
    }))
    return Response.json(
        { success: true, message: "Notes got successfully", data: Usernotes },
        { status: 200 }
      );
    } catch (error) {
        console.error("Error in getting the notes", error);
    return Response.json(
      { success: false, message: "Error getting the notes" },
      { status: 400 }
    );
    } 
}