"use client";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../Appcontext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface Notes {
  _id?: string;
  user_id: string;
  Heading: string;
  Content: string;
}

function page() {
  const { user } = useAppContext();
  const [notes, setNotes] = useState<Notes[]>([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");

  const handlefetch = async () => {
    try {
      const response = await fetch("/api/fetchnotes", {
        method: "POST",
        body: JSON.stringify({ user_id: user?._id }),
      });

      if (!response.ok) throw new Error("Failed to fetch notes");

      const data = await response.json();
      setNotes(data.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch notes");
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch("/api/noteactions", {
        method: "POST",
        body: JSON.stringify({
          user_id: user?._id,
          Heading: heading,
          Content: content,
        }),
      });

      if (!response.ok) throw new Error("Failed to create note");
      setContent("");
      setHeading("");
      handlefetch();
    } catch (error) {
      console.log(error);
      alert("Failed to create notes");
    }
  };

  useEffect(()=>{
    handlefetch();
  },[user])

  return (
    <div className="bg-black w-full h-screen m-0 pt-8">
      <Card className="w-[290px] mx-auto bg-black">
        <CardHeader>
          <CardTitle className="text-white">Create Note</CardTitle>
          <CardDescription>
            Create important notes within minutes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-white">
                  Heading
                </Label>
                <Input
                  id="name"
                  placeholder="Heading of the note"
                  className="text-white"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name" className="text-white ">
                  Content
                </Label>
                <Textarea
                  id="name"
                  placeholder="Content of the note"
                  className="text-white"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            className="hover:bg-black hover:text-white transition-all duration-100"
            onClick={handleCreate}
          >
            Create
          </Button>
        </CardFooter>
      </Card>
      {user ? (
        <div className="flex w-4/5 justify-around items-start mx-auto mt-4">
          {Array.isArray(notes) &&
            notes.map((note) => (
              <Card key={note._id} className="w-[250px] bg-black flex flex-col gap-2 justify-center items-center p-0">
                <CardHeader className="p-0 m-0">
                  <CardTitle className="text-white">{note.Heading}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base text-white">{note.Content}</CardDescription>
              </Card>
            ))}
        </div>
      ) : (
        <h1>
          Please log in{" "}
          <a href="/" className="underline">
            {" "}
            Login{" "}
          </a>
        </h1>
      )}
    </div>
  );
}

export default page;
