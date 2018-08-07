import path from 'path';

export default function factory($, env) {
    return function task() {
        return $.gulp
            .src(path.join(env.paths.output.client.styles, 'bundle.css'))
            .pipe($.bless({ suffix: '-part' }))
            .pipe($.rename((file) => {
                file.basename = `ie9-${file.basename}`;
            }))
            .pipe($.gulp.dest(path.join(env.paths.output.client.styles)));
    };
}
