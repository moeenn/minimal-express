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
 * @param {unknown} [data]
 */
export function okResponse(message, data) {
  return { success: true, message, data }
}
