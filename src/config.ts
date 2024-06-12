import process from "node:process"
import path from "node:path"
import { Algorithm } from "jsonwebtoken"

/**
 * ----------------------------------------------------------------------------
 *
 * helper functions for accessing environment variables
 *
 * ----------------------------------------------------------------------------
 */

/** read environment variables, throw error if variable is not set */
function env(key: string, fallback: string | undefined = undefined): string {
  const value = process.env[key]
  if (!value && !!fallback) {
    return fallback
  }

  if (!value) {
    throw new Error(`env variable not set: ${key}`)
  }

  return value.trim()
}

/**
 * ----------------------------------------------------------------------------
 *
 * global configuration object definition
 *
 * ----------------------------------------------------------------------------
 */
export const config = {
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
      algorithm: "HS256" as Algorithm,
      issuer: env("API_HOST"),
    },
  },
  general: {
    resultsPerPage: 10,
  },
}
