# next-nginx-routes

Generate Nginx routes configuration file for Next.js static HMTL export.

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

Finally include the generated configuration file `next-routes.conf` and the Next.js output in your Nginx site configuration file. See `example` folder for a minimal Docker example.

## Requirements

- [Next.js](https://nextjs.org) 12 or higher
- [Node.js](https://nodejs.org) 14 or higher

## More

- TODO: blog post
