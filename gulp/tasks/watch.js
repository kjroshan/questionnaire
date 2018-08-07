import path from 'path';

export default function factory($, env) {
    return function task(done) {
        if (!env.development.watch) {
            done();
            return;
        }

        $.gulp.watch([env.paths.input.client.styles.scss, env.paths.input.client.styles.css], ['build:client:styles']);
        $.gulp.watch(path.join(env.paths.input.client.html, '**/*.html'), ['build:client:html']);
    };
}
