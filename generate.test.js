"use strict";

const { execSync } = require("child_process");
const { readFileSync } = require("fs");

test("generate routes for example project", () => {
  execSync("cd example && npm run build");
  expect(readFileSync("./example/next-routes.conf", "utf8")).toMatchSnapshot();
});

test("generate routes for example project with custom basePath", () => {
  execSync("cd example && export BASE_PATH=/baz && npm run build");
  expect(readFileSync("./example/next-routes.conf", "utf8")).toMatchSnapshot();
});

test("generate routes for example project with trailingSlash enabled", () => {
  execSync("cd example && export TRAILING_SLASH=true && npm run build");
  expect(readFileSync("./example/next-routes.conf", "utf8")).toMatchSnapshot();
});
