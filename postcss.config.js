module.exports = (ctx) => ({
    parser: false,
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {
            autoprefixer: {
                grid: 'autoplace',
            },
            stage: 2,
            preserve: false,
            browsers: ['last 3 versions'],
        },
        cssnano: ctx.env === 'production' ? {} : false,
    },
});
