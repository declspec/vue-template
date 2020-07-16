module.exports = function(opts) {
    return {
        plugins: {
            'postcss-preset-env': {
                overrideBrowserslist: ['last 2 versions', '> 5%'],
            }
        }
    };
};