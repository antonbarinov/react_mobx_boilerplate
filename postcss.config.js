module.exports = (ctx) => ({
    parser: false,
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        'postcss-preset-env': {
            autoprefixer: {
                grid: "autoplace"
            },
        },
        'postcss-import': {},
        cssnano: ctx.env === 'production' ? {} : false,
    }
});
