import { sql } from "@/lib/database"

async function clearDatabase() {
  await sql`DROP SCHEMA public CASCADE`
  await sql`CREATE SCHEMA public`
}

clearDatabase()
  .then(() => console.log("Database cleared"))
  .catch((err) => console.error("Failed to clear database", err))
  .finally(() => sql.end())