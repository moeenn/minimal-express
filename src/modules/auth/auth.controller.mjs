import { LoginDTO } from "./auth.dto.mjs"
import { AuthService } from "./auth.service.mjs"
import { runAsync } from "#src/lib/utils/runAsync.mjs"
import { okResponse } from "#src/lib/utils/response.mjs"

export const AuthController = {
  login: runAsync(async (req, res) => {
    const form = new LoginDTO(req.body)
    const result = await AuthService.attemptLogin(form)
    return res.json(okResponse("login successful", result))
  }),
}
