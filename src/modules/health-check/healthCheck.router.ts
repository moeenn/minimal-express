import { Router } from "express"
import { healthCheckController } from "./healthCheck.controller"

export const healthCheckRouter = Router()
healthCheckRouter.get("/", healthCheckController.healthCheck)
healthCheckRouter.get("/memory", healthCheckController.memoryUsage)
