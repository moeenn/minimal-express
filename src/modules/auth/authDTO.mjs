import { z } from "zod"

export class LoginFormDTO {
  #schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  /**
   *
   * @param {unknown} data
   */
  constructor(data) {
    const v = this.#schema.parse(data)
    this.email = v.email
    this.password = v.password
  }
}
