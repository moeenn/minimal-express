/**
 * @param {string} message
 * @param {number} status
 * @param {Record<string, unknown> | undefined} [details]
 */
export function errorResponse(message, status, details = undefined) {
  return { success: false, status, message, details }
}

/**
 * @param {string} message
 * @param {unknown} [details]
 */
export function okResponse(message, details) {
  return { success: true, message, details }
}
