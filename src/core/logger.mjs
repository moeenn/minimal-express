import winston from "winston"
import morgan from "morgan"
import { config } from "#src/config.mjs"

export const logger = winston.createLogger({
  level: config.server.logLevel, // default: 'http'
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss.SSS",
    }),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
})

export const loggerMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  },
)
