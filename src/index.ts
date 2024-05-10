import { config } from "./config"
import { createServer } from "./lib/server"
import { authRouter } from "./modules/auth/auth.router"
import { userRouter } from "./modules/user/user.router"
import { logger } from "./lib/logger"

/**
 * program entry-point
 *
 */
async function main(): Promise<void> {
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
