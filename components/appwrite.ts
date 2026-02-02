import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6944f8270022e734361e"); // replace this

export const account = new Account(client);
