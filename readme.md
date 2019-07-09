# Configure webpack plugin
## Install via npm
```
npm i -D @ahrakio/witty-webpack-declaration-files
```

## Typscript - tsconfig.json
```
{ ...
    declaration: true,
    ...
}
```

## Webpack.config.js
```
const DeclarationFilesPlugin = require("@ahrakio/witty-webpack-declaration-files");
...
module.exports = {
    ...
    plugins: [
        ...
        new DeclarationFilesPlugin({
            // options goes here
             merge:true,
            exclude:["server","*Routes"],
            flatten:true
        })
    ]
}
```

### Note
The options are -

merge: boolean (default: false) - Would you like to merge the declaration files to one file.

include: string[] (default: []) - Name of the files which you would like to be included in the final bundle (Without filename extensions, for MyClass.ts you should mension "MyClass").

exclude: string[] (default: []) - Name of the files which you would like to be excluded from the final bundle. Add *PartialFileName or PartialFileName* to support dynamic filenames to exclude

flatten: boolean (default: false) - If you would like to put all the declaration files in the root path of your dist folder.

Ofcourse, if you leave merge as false, the plugin will generate only the files in the include array, or all the files which are not in the exclude array, according to your configuration - but will not merge them to one file.
