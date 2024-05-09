import { Http } from "@status/codes"

export class APIError {
  status: number
  message: string
  details: any

  constructor(
    status: number,
    message: string,
    details: Record<string, unknown> | undefined = undefined,
  ) {
    this.status = status
    this.message = message
    this.details = details
  }
}

export class ValidationError extends APIError {
  constructor(details: any) {
    super(Http.UnprocessableEntity, "invalid request data provided", details)
  }
}

export class AuthError extends APIError {
  constructor(message: string | undefined = undefined) {
    super(
      Http.Unauthorized,
      message ?? "you don't have permission to access this resource",
    )
  }
}

export class OperationError extends APIError {
  constructor(message: string) {
    super(Http.BadRequest, message)
  }
}
