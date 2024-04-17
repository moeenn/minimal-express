import pg from "pg"
import { config } from "#src/config.mjs"

export const db = new pg.Client({
  connectionString: config.database.uri,
})
