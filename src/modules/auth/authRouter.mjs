import { Router } from "express"
import { AuthController } from "./authController.mjs"

export const authRouter = Router()
authRouter.get("/login", AuthController.loginPage)
authRouter.post("/login", AuthController.processLoginSubmission)
authRouter.get("/register", AuthController.userRegisterPage)
authRouter.post("/register", AuthController.processUserRegisterSubmission)
