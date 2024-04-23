import { logger } from "#src/core/logger.mjs"
import status from "http-status"

/**
 * Handle unhandled errors globally
 * @param {unknown} error
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function globalErrorHandler(error, req, res, next) {
  /** @type {string} */
  let message

  if (error instanceof Error) {
    message = error.message
    logger.error(error.message)
  } else {
    message = "unknown error occured"
    logger.error(error)
  }

  res.status(status.INTERNAL_SERVER_ERROR).json({ error: message })
}
