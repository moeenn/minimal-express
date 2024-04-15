import html from "noop-tag"

/**
 * @typedef Props
 * @property {string} name
 * 
 * @param {Props} props
 * @returns {string}
 */
export function HomePage(props) {
  return html`
  <div class="container mx-auto p-4">
    <h1>Hello, ${props.name}!</h1>
  </div>
  `
}
