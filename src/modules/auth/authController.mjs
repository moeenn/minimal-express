import { LoginPage } from "./views/pages/LoginPage.mjs"
import { LoginFormDTO } from "./authDTO.mjs"
import { recover } from "#src/core/utils/recover.mjs"

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
      return res.status(422).json({ error: form.error })
    }

    res.json({ email: form.ok.email, passwword: form.ok.password })
  },
}
