import { z } from "zod"
import { config } from "#src/config.mjs"
import { ValidationError } from "#src/lib/errors.mjs"
import { Hash } from "#src/lib/utils/hash.mjs"

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
    const v = this.#schema.safeParse(data)
    if (!v.success) {
      throw new ValidationError(v.error)
    }

    this.email = v.data.email
    this.password = v.data.password
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
    const v = this.#schema.safeParse(data)
    if (!v.success) {
      throw new ValidationError(v.error)
    }

    this.email = v.data.email
    this.password = v.data.password
    this.confirmPassword = v.data.confirmPassword
  }

  /**
   *
   * @returns {Promise<import("#src/modules/user/user").UserInsert>}
   */
  async toUserInsert() {
    return {
      user_id: crypto.randomUUID(),
      email: this.email,
      password: await Hash.hash(this.password),
      role: "user",
      is_active: true,
    }
  }
}

export class UserDTO {
  /**
   * @param {import("#src/modules/user/user").User} user
   */
  constructor(user) {
    this.id = user.user_id
    this.email = user.email
    this.role = user.role
    this.isActive = user.is_active
    this.createdAt = user.created_at
    this.deletedAt = user.deleted_at
  }
}
