export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.server.scripts.src)
        .pipe($.eslint())
        .pipe($.eslint.format('stylish'))
        .pipe($.eslint.failAfterError());
    };
}
