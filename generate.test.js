"use strict";

const { execSync } = require("child_process");
const { readFileSync } = require("fs");

test("generate routes for example project", () => {
  execSync("cd example && npm run build");
  expect(readFileSync("./example/next-routes.conf", "utf8")).toMatchSnapshot();
});
