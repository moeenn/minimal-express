import { createServer, startServer } from "./lib/server"
import { logger } from "./lib/logger"

/** program entry-point */
async function main(): Promise<void> {
  const app = createServer()
  startServer(app)
}

main().catch(logger.error)
