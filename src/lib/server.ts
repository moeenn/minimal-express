import express, { Express } from "express"
import bodyParser from "body-parser"
import helmet from "helmet"
import { config } from "@/config"
import { loggerMiddleware } from "./logger"
import { globalErrorHandler } from "./middleware"

/**
 * create an fully configured instance of the express server
 * this instance will also be used for testing
 */
export function createServer(callback: (_: Express) => void): Express {
  const app = express()

  /** register all global middleware here */
  app.use(helmet())
  app.use(loggerMiddleware)
  app.use(bodyParser.json())

  /** expose static assets and public files */
  if (config.server.public.exposePublicFolder) {
    app.use(express.static(config.server.public.publicDir))
  }

  callback(app)

  /** catch-all error handler: must register after all routes and middleware */
  app.use(globalErrorHandler)
  return app
}
