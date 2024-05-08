import { LoginFormDTO, UserDTO, UserRegisterFormDTO } from "./auth.dto.mjs"
import { AuthService } from "./auth.service.mjs"
import { UserRepository } from "#src/modules/user/userRepository.mjs"
import { runAsync } from "#src/lib/utils/runAsync.mjs"
import { okResponse } from "#src/lib/utils/response.mjs"

export const AuthController = {
  login: runAsync(async (req, res) => {
    const form = new LoginFormDTO(req.body)
    const user = await AuthService.attemptLogin(form.email, form.password)

    // TODO: generate auth tokens
    return res.json(okResponse("login successful", { 
      user: new UserDTO(user),
    }))
  }),

  userRegister: runAsync(async (req, res) => {
    const form = new UserRegisterFormDTO(req.body)
    const userInsert = await form.toUserInsert()
    await UserRepository.create(userInsert)
    return res.json(okResponse("account created successfully"))
  }),
}
