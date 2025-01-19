const fs = require('fs');

module.exports = (ctx) => ({
    plugins: [
        ctx.file.basename === 'bulma.css' &&
            require('postcss-modules')({
                getJSON: function (_cssFileName, json, _outputFileName) {
                    fs.writeFileSync('./src/bulmaClassnames.js', 'export default ' + JSON.stringify(json), { encoding: 'utf8' });
                }
            }),
        require('cssnano')({
            preset: 'default'
        })
    ]
});
