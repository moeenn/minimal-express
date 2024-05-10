import { Algorithm } from "jsonwebtoken"

/**
 * ----------------------------------------------------------------------------
 * 
 * global configuration object types 
 * 
 * ----------------------------------------------------------------------------
 */

type ServerPublicConfig =
  | { exposePublicFolder: true; publicDir: string }
  | { exposePublicFolder: false }

type ServerConfig = {
  port: number
  public: ServerPublicConfig
}

type LoggerConfig = {
  level: string
  timestampFormat: string
}

type DatabaseConfig = {
  uri: string
}

type AuthPasswordConfig = {
  minLength: number
}

type AuthJWTConfig = {
  secret: string
  expiresInHours: number
  algorithm: Algorithm
  issuer: string
}

type AuthConfig = {
  password: AuthPasswordConfig
  jwt: AuthJWTConfig
}

type GeneralConfig = {
  resultsPerPage: number
}

export type Config = {
  server: ServerConfig
  logger: LoggerConfig
  database: DatabaseConfig
  auth: AuthConfig
  general: GeneralConfig
}
