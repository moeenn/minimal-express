import { Router } from "express"
import { AuthController } from "./auth.controller.mjs"

export const authRouter = Router()
authRouter.post("/login", AuthController.login)
authRouter.post("/register", AuthController.userRegister)
