let fs = require("fs");
let path = require("path");

function DeclarationFilesPlugin(options) {
    this.options = {
        merge: false,
        include: [],
        exclude: [],
        filename: "index.d.ts",
        path: "",
        flatten: false
    };

    Object.assign(this.options, options);
}

DeclarationFilesPlugin.prototype.apply = function(compiler) {
    compiler.plugin("compilation", (compilation) => {
        if (this.options.path === "") {
            this.options.path = path.resolve(compilation.options.output.path, compilation.options.output.filename, "..");
        } else {
        }
    });

    compiler.plugin("emit", (compilation, callback) => {
        const dtsRegex = /.d.ts$/;
        let assets = Object.keys(compilation.assets).filter((key) => dtsRegex.test(key));

        let included = [];
        let excluded = [];

        if (this.options.include.length > 0) {
            included = assets.filter((key) => this.options.include.indexOf(path.basename(key).split(".d.ts")[0]) !== -1);
            excluded = assets.filter((key) => this.options.include.indexOf(path.basename(key).split(".d.ts")[0]) === -1);
        } else if (this.options.exclude.length > 0) {
            included = assets.filter((key) => this.options.exclude.indexOf(path.basename(key).split(".d.ts")[0]) === -1);
            excluded = assets.filter((key) => this.options.exclude.indexOf(path.basename(key).split(".d.ts")[0]) !== -1);
        } else {
            included = assets;
            excluded = [];
        }

        if (this.options.merge) {
            let index = included
                .map((filename) =>
                    compilation.assets[filename]
                        .source()
                        .split("\n")
                        .filter((line) => line.trim().indexOf("import") !== 0 && line.trim().indexOf("export {") !== 0)
                        .join("\n")
                )
                .reduce((a, b) => a + "\n" + b, "");

            assets.forEach((value, index) => {
                delete compilation.assets[value];
            });

            compilation.assets[this.options.filename] = {
                source: () => index,
                size: () => index.length
            };
        } else {
            excluded.forEach((value, index) => {
                delete compilation.assets[value];
            });
        }

        if (this.options.flatten && !this.options.merge) {
            included.forEach((value, index) => {
                compilation.assets[path.basename(value)] = compilation.assets[value];
                delete compilation.assets[value];
            });
        }

        callback();
    });
};

module.exports = DeclarationFilesPlugin;
