module.exports = {
  basePath: process.env.BASE_PATH || "",
  eslint: { ignoreDuringBuilds: true },
  output: "export",
  trailingSlash: process.env.TRAILING_SLASH === "true",
};
