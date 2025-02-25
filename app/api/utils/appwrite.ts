import { Client, Account, Databases } from "appwrite";

const client = new Client().setEndpoint('https://cloud.appwrite.io/v1');
client.setProject('67a672d70011f00c6853')

export const account = new Account(client);

export const databases = new Databases(client);

export interface Notes {
   _id?: string,
   user_id: string,
   Heading: string,
   Note: string
}

export interface User {
    _id?: string,
    Email: string
}

