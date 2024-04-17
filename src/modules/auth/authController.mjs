import { recover } from "#src/core/utils/recover.mjs"
import status from "http-status"
import { LoginPage } from "./views/pages/LoginPage.mjs"
import { UserRegistrationPage } from "./views/pages/UserRegistrationPage.mjs"
import { LoginFormDTO, UserRegisterFormDTO } from "./authDTO.mjs"

export const AuthController = {
  /**
   *
   * @param {import("express").Request} _req
   * @param {import("express").Response} res
   */
  loginPage(_req, res) {
    return res.send(LoginPage({}))
  },

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  processLoginSubmission(req, res) {
    const form = recover(() => new LoginFormDTO(req.body))
    if (form.error) {
      return res.status(status.UNPROCESSABLE_ENTITY).json({ error: form.error })
    }

    res.json({ email: form.ok.email, passwword: form.ok.password })
  },

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  userRegisterPage(req, res) {
    return res.send(UserRegistrationPage({}))
  },

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  processUserRegisterSubmission(req, res) {
    const form = recover(() => new UserRegisterFormDTO(req.body))
    if (form.error) {
      return res.status(status.UNPROCESSABLE_ENTITY).json({ error: form.error })
    }

    res.json({
      email: form.ok.email,
      password: form.ok.password,
      confirmPassword: form.ok.confirmPassword,
    })
  },
}
