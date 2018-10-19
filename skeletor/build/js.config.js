module.exports = {
    name: "js",
    plugins: [
        {
            "name": "@deg-skeletor/plugin-rollup",
            "config": {
                bundles: require('../js-common.js').bundles("docs/js/"),
                rollupPlugins: require('../js-common.js').rollupPlugins
            }
        }
    ]
};