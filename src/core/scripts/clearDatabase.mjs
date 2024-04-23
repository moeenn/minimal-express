import { db } from "#src/core/database.mjs"

db.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;")
  .then(() => console.log("Database cleared"))
  .catch((err) => console.error("Failed to clear database", err))
  .finally(() => db.end())
