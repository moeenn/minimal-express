import { Router } from "express"
import { runAsync } from "#src/core/utils/runAsync.mjs"
import { AuthController } from "./authController.mjs"
import passport from "passport"
import { passportLocalStategy } from "#src/core/strategies/passportLocalStrategy.mjs"

passport.use(passportLocalStategy)

export const authRouter = Router()
authRouter.get("/login", AuthController.loginPage)

authRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  }),
)

// authRouter.post("/login", runAsync(AuthController.processLogin))
authRouter.get("/register", AuthController.userRegisterPage)
authRouter.post("/register", runAsync(AuthController.processUserRegister))
