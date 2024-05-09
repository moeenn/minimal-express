import { z } from "zod"
import { config } from "@/config"
import { ValidationError } from "@/lib/errors"

export class LoginDTO {
  email: string
  password: string

  #schema = z.object({
    email: z.string().email(),
    password: z.string().min(config.auth.password.minLength),
  })

  constructor(data: unknown) {
    const v = this.#schema.safeParse(data)
    if (!v.success) {
      throw new ValidationError(v.error)
    }

    this.email = v.data.email
    this.password = v.data.password
  }
}
