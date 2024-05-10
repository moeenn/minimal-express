import jwt from "jsonwebtoken"
import { z } from "zod"
import { config } from "@/config"
import { User, UserRole } from "@/modules/user/user"

export type SessionToken = {
  accessToken: string
  refreshToken: string
  expiry: number
}

type JWTEncoded = {
  token: string
  expiry: number
}

const SESSION_REFRESH_TOKEN_SCOPE = "session.refresh"
const SESSION_ACCESS_TOKEN_SCOPE = "session.access"

class SessionRefreshToken {
  userId: string
  email: string
  role: UserRole
  scope: string

  constructor(userId: string, email: string, role: UserRole) {
    this.userId = userId
    this.email = email
    this.role = role
    this.scope = SESSION_REFRESH_TOKEN_SCOPE
  }

  encode(): JWTEncoded {
    const token = JWT.generateNonExpiringToken({
      userId: this.userId,
      email: this.email,
      role: this.role,
      scope: this.scope,
    })

    return { token, expiry: -1 }
  }

  static #validatePayload(payload: unknown): SessionRefreshToken | undefined {
    const schema = z.object({
      userId: z.string().uuid(),
      email: z.string().email(),
      role: z.enum(["admin", "user"]),
      scope: z.literal(SESSION_REFRESH_TOKEN_SCOPE),
    })

    const v = schema.safeParse(payload)
    if (!v.success) {
      return
    }

    return new SessionRefreshToken(v.data.userId, v.data.email, v.data.role)
  }

  static validate(token: string): SessionRefreshToken | undefined {
    try {
      const payload = jwt.verify(token, config.auth.jwt.secret)
      if (typeof payload == "string") return
      return SessionRefreshToken.#validatePayload(payload)
    } catch {
      return
    }
  }
}

class SessionAccessToken extends SessionRefreshToken {
  expiry: number
  scope: string

  constructor(userId: string, email: string, role: UserRole) {
    super(userId, email, role)
    this.scope = SESSION_ACCESS_TOKEN_SCOPE
    this.expiry = JWT.calculateExpiry()
  }

  enodeWithExpiry(): JWTEncoded {
    return JWT.generateExpiringToken({
      userId: this.userId,
      email: this.email,
      role: this.role,
      scope: this.scope,
    })
  }

  static #validatePayload(payload: unknown): SessionAccessToken | undefined {
    const schema = z.object({
      userId: z.string().uuid(),
      email: z.string().email(),
      role: z.enum(["admin", "user"]),
      scope: z.literal(SESSION_ACCESS_TOKEN_SCOPE),
    })

    const v = schema.safeParse(payload)
    if (!v.success) {
      return
    }

    return new SessionAccessToken(v.data.userId, v.data.email, v.data.role)
  }

  static validate(token: string): SessionAccessToken | undefined {
    try {
      const payload = jwt.verify(token, config.auth.jwt.secret)
      if (typeof payload == "string") return
      return SessionAccessToken.#validatePayload(payload)
    } catch {
      return
    }
  }
}

export class JWTFactory {
  /**
   * create access and refresh tokens for the user at successful login
   *
   */
  static generateSessionToken(user: User): SessionToken {
    const accessPayload = new SessionAccessToken(
      user.user_id,
      user.email,
      user.role,
    ).enodeWithExpiry()
    const refreshPayload = new SessionRefreshToken(
      user.user_id,
      user.email,
      user.role,
    ).encode()

    return {
      accessToken: accessPayload.token,
      expiry: accessPayload.expiry,
      refreshToken: refreshPayload.token,
    }
  }
}

export class JWT {
  /**
   * calculate expiry timestamp for the client
   *
   */
  static calculateExpiry(): number {
    return (
      Math.floor(Date.now() / 1000) + 60 * 60 * config.auth.jwt.expiresInHours
    )
  }

  static generateExpiringToken(payload: object): JWTEncoded {
    const token = jwt.sign(payload, config.auth.jwt.secret, {
      expiresIn: 60 * 60 * config.auth.jwt.expiresInHours,
      notBefore: "0",
      algorithm: config.auth.jwt.algorithm,
      issuer: config.auth.jwt.issuer,
    })

    const expiry = this.calculateExpiry()
    return { token, expiry }
  }

  static generateNonExpiringToken(payload: object): string {
    return jwt.sign(payload, config.auth.jwt.secret, {
      notBefore: "0",
      algorithm: config.auth.jwt.algorithm,
      issuer: config.auth.jwt.issuer,
    })
  }
}
