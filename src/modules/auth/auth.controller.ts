import { Http } from "@status/codes"
import { LoginDTO } from "./auth.dto"
import { AuthService } from "./auth.service"
import { runAsync, okResponse } from "@/lib/server"

export const AuthController = {
  login: runAsync(async (req, res) => {
    const form = new LoginDTO(req.body)
    const result = await AuthService.attemptLogin(form)
    return res.json(okResponse("login successful", Http.Ok, result))
  }),
}
