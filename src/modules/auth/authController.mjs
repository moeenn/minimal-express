import { recover, recoverAsync } from "#src/core/utils/recover.mjs"
import status from "http-status"
import { LoginPage } from "./views/pages/LoginPage.mjs"
import { UserRegistrationPage } from "./views/pages/UserRegistrationPage.mjs"
import { LoginFormDTO, UserRegisterFormDTO } from "./authDTO.mjs"
import { AuthService } from "./authService.mjs"
import { UserRepository } from "../user/userRepository.mjs"
import { User } from "../user/user.mjs"
import { Hash } from "#src/core/utils/hash.mjs"

export const AuthController = {
  /**
   *
   * @param {import("express").Request} _req
   * @param {import("express").Response} res
   */
  loginPage(_req, res) {
    res.send(LoginPage({}))
    return
  },

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async processLogin(req, res) {
    const form = recover(() => new LoginFormDTO(req.body))
    if (form.error) {
      res.status(status.UNPROCESSABLE_ENTITY).json({ error: form.error })
      return
    }

    const result = await recoverAsync(() =>
      AuthService.attemptLogin(form.ok.email, form.ok.password),
    )
    if (result.error) {
      res.status(status.UNAUTHORIZED).json({ error: result.error.message })
      return
    }

    // TODO: set auth cookie

    res.json({ isValid: true })
  },

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  userRegisterPage(req, res) {
    res.send(UserRegistrationPage({}))
    return
  },

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async processUserRegister(req, res) {
    const form = recover(() => new UserRegisterFormDTO(req.body))
    if (form.error) {
      res.status(status.UNPROCESSABLE_ENTITY).json({ error: form.error })
      return
    }

    const user = new User({
      user_id: crypto.randomUUID(),
      email: form.ok.email,
      password: await Hash.hash(form.ok.password),
      role: "USER",
      is_active: true,
      created_at: "2020-01-01T00:00:00Z",
    })

    const result = await recoverAsync(() => UserRepository.createUser(user))
    if (result.error) {
      res.status(status.UNPROCESSABLE_ENTITY).json({ error: result.error })
      return
    }

    res.json({ user })
  },
}
