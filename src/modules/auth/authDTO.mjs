import { z } from "zod"
import { config } from "#src/config.mjs"

export class LoginFormDTO {
  #schema = z.object({
    email: z.string().email(),
    password: z.string().min(config.auth.password.minLength),
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

export class UserRegisterFormDTO {
  #schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(config.auth.password.minLength),
      confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "Password confirmation failed",
        })
      }
    })

  /**
   *
   * @param {unknown} data
   */
  constructor(data) {
    const v = this.#schema.parse(data)
    this.email = v.email
    this.password = v.password
    this.confirmPassword = v.confirmPassword
  }
}
