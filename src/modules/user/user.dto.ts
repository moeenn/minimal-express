import { z } from "zod"
import { config } from "@/config"
import { Hash } from "@/lib/shared/hash"
import { User, UserInsert, UserRole } from "./user"
import { validate } from "@/lib/shared/validation"

export class UserDTO {
  id: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: Date
  deletedAt?: Date

  constructor(user: User) {
    this.id = user.user_id
    this.email = user.email
    this.role = user.role
    this.isActive = user.is_active
    this.createdAt = user.created_at
    this.deletedAt = user.deleted_at
  }
}

export class UserRegisterDTO {
  email: string
  password: string
  confirmPassword: string

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

  constructor(data: unknown) {
    const v = validate(data, this.#schema)
    this.email = v.email
    this.password = v.password
    this.confirmPassword = v.confirmPassword
  }

  async toUserInsert(): Promise<UserInsert> {
    return {
      user_id: crypto.randomUUID(),
      email: this.email,
      password: await Hash.hash(this.password),
      role: "user",
      is_active: true,
    }
  }
}

export class UserToggleActiveDTO {
  userId: string
  active: boolean

  #schema = z.object({
    userId: z.string().uuid(),
    active: z.boolean(),
  })

  constructor(data: unknown) {
    const v = validate(data, this.#schema)
    this.userId = v.userId
    this.active = v.active
  }
}
