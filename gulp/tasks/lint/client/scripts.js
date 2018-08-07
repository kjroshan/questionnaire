export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.client.scripts.src)
        .pipe($.eslint())
        .pipe($.eslint.format('stylish'))
        .pipe($.eslint.failAfterError());
    };
}
