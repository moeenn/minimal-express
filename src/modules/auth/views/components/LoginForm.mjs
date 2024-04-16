import html from "noop-tag"

/**
 * @typedef Props
 * @property {string} [email]
 * @property {string} [password]
 *
 * @param {Props} props
 */
export function LoginForm(props) {
  return html`
    <form class="flex flex-col space-y-4" method="POST">
      <fieldset class="flex flex-col space-y-1">
        <label for="email" class="text-xs">Email</label>
        <input
          type="email"
          name="email"
          class="px-3 py-2 text-xs border border-gray-300 rounded w-full"
          value="${props.email ?? ""}"
          required
        />
      </fieldset>

      <fieldset class="flex flex-col space-y-1">
        <label for="password" class="text-xs">Password</label>
        <input
          type="password"
          name="password"
          class="px-3 py-2 text-xs border border-gray-300 rounded w-full"
          value="${props.password ?? ""}"
          rquired
          minlength="8"
        />
      </fieldset>

      <fieldset>
        <input
          type="submit"
          value="Login"
          class="px-4 py-2 bg-blue-600 hover:bg-opacity-90 text-white text-xs rounded"
        />
      </fieldset>
    </form>
  `
}
