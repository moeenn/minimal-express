/**
 * @typedef {import("express").Request} Request
 * @typedef {import("express").Response} Response
 * @typedef {import("express").NextFunction} NextFunction
 *
 * @param {(req: Request, res: Response, next: NextFunction) => Promise<any>} callback
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */
export function runAsync(callback) {
  return (req, res, next) => {
    Promise.resolve(callback(req, res, next)).catch(next)
  }
}
