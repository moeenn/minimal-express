import { env } from "#src/core/utils/env.mjs"
import process from "node:process"
import path from "node:path"

export const config = {
  server: {
    port: 3000,
    publicDir: path.join(process.cwd(), "public"),
  },
  logger: {
    level: env("LOG_LEVEL", "http"),    
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
  },
  database: {
    uri: env("DATABASE_URL"),
  },
  auth: {
    session: {
      secret: env("SESSION_SECRET"),
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
      },
    },
  },
}
