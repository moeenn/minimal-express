import { Request, Response, NextFunction } from "express"

export function runAsync(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<any>,
): (req: Request, res: Response, next: NextFunction) => void {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next)
  }
}
