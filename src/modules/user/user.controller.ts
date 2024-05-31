import { okResponse } from "@/lib/shared/response"
import { runAsync } from "@/lib/server"
import { UserRegisterDTO, UserToggleActiveDTO } from "./user.dto"
import { UserService } from "./user.service"
import { PaginatedDTO } from "@/lib/shared/pagination"

export const UserController = {
  userRegister: runAsync(async (req, res) => {
    const form = new UserRegisterDTO(req.body)
    await UserService.registerUser(form)
    return res.json(okResponse("Account created successfully"))
  }),

  listAllUsers: runAsync(async (req, res) => {
    const query = new PaginatedDTO(req.query)
    const users = await UserService.listUsers(query)
    return res.json(okResponse(null, users))
  }),

  userToggleActive: runAsync(async (req, res) => {
    const form = new UserToggleActiveDTO(req.body)
    const updatedUser = await UserService.toggleActive(form)
    return res.json(okResponse("User updated successfully", updatedUser))
  }),
}
