import { runAsync, okResponse } from "@/lib/server"
import { UserRegisterDTO, UserToggleActiveDTO } from "./user.dto"
import { UserService } from "./user.service"
import { PaginatedDTO } from "@/lib/shared/pagination"
import { Http } from "@status/codes"

export const UserController = {
  userRegister: runAsync(async (req, res) => {
    const form = new UserRegisterDTO(req.body)
    await UserService.registerUser(form)
    return res.json(okResponse("Account created successfully"))
  }),

  listAllUsers: runAsync(async (req, res) => {
    const query = new PaginatedDTO(req.query)
    const users = await UserService.listUsers(query)
    return res.json(okResponse(null, Http.Ok, users))
  }),

  userToggleActive: runAsync(async (req, res) => {
    const form = new UserToggleActiveDTO(req.body)
    const updatedUser = await UserService.toggleActive(form)
    return res.json(
      okResponse("User updated successfully", Http.Ok, updatedUser),
    )
  }),
}
