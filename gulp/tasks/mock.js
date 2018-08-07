/* eslint-disable  global-require, import/no-dynamic-require */

export default function factory($, env) {
    return function task(done) {
        require(`${env.paths.mock}`);
        done();
    };
}
