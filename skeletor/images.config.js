module.exports = {
    name: "images",
    plugins: [
        {
            "name": "@deg-skeletor/plugin-copy",
            "config": {
                directories: [{
                    src: 'source/images',
                    dest: 'dist/images'
                }]
            }
        }
    ]
};