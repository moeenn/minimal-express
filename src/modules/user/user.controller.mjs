import { okResponse } from "#src/lib/utils/response.mjs"
import { runAsync } from "#src/lib/utils/runAsync.mjs"
import { UserRegisterDTO } from "./user.dto.mjs"
import { UserService } from "./user.service.mjs"

export const UserController = {
  userRegister: runAsync(async (req, res) => {
    const form = new UserRegisterDTO(req.body)
    await UserService.registerUser(form)
    return res.json(okResponse("account created successfully"))
  }),
}
