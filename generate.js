#!/usr/bin/env node
"use strict";

const { cwd } = require("process");
const { readFileSync, writeFileSync } = require("fs");

const routesManifest = "./.next/routes-manifest.json";
const manifest = JSON.parse(readFileSync(routesManifest, "utf8"));
const { basePath, dynamicRoutes, staticRoutes } = manifest;

const routes = staticRoutes.concat(dynamicRoutes).map((route) => {
  let { page, regex } = route;

  if (route.page === "/") {
    page = "/index";
    regex = basePath ? `^${basePath}${regex.slice(2)}` : regex;
  } else {
    regex = `^${basePath || ""}${regex.slice(1)}`;
  }

  return `
location ~ ${regex} {
    try_files ${page}.html /index.html;
}`;
});

writeFileSync("./next-routes.conf", routes.join("\n"));

console.log(`Nginx routes configuration written to ${cwd()}/next-routes.conf`);
