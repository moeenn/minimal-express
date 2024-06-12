import { sql } from "@/lib/database"
import { logger } from "@/lib/logger"

async function clearDatabase() {
  await sql`DROP SCHEMA public CASCADE`
  await sql`CREATE SCHEMA public`
}

clearDatabase()
  .then(() => logger.info("database cleared"))
  .catch((err) => logger.error("failed to clear database", err))
  .finally(() => sql.end())
