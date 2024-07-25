import { Request, Response } from "express"
import { HealthCheckService } from "./healthCheck.service"
import { runAsync } from "@/lib/server"

export const healthCheckController = {
  healthCheck: runAsync(async (_req, res) => {
    const result = await HealthCheckService.healthcheck()
    return res.json(result)
  }),

  // TODO: ensure only super-users can access this end-point.
  memoryUsage(_req: Request, res: Response) {
    const result = HealthCheckService.memoryUsage()
    return res.json(result)
  },
}
