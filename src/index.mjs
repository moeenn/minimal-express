import { config } from "./config.mjs"
import { createServer } from "#src/lib/server.mjs"
import { authRouter } from "./modules/auth/auth.router.mjs"
import { userRouter } from "./modules/user/user.router.mjs"
import { logger } from "./lib/logger.mjs"

/** @returns {Promise<void>} */
async function main() {
  const app = createServer((instance) => {
    /** register all routers here */
    instance.use("/api/auth", authRouter)
    instance.use("/api/user", userRouter)
  })

  /** start the server process */
  app.listen(config.server.port, () => {
    logger.info(`starting server on port ${config.server.port}`)
  })
}

main().catch(logger.error)
