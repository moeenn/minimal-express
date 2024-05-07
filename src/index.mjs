import { config } from "./config.mjs"
import { createServer } from "#src/core/server.mjs"
import { publicPagesRouter } from "./modules/publicPages/publicPagesRouter.mjs"
import { authRouter } from "./modules/auth/authRouter.mjs"
import { logger } from "./core/logger.mjs"
import { sql } from "./core/database.mjs"

/** @returns {Promise<void>} */
async function main() {
  const app = createServer()

  /** register all routers here */
  app.use("/", publicPagesRouter)
  app.use("/auth", authRouter)

  /** start the server process */
  app.listen(config.server.port, () => {
    logger.info(`starting server on port ${config.server.port}`)
  })
}

main()
  .then(async () => await sql.end())
  .catch(console.error)
