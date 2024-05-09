import { UserRegisterDTO } from "./user.dto.mjs"
import { UserRepository } from "./user.repository.mjs"

export const UserService = {
  /**
   * @param {UserRegisterDTO} userRegisterDTO
   */
  async registerUser(userRegisterDTO) {
    const userInsert = await userRegisterDTO.toUserInsert()
    await UserRepository.create(userInsert)
  },
}
