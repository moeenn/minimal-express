import { sql } from "#src/lib/database.mjs"

async function clearDatabase() {
  await sql`
  DROP SCHEMA public CASCADE; CREATE SCHEMA public;
  `
}

clearDatabase()
  .then(() => console.log("Database cleared"))
  .catch((err) => console.error("Failed to clear database", err))
  .finally(() => sql.end())
