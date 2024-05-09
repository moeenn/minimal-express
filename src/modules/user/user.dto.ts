import { z } from "zod"
import { config } from "@/config"
import { ValidationError } from "@/lib/errors"
import { Hash } from "@/lib/utils/hash"
import { User, UserInsert, UserRole } from "./user"

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
    const v = this.#schema.safeParse(data)
    if (!v.success) {
      throw new ValidationError(v.error)
    }

    this.email = v.data.email
    this.password = v.data.password
    this.confirmPassword = v.data.confirmPassword
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
