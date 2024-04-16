import { LoginPage } from "#src/views/pages/LoginPage.mjs"
import { LoginFormDTO } from "./authDTO.mjs"

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
    try {
      const form = new LoginFormDTO(req.body)
      res.json({ email: form.email, passwword: form.password })
    } catch (err) {
      res.status(422).json(err)
    }
  },
}
