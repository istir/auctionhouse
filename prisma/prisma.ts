import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  console.log("Production: Created DB connection.");
} else {
  // @ts-ignore
  if (!global.db) {
    // @ts-ignore
    global.db = new PrismaClient();
    console.log("Development: Created DB connection.");
  }

  // @ts-ignore
  prisma = global.db;
}

export default prisma;
