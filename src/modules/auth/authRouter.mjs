import { Router } from "express"
import { runAsync } from "#src/core/utils/runAsync.mjs"
import { AuthController } from "./authController.mjs"

export const authRouter = Router()
authRouter.get("/login", AuthController.loginPage)
authRouter.post("/login", runAsync(AuthController.processLogin))
authRouter.get("/register", AuthController.userRegisterPage)
authRouter.post("/register", runAsync(AuthController.processUserRegister))
