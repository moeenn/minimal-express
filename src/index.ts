import { config } from "./config"
import { createServer } from "./lib/server"
import { logger } from "./lib/logger"

/**
 * program entry-point
 *
 */
async function main(): Promise<void> {
  const app = createServer()

  /** start the server process */
  app.listen(config.server.port, () => {
    logger.info(`starting server on port ${config.server.port}`)
  })
}

main().catch(logger.error)
