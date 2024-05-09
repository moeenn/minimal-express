import { sql } from "@/lib/database"
import { User, UserInsert } from "./user"

export const UserRepository = {
  async all(): Promise<User[]> {
    const result: User[] = await sql`
    select * from users
    where deleted_at is null
    `

    return result
  },

  async findById(id: string): Promise<User | undefined> {
    const result: User[] = await sql`
    select * from users 
    where user_id = ${id}
    and deleted_at is null
    limit 1
    `

    return result[0]
  },

  async findByEmail(email: string): Promise<User | undefined> {
    const result: User[] = await sql`
    select * from users 
    where email = ${email}
    and deleted_at is null
    limit 1
    `

    return result[0]
  },

  async create(user: UserInsert): Promise<User> {
    const result: User[] = await sql`
    insert into users (user_id, email, password, role, is_active)
    values (${user.user_id}, ${user.email}, ${user.password}, ${user.role}, ${user.is_active})
    returning *
    `

    return result[0]
  },

  async update(user: User): Promise<User> {
    const result: User[] = await sql`
    update users 
    set 
      email = ${user.email},
      password = ${user.password},
      role = ${user.role},
      is_active = ${user.is_active}
    where user_id = ${user.user_id}
    and deleted_at is null
    returning *
    `

    return result[0]
  },

  async remove(user: User): Promise<void> {
    await sql`
    update users
    set deleted_at = now()
    where user_id = ${user.user_id}
    and deleted_at is null
    `
  },
}
