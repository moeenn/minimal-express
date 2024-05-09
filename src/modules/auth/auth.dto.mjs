import { z } from "zod"
import { config } from "#src/config.mjs"
import { ValidationError } from "#src/lib/errors.mjs"

export class LoginDTO {
  #schema = z.object({
    email: z.string().email(),
    password: z.string().min(config.auth.password.minLength),
  })

  /**
   * @param {unknown} data
   */
  constructor(data) {
    const v = this.#schema.safeParse(data)
    if (!v.success) {
      throw new ValidationError(v.error)
    }

    this.email = v.data.email
    this.password = v.data.password
  }
}
