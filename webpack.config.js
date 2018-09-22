const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

// Clean configurations
const clean_paths = ["dist"];

const clean_options = {
    watch: true
};

module.exports = {
    entry: "./src/index.js",
    resolve: {
        extensions: [".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    target: "node",
    mode: "production",
    plugins: [new CleanWebpackPlugin(clean_paths, clean_options)]
};
