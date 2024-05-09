import { UserRepository } from "@/modules/user/user.repository"
import { Hash } from "@/lib/utils/hash"
import { AuthError } from "@/lib/errors"
import { JWTFactory, SessionToken } from "@/lib/utils/jwt"
import { UserDTO } from "@/modules/user/user.dto"
import { LoginDTO } from "./auth.dto"

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

    const isValid = await Hash.verify(user.password, loginDTO.password)
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
