#!/usr/bin/env node
"use strict";

const { cwd } = require("process");
const { readFileSync, writeFileSync } = require("fs");

const routesManifest = "./.next/routes-manifest.json";
const manifest = JSON.parse(readFileSync(routesManifest, "utf8"));

const routes = manifest.staticRoutes
  .concat(manifest.dynamicRoutes)
  .map((route) => {
    if (route.page === "/") {
      route.page = "/index";
    }
    return `
location ~ ${route.regex} {
    try_files ${route.page}.html /index.html;
}`;
  });

writeFileSync("./next-routes.conf", routes.join("\n"));

console.log(`Nginx routes configuration written to ${cwd()}/next-routes.conf`);
