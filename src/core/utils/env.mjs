import process from "node:process"

/**
 * read environment variables, throw error if variable is not set
 *
 * @param {string} key
 * @returns {string}
 */
export function env(key) {
  const value = process.env[key]
  if (!value) {
    throw new Error(`env variable not set: ${key}`)
  }

  return value.trim()
}
