# next-nginx-routes

Generate Nginx routes configuration file for Next.js static HMTL export.

This [NPM package](https://www.npmjs.com/package/next-nginx-routes) allows you to convert Next.js routes like:

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

## Getting started

### Installation

```shell
yarn add --dev next-nginx-routes
```

### Generate Nginx configuration file

Add next-nginx-routes to your export script:

```json
{
  "export": "next build && next export && next-nginx-routes"
}
```

And run Next.js export:

```shell
yarn run export
```

### Include Nginx configuration file

Finally include the generated configuration file `next-routes.conf` and the Next.js output in your Nginx site configuration file.

## Requirements

- [Next.js](https://nextjs.org) 12 or higher
- [Node.js](https://nodejs.org) 14 or higher

## More

- See [`example`](https://github.com/geops/next-nginx-routes/tree/main/example) folder for a minimal Docker example.
- Read more about this approach in our [blog post](https://geops.ch/en/blog/next-nginx-routes).
