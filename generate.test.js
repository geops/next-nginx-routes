"use strict";

const { execSync } = require("child_process");
const { readFileSync } = require("fs");

test("generate routes for example project", () => {
  execSync("cd example && npm run build");
  expect(readFileSync("./example/next-routes.conf", "utf8")).toMatchSnapshot();
});

test("generate custom routes for example project", () => {
  execSync("cd example && export BASE_PATH=/next && npm run export");
  expect(readFileSync("./example/next-routes.conf", "utf8")).toMatchSnapshot();
});
