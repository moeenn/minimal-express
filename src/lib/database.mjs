import postgres from "postgres"
import { config } from "#src/config.mjs"

export const sql = postgres(config.database.uri)
