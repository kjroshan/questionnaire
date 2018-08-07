export default function factory($, env) {
    return function task(done) {
        const scss = $.gulp
            .src(env.paths.input.client.styles.main)
            .pipe($.sass({ includePaths: env.paths.input.client.styles.scss })
              .on('error', (err) => {
                  $.util.log($.util.colors.red(err.toString()));
                  process.exit(1);
              })
            );

        const css = $.gulp.src(env.paths.input.client.styles.css);

        return $.mergeStream([scss, css])
          .pipe($.if(env.build.minify, $.cssnano()))
          .pipe($.concat('bundle.css'))
          .pipe($.gulp.dest(env.paths.output.client.styles))
          .on('error', (err) => {
              done(err);
          });
    };
}
