import { config } from "@/config"
import { z } from "zod"
import { validate } from "./validation"

// TODO: add total page count
export type Paginated<T> = {
  page: number
  records: T[]
}

export function makePaginated<T>(page: number, records: T[]): Paginated<T> {
  return { page, records }
}

export class PaginatedDTO {
  page: number
  perPage: number

  #schema = z.object({
    page: z.coerce.number().min(1).optional(),
    perPage: z.coerce.number().min(1).optional(),
  })

  constructor(data: unknown) {
    const v = validate(data, this.#schema)
    this.page = v.page ?? 1
    this.perPage = v.perPage ?? config.general.resultsPerPage
  }

  getOffset(): number {
    return this.perPage * (this.page - 1)
  }
}
