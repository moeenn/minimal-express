import { logger } from "#src/lib/logger.mjs"
import { Http } from "@status/codes"
import { APIError } from "./errors.mjs"
import { errorResponse } from "./utils/response.mjs"

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

  /** @type {number} */
  let status = Http.InternalServerError

  /** @type {Record<string, unknown> | undefined} */
  let details = undefined

  if (error instanceof APIError) {
    message = error.message
    status = error.status
    details = error.details
  } else if (error instanceof Error) {
    message = error.message
    logger.error(error.message)
  } else {
    message = "unknown error occured"
    logger.error(error)
  }

  res.status(status).json(errorResponse(message, status, details))
}
