#!/usr/bin/env node
"use strict";

const { cwd } = require("process");
const { readFileSync, writeFileSync } = require("fs");

const routesManifest = "./.next/routes-manifest.json";
const manifest = JSON.parse(readFileSync(routesManifest, "utf8"));

const routes = manifest.staticRoutes
  .concat(manifest.dynamicRoutes)
  .map((route) => {
    const basePath = manifest.basePath || "";

    let page = route.page;
    let regex = route.regex;

    if (route.page === "/") {
      page = "/index";
    }

    if (basePath) {
      regex =
        route.regex.slice(0, 1) +
        basePath +
        route.regex.slice(route.page === "/" ? 2 : 1);
    }

    return `
location ~ ${regex} {
    try_files ${page}.html /index.html;
}`;
  });

writeFileSync("./next-routes.conf", routes.join("\n"));

console.log(`Nginx routes configuration written to ${cwd()}/next-routes.conf`);
