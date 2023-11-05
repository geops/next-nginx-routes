# next-nginx-routes

Generate Nginx routes configuration file for Next.js static HMTL export, also known as `output: export`.

This dependency-free [NPM package](https://www.npmjs.com/package/next-nginx-routes) provides a NPM script to convert all your Next.js routes like:

```json
{
  "page": "/[foo]",
  "regex": "^/([^/]+?)(?:/)?$",
  "routeKeys": { "foo": "foo" },
  "namedRegex": "^/(?<foo>[^/]+?)(?:/)?$"
}
```

... into Nginx routes like:

```nginx
location ~ ^/([^/]+?)(?:/)?$ {
  try_files /[foo].html /index.html;
}
```

Note: currently only Next.js pages router is fully supported.

## Getting started

### Installation

```shell
yarn add --dev next-nginx-routes
```

Make sure [`output: "export"`](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports#configuration) is configured in your `next.config.js` file.

### Generate Nginx configuration file

Add next-nginx-routes to your build script:

```json
{
  "build": "next build && next-nginx-routes"
}
```

And run Next.js export:

```shell
yarn run build
```

### Include Nginx configuration file

Finally include the generated configuration file `next-routes.conf` in your Nginx site configuration file and make the Next.js `out` directory available to Nginx.

## Requirements

- [Next.js](https://nextjs.org) 12 or higher
- [Node.js](https://nodejs.org) 18 or higher

## More

- See [`example`](https://github.com/geops/next-nginx-routes/tree/main/example) folder for a minimal Docker example.
- Read more about this approach in our [blog post](https://geops.ch/en/blog/next-nginx-routes).
