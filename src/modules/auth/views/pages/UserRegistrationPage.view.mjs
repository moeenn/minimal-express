import html from "noop-tag"
import { BaseLayout } from "#src/views/layouts/BaseLayout.view.mjs"
import { UserRegistrationForm } from "#src/modules/auth/views/components/UserRegistrationForm.view.mjs"

/**
 * @typedef Props
 * @property {string} [email]
 *
 * @param {Props} props
 * @returns {string}
 */
export function UserRegistrationPage(props) {
  return BaseLayout({ title: "Register" })(html`
    <div class="container mx-auto p-4">
      <h2 class="text-xl font-serif mb-4">Register</h2>
      ${UserRegistrationForm(props)}
    </div>
  `)
}
