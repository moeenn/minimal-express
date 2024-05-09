import { UserRepository } from "#src/modules/user/user.repository.mjs"
import { Hash } from "#src/lib/utils/hash.mjs"
import { AuthError } from "#src/lib/errors.mjs"
import { JWTFactory } from "#src/lib/utils/jwt.mjs"
import { LoginDTO } from "./auth.dto.mjs"
import { UserDTO } from "#src/modules/user/user.dto.mjs"

export const AuthService = {
  /**
   * @typedef AttempLoginResult
   * @property {UserDTO} user
   * @property {import("#src/lib/utils/jwt.mjs").SessionToken} token
   *
   * @param {LoginDTO} loginDTO
   * @returns {Promise<AttempLoginResult>}
   */
  async attemptLogin(loginDTO) {
    const err = new AuthError("Invalid email or password")
    const user = await UserRepository.findByEmail(loginDTO.email)
    if (!user) {
      throw err
    }

    const isValid = await Hash.verify(user.password, loginDTO.password)
    if (!isValid) {
      throw err
    }

    const token = JWTFactory.generateSessionToken(user)
    return {
      user: new UserDTO(user),
      token,
    }
  },
}
