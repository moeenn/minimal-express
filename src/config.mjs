import { env } from "#src/lib/utils/env.mjs"
import process from "node:process"
import path from "node:path"

export const config = {
  server: {
    port: 3000,
    public: {
      exposePublicFolder: false,
      publicDir: path.join(process.cwd(), "public"),
    },
  },
  logger: {
    level: env("LOG_LEVEL", "http"),
    timestampFormat: "YYYY-MM-DD HH:mm:ss.SSS",
  },
  database: {
    uri: env("DATABASE_URL"),
  },
  auth: {
    password: {
      minLength: 8,
    },
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
