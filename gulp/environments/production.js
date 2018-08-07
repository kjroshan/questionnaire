const _ = require('lodash');

_.set(process.env, 'NODE_ENV', 'production');
_.set(process.env, 'CONTEXT_ROOT', '');
_.set(process.env, 'LOG_LEVEL_CLIENT', 'warn');

module.exports = {
    name: 'production',
    build: {
        debug: false,
        minify: true
    }
};
