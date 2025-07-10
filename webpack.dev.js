const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
      proxy: {
    '/v1': {
      target: 'https://story-api.dicoding.dev',
      changeOrigin: true,
      secure: true
    }
  },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    watchFiles: ["src/**/*"],
  },
});
