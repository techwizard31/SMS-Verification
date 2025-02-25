import { databases, Notes } from "../utils/appwrite";
import { ID, Query } from "appwrite";

export async function POST(request: Request){
    const { Heading,Note,user_id } = await request.json();
    try {
        const newNote = {Heading:Heading,Note:Note,user_id:user_id }
        const response = await databases.createDocument(
            'Users',
            'Notes',
            ID.unique(),
            newNote
    )
    console.log(response)
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

export async function GET(request: Request){
    const { user_id } = await request.json();
    try {
        const response = await databases.listDocuments(
            'Users',
            'Notes',
            [
                Query.equal('user_id', user_id)
            ]  
    )
    console.log(response)
    const Usernotes:Notes [] = response.documents.map((doc)=>({
        $id: doc.$id,
        user_id: doc.user_id,
        Heading: doc.Heading,
        Note: doc.Note
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

export async function DELETE(request: Request){
    const { _id } = await request.json();
    try {
        const response = await databases.deleteDocument(
            'Users',
            'Notes',
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
    const { Heading,Note,user_id, _id } = await request.json();
    try {
        const newNote = {Heading:Heading,Note:Note,user_id:user_id, }
        const response = await databases.updateDocument(
            'Users',
            'Notes',
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
