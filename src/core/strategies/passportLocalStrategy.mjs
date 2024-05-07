import { Strategy } from "passport-local"
import { AuthService } from "#src/modules/auth/authService.mjs"

export const passportLocalStategy = new Strategy(
  (email, password, done) => {
    AuthService.attemptLogin(email, password)
      .then((user) => done(null, user))
      .catch(err => done(err))
  }
)

