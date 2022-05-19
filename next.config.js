/** @type {import('next').NextConfig} */

const removeImports = require("next-remove-imports")({});
// module.exports = removeImports({});
module.exports = removeImports({
  reactStrictMode: true,
  publicRuntimeConfig: {
    IBB_UPLOAD_URL: `https://api.imgbb.com/1/upload?expiration=0&key=${process.env.IBB_API_KEY}`,
  },
  images: {
    domains: ["www.e3officefurniture.ca", "a.allegroimg.com"],
  },
});
