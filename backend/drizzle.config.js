import { PgSchema } from "drizzle-orm/pg-core";
import { ENV } from "./src/config/env";
import { drizzle } from "drizzle-orm/neon-http";

export default {
    schema:"./src/db/schema.js",
    out:"./src/db/migrations",
    dialect:"postgresql",
    dbCredentials:{url:ENV.DATABASE_URL},
}