const _ = require('lodash');
const argv = require('minimist')(process.argv.slice(2));

_.set(process.env, 'CONTEXT_ROOT', '');
_.set(process.env, 'LOG_LEVEL_CLIENT', 'debug');

const tasks = argv._;
const task = _.first(tasks);
const watch = _.isEmpty(task) || !_.startsWith(task, 'build');

module.exports = {
    name: 'development',
    build: {
        debug: true,
        minify: false
    },
    development: {
        port: 8080,
        watch
    }
};
