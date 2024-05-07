import { sql } from "#src/core/database.mjs"

/**
 * @typedef {import("./user").User} User
 * @typedef {import("./user").UserInsert} UserInsert
 */

export const UserRepository = {
  /**
   *
   * @returns {Promise<User[]>}
   */
  async all() {
    /** @type {User[]} */
    const result = await sql`
    select * from users
    where deleted_at is null
    `

    return result
  },

  /**
   * 
   * @param {string} id
   * @returns {Promise<User | undefined>} 
   */
  async findById(id) {
    /** @type {User[]} */
    const result = await sql`
    select * from users 
    where user_id = ${id}
    and deleted_at is null
    limit 1
    `

    return result[0]
  },

  /**
   * 
   * @param {string} email
   * @returns {Promise<User | undefined>} 
   */
  async findByEmail(email) {
    /** @type {User[]} */
    const result = await sql`
    select * from users 
    where email = ${email}
    and deleted_at is null
    limit 1
    `

    return result[0]
  },

  /**
   *
   * @param {UserInsert} user
   * @returns {Promise<User>}
   */
  async create(user) {
    /** @type {User[]} */
    const result = await sql`
    insert into users (email, password, role, is_active)
    values (${user.email}, ${user.password}, ${user.role}, ${user.is_active})
    returning *
    `

    return result[0]
  },

  /**
   *
   * @param {User} user
   * @returns {Promise<User>}
   */
  async update(user) {
    /** @type {User[]} */
    const result = await sql`
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

  /**
   *
   * @param {User} user
   * @returns {Promise<void>}
   */
  async remove(user) {
    await sql`
    update users
    set deleted_at = now()
    where user_id = ${user.user_id}
    and deleted_at is null
    `
  },
}
