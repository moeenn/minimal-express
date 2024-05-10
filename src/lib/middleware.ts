import { Request, Response, NextFunction } from "express"
import { logger } from "./logger"
import { Http } from "@status/codes"
import { APIError } from "./errors"
import { errorResponse } from "./shared/response"

/**
 * Handle unhandled errors globally
 */
export function globalErrorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let message: string
  let status: number = Http.InternalServerError
  let details: Record<string, unknown> | undefined = undefined

  // TODO: handle database errors

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

// TODO: implement isLoggedIn
// TODO: implemnet hasRole
