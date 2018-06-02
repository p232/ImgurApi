const path = require("path");

module.exports = {
  entry: {
    app: ["react-hot-loader/patch", "./src/main.jsx"]
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react"],
              plugins: ["react-hot-loader/babel"]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  }
};
