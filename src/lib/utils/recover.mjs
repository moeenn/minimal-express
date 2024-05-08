/**
 * @template T
 * @typedef {{ ok: T, error: null }} ok
 */

/** @typedef {{ ok: null, error: Error }} error */

/**
 * @template T
 * @param {T} result
 * @returns {ok<T>}
 */
const ok = (result) => ({ ok: result, error: null })

/**
 * @param {Error} error
 * @returns {error}
 */
const error = (error) => ({ ok: null, error })

/**
 * @template T
 * @param {() => T} cb
 * @returns {ok<T> | error}
 */
export function recover(cb) {
  /** @var {T} */
  let result

  try {
    result = cb()
  } catch (err) {
    if (err instanceof Error) {
      return error(err)
    }
    return error(new Error("Unknown error occured"))
  }

  return ok(result)
}

/**
 * @template T
 * @param {() => Promise<T>} cb
 * @returns {Promise<ok<T> | error>}
 */
export async function recoverAsync(cb) {
  /** @var {T} */
  let result

  try {
    result = await cb()
  } catch (err) {
    if (err instanceof Error) {
      return error(err)
    }
    return error(new Error("Unknown error occured"))
  }

  return ok(result)
}
