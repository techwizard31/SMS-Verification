import { databases, Notes } from "../utils/appwrite";
import { ID, Query } from "appwrite";

export async function POST(request: Request){
    const { Heading,Content,user_id } = await request.json();
    try {
        const newNote = {Heading:Heading,Content:Content,userId:user_id }
        const response = await databases.createDocument(
            '67a67b9f0015c3b05b6a',
            '67bcb8650006e6295f65',
            ID.unique(),
            newNote
    )
    return Response.json(
        { success: true, message: "Note added successfully" },
        { status: 200 }
      );
    } catch (error) {
        console.error("Error in adding the note", error);
    return Response.json(
      { success: false, message: "Error adding the note" },
      { status: 400 }
    );
    } 
}

export async function DELETE(request: Request){
    const { _id } = await request.json();
    try {
        const response = await databases.deleteDocument(
            '67a67b9f0015c3b05b6a',
            '67bcb8650006e6295f65',
            _id
    )
    console.log(response)

    return Response.json(
        { success: true, message: "Note deleted successfully"},
        { status: 200 }
      );
    } catch (error) {
        console.error("Error in deleting the notess", error);
    return Response.json(
      { success: false, message: "Error delering the notes" },
      { status: 400 }
    );
    } 
}

export async function PATCH(request: Request){
    const { Heading,Content,user_id, _id } = await request.json();
    try {
        const newNote = {Heading:Heading,Content:Content,userId:user_id, }
        const response = await databases.updateDocument(
            '67a67b9f0015c3b05b6a',
            '67bcb8650006e6295f65',
            _id,
            newNote
    )
    console.log(response)
    return Response.json(
        { success: true, message: "Note updated successfully" },
        { status: 200 }
      );
    } catch (error) {
        console.error("Error in updating the note", error);
    return Response.json(
      { success: false, message: "Error updating the note" },
      { status: 400 }
    );
    } 
}
