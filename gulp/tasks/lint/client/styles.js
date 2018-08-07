export default function factory($, env) {
    return function task() {
        return $.gulp.src(env.paths.input.client.styles.scss)
        .pipe($.sassLint())
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError());
    };
}
