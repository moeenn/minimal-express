import { Router } from "express"
import { UserController } from "./user.controller"

export const userRouter = Router()
userRouter.post("/register", UserController.userRegister)
userRouter.get("/", UserController.listAllUsers)
userRouter.post("/toggle-active", UserController.userToggleActive)
