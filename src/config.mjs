import { env } from "#src/core/utils/env.mjs"
import process from "node:process"
import path from "node:path"

export const config = {
  server: {
    port: 3000,
    publicDir: path.join(process.cwd(), "public"),
  },
  database: {
    uri: env("DATABASE_URL"),
  },
}
