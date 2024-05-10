import { z } from "zod"
import { config } from "@/config"
import { validate } from "@/lib/shared/validation"

export class LoginDTO {
  email: string
  password: string

  #schema = z.object({
    email: z.string().email(),
    password: z.string().min(config.auth.password.minLength),
  })

  constructor(data: unknown) {
    const v = validate(data, this.#schema)
    this.email = v.email
    this.password = v.password
  }
}
