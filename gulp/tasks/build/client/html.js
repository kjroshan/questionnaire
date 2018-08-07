import path from 'path';

export default function factory($, env) {
    return function task() {
        const target = $.gulp.src([path.join(env.paths.input.client.html, 'index.html'), path.join(env.paths.input.client.html, 'error.html')]);

        return target
            .pipe($.replace('<a href="', `<a href="${env.config.basePrefix}`))
            .pipe($.inject($.gulp.src(`${env.paths.output.client.styles}/ie9-*.css`, { read: false }), {
                ignorePath: 'dist/public',
                addPrefix: env.config.basePrefix,
                addRootSlash: true,
                starttag: '<!--[if lte IE 9]>',
                endtag: '<![endif]-->'
            }))
            .pipe($.inject($.gulp.src([`${env.paths.output.client.styles}/*.css`, `!${env.paths.output.client.styles}/ie9-*.css`], { read: false }), {
                ignorePath: 'dist/public',
                addPrefix: env.config.basePrefix,
                addRootSlash: true,
                starttag: '<!--[if !IE]><!-->',
                endtag: '<!--<![endif]-->'
            }))
            .pipe($.inject($.gulp.src(`${env.paths.output.client.scripts.src}/**/*.js`, { read: false }), {
                ignorePath: 'dist/public',
                addPrefix: env.config.basePrefix,
                addRootSlash: true
            }))
            .pipe($.if((env.name === 'production'), $.replace('<!-- manifest.json -->', `<link rel=manifest href='${env.config.basePrefix}${env.config.manifest}'>`)))
            .pipe($.replace('<!-- favicon.svg -->', `<link rel="shortcut icon" href="${env.config.basePrefix}${env.config.favicon}" type="image/svg-xml">`))
            .pipe($.if((env.config.serviceWorker && (env.name === 'production')), $.replace('<!-- serviceWorker.js -->', '<script>if("serviceWorker" in navigator){navigator.serviceWorker.register("/sw.js").then(function(){console.log("Service Worker Registered");});}</script>')))
            .pipe($.gulp.dest(env.paths.output.client.html));
    };
}
