import process from "node:process"
import path from "node:path"
import express from "express"
import { config } from "./config.mjs"
import compression from "compression"
import minify from "express-minify"
import { publicPagesRouter } from "./modules/publicPages/publicPagesRouter.mjs"

/** @returns {Promise<void>} */
async function main() {
  const app = express()
  app.use(compression())
  app.use(minify())
  app.use(express.static(path.join(process.cwd(), "public")))

  app.use("/", publicPagesRouter)

  app.listen(config.server.port, () => {
    console.log("starting server on port", config.server.port)
  })
}

main().catch(console.error)
