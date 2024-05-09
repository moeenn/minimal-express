import process from "node:process"

/**
 * read environment variables, throw error if variable is not set
 *
 */
export function env(
  key: string,
  fallback: string | undefined = undefined,
): string {
  const value = process.env[key]
  if (!value && !!fallback) {
    return fallback
  }

  if (!value) {
    throw new Error(`env variable not set: ${key}`)
  }

  return value.trim()
}
