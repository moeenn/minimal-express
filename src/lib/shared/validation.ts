import { z } from "zod"
import { ValidationError } from "@/lib/errors"

export function validate<T>(data: unknown, schema: z.Schema<T>): T {
  const v = schema.safeParse(data)
  if (!v.success) {
    throw new ValidationError(v.error)
  }
  return v.data
}
