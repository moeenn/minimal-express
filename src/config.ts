import { env } from "@/lib/shared/env"
import process from "node:process"
import path from "node:path"
import { Config } from "./lib/types"

export const config: Config = {
  server: {
    port: 3000,
    public: {
      exposePublicFolder: true,
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
    jwt: {
      secret: env("JWT_SECRET"),
      expiresInHours: 1,
      algorithm: "HS256",
      issuer: env("API_HOST"),
    },
  },
  general: {
    resultsPerPage: 10,
  },
}
