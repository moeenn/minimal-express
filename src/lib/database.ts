import postgres from "postgres"
import { config } from "@/config"
import { recoverAsync } from "@moeenn/recover"

export const sql = postgres(config.database.uri)

/** check if the connection to the database is alive */
export async function ping(): Promise<boolean> {
  const result = await recoverAsync(() => sql`select 1=1`)
  if (result.error) return false
  return true
}
