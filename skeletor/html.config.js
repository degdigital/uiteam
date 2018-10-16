module.exports = {
    name: "html",
    plugins: [
        {
            "name": "@deg-skeletor/plugin-copy",
            "config": {
                directories: [{
                    src: 'source/html',
                    dest: 'dist'
                }]
            }
        }
    ]
};