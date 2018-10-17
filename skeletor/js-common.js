const path = require('path');

module.exports = {
    bundles: function (destPath) {
        return [
            {
                entry: 'source/js/main.js',
                output: [
                    {
                        file: path.resolve(destPath, 'main-bundle.js'),
                        format: 'es'
                    },
                    {
                        file: path.resolve(destPath, 'main-bundle-nomodule.js'),
                        format: 'system'
                    }
                ]
            }
        ];
    },
    rollupPlugins: [
        {
            module: require('rollup-plugin-replace'),
            pluginConfig: {
                ENVIRONMENT: JSON.stringify(process.env.NODE_ENV || 'development'),
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        },
        {
            module: require('rollup-plugin-babel'),
            pluginConfig: {
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }
        },
        {
            module: require('rollup-plugin-node-resolve'),
            pluginConfig: {
                browser: true
            }
        },
        {
            module: require('rollup-plugin-commonjs'),
            pluginConfig: {
                include: 'node_modules/**',
                namedExports: {
                    'node_modules/react/index.js': ['Component', 'PureComponent', 'Fragment', 'Children', 'createElement'],
                    'node_modules/react-dom/index.js': ['render'],
                    'node_modules/redux-logger/dist/redux-logger.js': ['createLogger']
                }
            }
        }
    ]
};