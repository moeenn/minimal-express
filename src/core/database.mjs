import pg from "pg"
import { config } from "#src/config.mjs"

export const db = new pg.Pool({
  connectionString: config.database.uri,
})
