const Environment = {
    urls: {
        baseHref: ''
    }
};

module.exports = function(environment) {
    const local = Object.assign({}, Environment);
    const specific = optionalRequire(`./env.${environment}`)

    if (specific == null)
        console.warn(`warning: no environment found for "${environment}"`);

    return Object.assign(local, specific, optionalRequire('./env.overrides'));
}

function optionalRequire(path) {
    try {
        return require(path);
    }
    catch (err) {
        return null;
    }
}