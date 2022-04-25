/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")({});
// module.exports = removeImports({});
module.exports = removeImports({
  reactStrictMode: true,
  images: {
    domains: ["www.e3officefurniture.ca", "a.allegroimg.com"],
  },
});
