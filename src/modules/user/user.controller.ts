import { okResponse } from "@/lib/utils/response"
import { runAsync } from "@/lib/utils/runAsync"
import { UserRegisterDTO } from "./user.dto"
import { UserService } from "./user.service"

export const UserController = {
  userRegister: runAsync(async (req, res) => {
    const form = new UserRegisterDTO(req.body)
    await UserService.registerUser(form)
    return res.json(okResponse("account created successfully"))
  }),
}
