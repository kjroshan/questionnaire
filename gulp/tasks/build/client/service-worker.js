/* eslint-disable import/no-extraneous-dependencies  */
import swPrecache from 'sw-precache';
import path from 'path';

export default function factory($, env) {
    function task() {
        if (env.config.serviceWorker && (env.name === 'production')) {
            return swPrecache.write(path.join(env.paths.output.client.html, 'sw.js'), {
                staticFileGlobs: [`${path.relative('.', env.paths.output.client.html)}/**/*.{js,css,json}`],
                stripPrefix: path.relative('.', env.paths.output.root),
                verbose: true
            });
        }
        return null;
    }

    return task;
}
