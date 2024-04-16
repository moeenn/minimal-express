import process from "node:process"
import path from "node:path"
import express from "express"
import { config } from "./config.mjs"
import bodyParser from "body-parser"

import { publicPagesRouter } from "./modules/publicPages/publicPagesRouter.mjs"
import { authRouter } from "./modules/auth/authRouter.mjs"

/** @returns {Promise<void>} */
async function main() {
  const app = express()

  /** register all global middleware here */
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  /** expose static assets and public files */
  app.use(express.static(path.join(process.cwd(), "public")))

  /** register all routers here */
  app.use("/", publicPagesRouter)
  app.use("/auth", authRouter)

  app.listen(config.server.port, () => {
    console.log("starting server on port", config.server.port)
  })
}

main().catch(console.error)
