export default function factory($, env) {
    const customOpts = {
        entries: env.paths.input.client.scripts.main,
        debug: env.build.debug
    };
    const opts = $.lodash.assign({}, $.lodash.get($, 'watchify.args'), customOpts);
    let b;

    if (env.development.watch) {
        b = $.watchify($.browserify(opts));
    } else {
        b = $.browserify(opts);
    }

    // external module
    $.lodash.forEach(env.paths.output.client.scripts.external, (externalModuleList) => {
        $.lodash.forEach(externalModuleList, (externalModule) => {
            b.external(externalModule);
        });
    });

    function bundle() {
        return b
            .bundle()
            .on('error', (err) => {
                $.util.log($.util.colors.red(err.toString()));
                process.exit(1);
            })
            .pipe($.vinylSourceStream(env.paths.output.client.scripts.main))
            .pipe($.vinylBuffer())
            .pipe($.if(env.build.minify, $.uglify()))
            .pipe($.gulp.dest(env.paths.output.client.scripts.src));
    }

    b.on('update', bundle); // on any dep update, runs the bundler
    b.on('log', $.util.log); // output build logs to terminal

    return bundle;
}
