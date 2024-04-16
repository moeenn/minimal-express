import html from "noop-tag"

/**
 * @typedef Props
 * @property {string} title
 *
 * @param {Props} props
 * @returns {(children: string) => string}
 */
export function BaseLayout(props) {
  return (children) => html`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" href="/images/favicon.svg" />
        <link href="/css/styles.output.css" rel="stylesheet" />
        <title>${props.title}</title>
      </head>
      <body>
        ${children}
      </body>
    </html>
  `
}
