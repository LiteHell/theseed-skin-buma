const fs = require('fs');

module.exports = {
    plugins: [
        require("postcss-modules")({
            getJSON: function(_cssFileName, json, _outputFileName) {
                fs.writeFileSync('./src/bulmaClassnames.js', 'module.exports = ' + JSON.stringify(json), { encoding: 'utf8' });
            }
        }),
        require('cssnano')({
            preset: 'default'
        })
    ]
}