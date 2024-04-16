import express from "express"
import bodyParser from "body-parser"
import { config } from "#src/config.mjs"

/**
 * create an fully configured instance of the express server
 * this instance will also be used for testing
 *
 * @returns {import("express").Express}
 */
export function createServer() {
  const app = express()

  /** register all global middleware here */
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  /** expose static assets and public files */
  app.use(express.static(config.server.publicDir))

  return app
}
