import express from "express"
import bodyParser from "body-parser"
import session from "express-session"
import cookieParser from "cookie-parser"
import { config } from "#src/config.mjs"
import { loggerMiddleware } from "./logger.mjs"
import { globalErrorHandler } from "./middleware/globalErrorHandler.mjs"

/**
 * create an fully configured instance of the express server
 * this instance will also be used for testing
 *
 * @returns {import("express").Express}
 */
export function createServer() {
  const app = express()

  /** register all global middleware here */
  app.use(loggerMiddleware)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session(config.auth.session))

  /** expose static assets and public files */
  app.use(express.static(config.server.publicDir))
  app.use(globalErrorHandler)

  return app
}
