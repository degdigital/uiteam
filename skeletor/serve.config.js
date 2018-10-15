module.exports = {
	name: "express",
	plugins: [
		{
			"name": "@deg-skeletor/plugin-express",
			"config": {
			    "port": 3001,
			    "currentDirectory": __dirname,
			    "entryPoints": [
			        {
			            "entry": '../dist',
			            "route": ''
			        }
			    ],
			    "middleware": []
			}
		}
	]
};