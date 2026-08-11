import { PrismaClient } from "@prisma/client";

let prismaInstance: any;

// A robust mock client that mirrors Prisma's interface for build-time validation and local demo fallback
const mockPrisma = {

  penduduk: {
    findMany: async () => [],
    create: async ({ data }: { data: any }) => ({ id: "mock-uid", ...data }),
  },
  berita: {
    findMany: async () => [],
    create: async ({ data }: { data: any }) => ({ id: "mock-uid", ...data }),
  },
  anggaran: {
    findMany: async () => [],
    create: async ({ data }: { data: any }) => ({ id: "mock-uid", ...data }),
  },
};

if (typeof window === "undefined" && process.env.DATABASE_URL) {
  try {
    // Dynamic import to prevent build-time missing module failures for pg or adapter-pg
    const { Pool } = require("pg");
    const { PrismaPg } = require("@prisma/adapter-pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    
    // We instantiate actual Prisma Client with PG adapter
    prismaInstance = new PrismaClient({ adapter });
    console.log("[Prisma] Client successfully initialized with PostgreSQL adapter.");
  } catch (err) {
    console.warn("[Prisma] Failed to load database adapter. Falling back to mock client.", err);
    prismaInstance = mockPrisma;
  }
} else {
  // If no DATABASE_URL is provided, or we are on the client-side/build compilation, we use the mock
  prismaInstance = mockPrisma;
}

export const prisma = prismaInstance;
export type PrismaClientType = typeof mockPrisma;
