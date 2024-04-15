import { Router } from "express"
import { PublicPagesController } from "./publicPagesController.mjs"

export const publicPagesRouter = Router()
publicPagesRouter.get("/", PublicPagesController.homePage)
