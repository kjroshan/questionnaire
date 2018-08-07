export default function factory($, env) {
    return function task() {
        return $.gulp
            .src(env.paths.input.server.scripts.src)
            .pipe($.if(env.build.debug, $.sourcemaps.init()))
            .pipe($.babel())
            .pipe($.if(env.build.debug, $.sourcemaps.write()))
            .pipe($.gulp.dest(env.paths.output.server.scripts.src));
    };
}
