export function errorResponse(
  message: string,
  status: number,
  details: Record<string, unknown> | undefined = undefined,
) {
  return { success: false, status, message, details }
}

export function okResponse(
  message: string,
  data: unknown | undefined = undefined,
) {
  return { success: true, message, data }
}
