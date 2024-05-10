import { LoginDTO } from "./auth.dto"
import { AuthService } from "./auth.service"
import { runAsync } from "@/lib/shared/runAsync"
import { okResponse } from "@/lib/shared/response"

export const AuthController = {
  login: runAsync(async (req, res) => {
    const form = new LoginDTO(req.body)
    const result = await AuthService.attemptLogin(form)
    return res.json(okResponse("login successful", result))
  }),
}
