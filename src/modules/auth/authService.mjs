import { UserRepository } from "#src/modules/user/userRepository.mjs"
import { Hash } from "#src/core/utils/hash.mjs"

export const AuthService = {
  /**
   *
   * @param {string} email
   * @param {string} clearTextPassword
   * @returns {Promise<import("#src/modules/user/user.js").User>}
   */
  async attemptLogin(email, clearTextPassword) {
    const err = new Error("Invalid email or password")

    const user = await UserRepository.findByEmail(email)
    if (!user) {
      throw err
    }

    const isValid = await Hash.verify(user.password, clearTextPassword)
    if (!isValid) {
      throw err 
    }

    return user
  },
}
