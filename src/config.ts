import { env } from "@/lib/utils/env"
import process from "node:process"
import path from "node:path"
import { Algorithm } from "jsonwebtoken"

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
    jwt: {
      secret: env("JWT_SECRET"),
      expiresInHours: 1,
      algorithm: "HS256" as Algorithm,
      issuer: env("API_HOST"),
    },
  },
}
