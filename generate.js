#!/usr/bin/env node
"use strict";

const { cwd } = require("process");
const { readFileSync, writeFileSync } = require("fs");

const routesManifest = "./.next/routes-manifest.json";
const manifest = JSON.parse(readFileSync(routesManifest, "utf8"));

// Load config file.
const requiredServerFiles = JSON.parse(
  readFileSync("./.next/required-server-files.json", "utf-8")
);

// Next's config (computed from next.config.js)
const nextConfig = requiredServerFiles.config;

const routes = manifest.staticRoutes
  .concat(manifest.dynamicRoutes)
  .map((route) => {
    if (route.page === "/") {
      route.page = "/index";
    } else {
      /**
      In next.config.js, if trailingSlash is true, built files will be in sub-directory.
      When trailing slash is false (by default)
        /pages/posts.tsx            => /posts.html
        /pages/posts/[id]/index.tsx => /posts/[id].html
        /pages/posts/[id]/edit.tsx  => /posts/[id]/edit.html

      When trailing slash is true.
        /pages/posts.tsx            => /posts/index.html
        /pages/posts/[id]/index.tsx => /posts/[id]/index.html
        /pages/posts/[id]/edit.tsx  => /posts/[id]/edit/index.html
      */
      if (nextConfig.trailingSlash) {
        route.page = `${route.page}/index`;
      }
    }

    return `
location ~ ${route.regex} {
    try_files ${route.page}.html /index.html;
}`;
  });

writeFileSync("./next-routes.conf", routes.join("\n"));

console.log(`Nginx routes configuration written to ${cwd()}/next-routes.conf`);
