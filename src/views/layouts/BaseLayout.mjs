import html from "noop-tag"

/**
 * @typedef Props
 * @property {string} title
 * @property {string} children
 *
 * @param {Props} props
 */
export function BaseLayout(props) {
  return html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="./css/styles.output.css" rel="stylesheet" />
        <title>${props.title}</title>
      </head>
      <body>
        ${props.children}
      </body>
    </html>
  `
}
