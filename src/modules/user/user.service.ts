import { NotFoundError } from "@/lib/errors"
import { UserRegisterDTO, UserToggleActiveDTO } from "./user.dto"
import { UserRepository } from "./user.repository"
import { User } from "./user"
import { makePaginated, Paginated, PaginatedDTO } from "@/lib/shared/pagination"

export const UserService = {
  async listUsers(userListDTO: PaginatedDTO): Promise<Paginated<User>> {
    const users = await UserRepository.all(userListDTO)
    return makePaginated(userListDTO.page, users)
  },

  async registerUser(userRegisterDTO: UserRegisterDTO) {
    const userInsert = await userRegisterDTO.toUserInsert()
    await UserRepository.create(userInsert)
  },

  async toggleActive(userToggleActiveDTO: UserToggleActiveDTO) {
    const user = await UserRepository.findById(userToggleActiveDTO.userId)
    if (!user) {
      throw new NotFoundError(
        `User with id '${userToggleActiveDTO.userId}' not found`,
      )
    }

    user.is_active = !user.is_active
    return await UserRepository.update(user)
  },
}
