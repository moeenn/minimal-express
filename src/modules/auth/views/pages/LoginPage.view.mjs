import html from "noop-tag"
import { BaseLayout } from "#src/views/layouts/BaseLayout.view.mjs"
import { LoginForm } from "#src/modules/auth/views/components/LoginForm.view.mjs"

/**
 * @typedef Props
 * @property {string} [email]
 *
 * @param {Props} props
 * @returns {string}
 */
export function LoginPage(props) {
  return BaseLayout({ title: "Login" })(html`
    <div class="container mx-auto p-4">
      <h2 class="text-xl font-serif mb-4">Login</h2>
      ${LoginForm(props)}
    </div>
  `)
}
