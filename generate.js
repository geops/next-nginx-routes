#!/usr/bin/env node
"use strict";

const { cwd } = require("process");
const { readFileSync, writeFileSync } = require("fs");

const routesManifest = "./.next/routes-manifest.json";
const manifest = JSON.parse(readFileSync(routesManifest, "utf8"));

// Create lookup table for lists of routes by number of parameters.
// This will allow ordering routes with descending number of parameters,
// so Nginx will try the longer routes first.
const routesByKeyLength = {};

manifest.dynamicRoutes.concat(manifest.staticRoutes).forEach((route) => {
  let keyLength = Object.keys(route.routeKeys).length;

  if (route.page === "/") {
    // Put root page at the top.
    keyLength = 9999;
    route.page = "/index";
  }

  routesByKeyLength[keyLength] = routesByKeyLength[keyLength] || [];
  routesByKeyLength[keyLength].push(`
location ~ ${route.regex} {
    try_files ${route.page}.html /index.html;
}`);
});

const sortedRoutes = Object.keys(routesByKeyLength)
  .sort((a, b) => a - b)
  .reverse()
  .map((keyLength) => routesByKeyLength[keyLength])
  .flat();

writeFileSync("./next-routes.conf", sortedRoutes.join("\n"));

console.log(`Nginx routes configuration written to ${cwd()}/next-routes.conf`);
