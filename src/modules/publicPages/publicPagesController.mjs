import { HomePage } from "#src/views/pages/HomePage.mjs"

export const PublicPagesController = {
  /**
   *
   * @param {import("express").Request} _req
   * @param {import("express").Response} res
   */
  homePage(_req, res) {
    const html = HomePage({ name: "Admin" })
    return res.send(html)
  },
}
