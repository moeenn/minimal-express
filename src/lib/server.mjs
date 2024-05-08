import express from "express"
import bodyParser from "body-parser"
import { config } from "#src/config.mjs"
import { loggerMiddleware } from "./logger.mjs"
import { globalErrorHandler } from "./middleware.mjs"

/**
 * create an fully configured instance of the express server
 * this instance will also be used for testing
 *
 * @param {(instance: import("express").Express) => void} callback
 * @returns {import("express").Express}
 */
export function createServer(callback) {
  const app = express()

  /** register all global middleware here */
  app.use(loggerMiddleware)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  /** expose static assets and public files */
  if (config.server.public.exposePublicFolder) {
    app.use(express.static(config.server.public.publicDir))
  }

  callback(app)

  /** catch-all error handler: must register after all routes and middleware */
  app.use(globalErrorHandler)
  return app
}
