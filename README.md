# maybeitworks

## Development

Install the dependencies once:

```bash
npm install
```

Build the static site into `_site`:

```bash
npm run build
```

Start Eleventy's development server with automatic rebuilding:

```bash
npm start
```

The shared navigation is stored in `src/_includes/navigation.html`. Pages include
it with `{% include "navigation.html" %}`; Eleventy renders the shared template
into the final static HTML files and sets the active navigation state from the
current page filename.