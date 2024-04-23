import { UserRepository } from "#src/modules/user/userRepository.mjs"
import { Hash } from "#src/core/utils/hash.mjs"

export const AuthService = {
  /**
   *
   * @param {string} email
   * @param {string} clearTextPassword
   * @returns {Promise<void>}
   */
  async attemptLogin(email, clearTextPassword) {
    const user = await UserRepository.findUserByEmail(email)
    const isValid = await Hash.verify(user.password, clearTextPassword)
    if (!isValid) {
      throw new Error("Invalid email or password")
    }
  },
}
