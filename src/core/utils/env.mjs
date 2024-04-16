import process from "node:process"

/**
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
