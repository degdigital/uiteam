module.exports = {
	name: "css",
	plugins: [
		{
			"name": "@deg-skeletor/plugin-postcss",
			"config": {
				"files": [
					{
						"src": "source/css/main.css",
						"dest": "docs/css/main.css"
					}
				],
				"plugins": [
					require('postcss-easy-import'),
					require('postcss-custom-properties'),
					require('postcss-custom-selectors'),
					require('postcss-custom-media'),
					require('postcss-color-mod-function'),
					require('postcss-nested'),
					require('autoprefixer'),
					require('cssnano')
				]
			}
		}
	]
};