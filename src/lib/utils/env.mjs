import process from "node:process"

/**
 * read environment variables, throw error if variable is not set
 *
 * @param {string} key
 * @param {string} [fallback]
 * @returns {string}
 */
export function env(key, fallback = undefined) {
  const value = process.env[key]
  if (!value && !!fallback) {
    return fallback
  }

  if (!value) {
    throw new Error(`env variable not set: ${key}`)
  }

  return value.trim()
}
