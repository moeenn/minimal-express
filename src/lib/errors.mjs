import { Http } from "@status/codes"

export class APIError {
  /** @type {number} */
  status

  /** @type {string} */
  message

  /** @type {any} */
  details

  /**
   * @param {number} status
   * @param {string} message
   * @param {Record<string, unknown> | undefined} details
   */
  constructor(status, message, details = undefined) {
    this.status = status
    this.message = message
    this.details = details
  }
}

export class ValidationError extends APIError {
  /**
   * @param {any} details
   */
  constructor(details) {
    super(Http.UnprocessableEntity, "invalid request data provided", details)
  }
}

export class AuthError extends APIError {
  /** @param {string | undefined} [message] */
  constructor(message = undefined) {
    super(
      Http.Unauthorized,
      message ?? "you don't have permission to access this resource",
    )
  }
}

export class OperationError extends APIError {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(Http.BadRequest, message)
  }
}
