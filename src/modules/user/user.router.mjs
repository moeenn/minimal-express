import { Router } from "express"
import { UserController } from "./user.controller.mjs"

export const userRouter = Router()
userRouter.post("/register", UserController.userRegister)
