import { UserRegisterDTO } from "./user.dto"
import { UserRepository } from "./user.repository"

export const UserService = {
  async registerUser(userRegisterDTO: UserRegisterDTO) {
    const userInsert = await userRegisterDTO.toUserInsert()
    await UserRepository.create(userInsert)
  },
}
