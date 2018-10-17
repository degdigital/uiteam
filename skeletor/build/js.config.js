module.exports = {
    name: "js",
    plugins: [
        {
            "name": "@deg-skeletor/plugin-rollup",
            "config": {
                bundles: require('../js-common.js').bundles("dist/js/"),
                rollupPlugins: require('../js-common.js').rollupPlugins
            }
        }
    ]
};