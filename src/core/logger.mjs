import winston from "winston"
import morgan from "morgan"
import { config } from "#src/config.mjs"

export const logger = winston.createLogger({
  level: config.logger.level,
  format: winston.format.combine(
    winston.format.timestamp({
      format: config.logger.timestampFormat,
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
