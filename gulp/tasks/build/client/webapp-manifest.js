
export default function factory($, env) {
    function task() {
        return $.gulp.src(`${env.paths.input.client.html}/**/*.json`)
            .pipe($.replace('favicon.svg', `${env.config.basePrefix}${env.config.favicon}`))
            .pipe($.gulp.dest(env.paths.output.client.html));
    }
    return task;
}
