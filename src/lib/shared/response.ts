export function errorResponse(
  message: string,
  status: number,
  details: Record<string, unknown> | undefined = undefined,
) {
  return { success: false, status, message, details }
}

export function okResponse(
  message: string | null,
  data: unknown | undefined = undefined,
) {
  if (!message) {
    return { success: true, data }
  }
  return { success: true, message, data }
}
