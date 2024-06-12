import { UserRepository } from "@/modules/user/user.repository"
import { AuthError } from "@/lib/errors"
import { JWTFactory, SessionToken } from "@/lib/shared/jwt"
import { UserDTO } from "@/modules/user/user.dto"
import { LoginDTO } from "./auth.dto"
import argon2 from "argon2"

type AttempLoginResult = {
  user: UserDTO
  token: SessionToken
}

export const AuthService = {
  async attemptLogin(loginDTO: LoginDTO): Promise<AttempLoginResult> {
    const err = new AuthError("Invalid email or password")
    const user = await UserRepository.findByEmail(loginDTO.email)
    if (!user) {
      throw err
    }

    const isValid = await argon2.verify(user.password, loginDTO.password)
    if (!isValid) {
      throw err
    }

    const token = JWTFactory.generateSessionToken(user)
    return {
      user: new UserDTO(user),
      token,
    }
  },
}
