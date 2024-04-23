import { db } from "#src/core/database.mjs"
import { User } from "./user.mjs"

export const UserRepository = {
  /**
   *
   * @param {User} user
   * @returns {Promise<void>}
   */
  async createUser(user) {
    await db.query("CALL user_create($1, $2, $3, $4)", [
      user.id,
      user.email,
      user.password,
      user.role,
    ])
  },

  /**
   *
   * @param {User} user
   * @returns {Promise<void>}
   */
  async updateUser(user) {
    await db.query("CALL user_update($1, $2, $3, $4, $5)", [
      user.id,
      user.email,
      user.password,
      user.role,
      user.isActive,
    ])
  },

  /**
   *
   * @param {User} user
   * @returns {Promise<void>}
   */
  async deleteUser(user) {
    await db.query("CALL user_delete($1)", [user.id])
  },

  /**
   *
   * @returns {Promise<User[]>}
   */
  async listUsers() {
    const result = await db.query("SELECT * FROM user_list")
    if (result.rowCount == 0) {
      return []
    }

    return result.rows.map((r) => new User(r))
  },

  /**
   *
   * @param {string} id
   * @returns {Promise<User>}
   */
  async findUserById(id) {
    const result = await db.query("SELECT * FROM user_find_by_id($1)", [id])
    if (result.rowCount == 0) {
      throw new Error(`User with id '${id}' not found`)
    }

    return new User(result.rows[0])
  },

  /**
   *
   * @param {string} email
   * @returns {Promise<User>}
   */
  async findUserByEmail(email) {
    const result = await db.query("SELECT * from user_find_by_email($1)", [
      email,
    ])
    if (result.rowCount == 0) {
      throw new Error(`User with email '${email}' not found`)
    }

    return new User(result.rows[0])
  },
}
