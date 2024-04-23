import { z } from "zod"
import { config } from "#src/config.mjs"

export class User {
  #schema = z.object({
    user_id: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(config.auth.password.minLength),
    role: z.enum(["ADMIN", "USER"]),
    is_active: z.boolean(),
    created_at: z.date(),
    deleted_at: z.string().datetime().nullable(),
  })

  /**
   *
   * @param {unknown} data
   */
  constructor(data) {
    const v = this.#schema.parse(data)
    this.id = v.user_id
    this.email = v.email
    this.password = v.password
    this.role = v.role
    this.isActive = v.is_active
    this.createdAt = v.created_at
    this.deletedAt = v.deleted_at ? new Date(v.deleted_at) : null
  }
}
