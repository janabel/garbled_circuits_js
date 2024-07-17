const path = require("path");

module.exports = {
  entry: {
    app: "./public/index.js", // Main application entry point
    admin: "./public/elgamal.js", // Admin page entry point
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
