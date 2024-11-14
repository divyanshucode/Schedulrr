import { PrismaClient } from '@prisma/client';


export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV != 'production') {
  globalThis.db = db;
}
//during development: hot reloading takes place , which create multiple instances of PrismaClient on each reload
//this code checks if a globlal instance of PrismaClient is already created and reused , if not it creates a new instance

//what is hot reloading?
//Hot reloading is a feature that allows a developer to make changes to the codebase 
//and see the changes reflected in the application without restarting the server.

//in prooduction, a single instance is there no multiple instances are created

