export default function factory($, env) {
    // externalBundleMap
    const externalBundleMap = $.lodash.reduce(env.paths.output.client.scripts.external, (result, requireModuleList, bundleName) => {
        result.push({
            externals: $.lodash.reduce(result, (r2, v2) => {
                r2.push(...v2.requires);
                return r2;
            }, []),
            requires: requireModuleList,
            bundleName
        });
        return result;
    }, []);

    const externalBundles = $.lodash.map(externalBundleMap, (externalBundleDetails) => {
        return () => {
            const externalBundle = $.browserify({ debug: env.build.debug });
          // external module
            $.lodash.forEach(externalBundleDetails.externals, (externalModule) => {
                externalBundle.external(externalModule);
            });
          // require module
            $.lodash.forEach(externalBundleDetails.requires, (requireModule) => {
                externalBundle.require(requireModule);
            });

            externalBundle.bundle()
          .on('error', (err) => {
              $.util.log($.util.colors.red(err.toString()));
              process.exit(1);
          })
          .on('log', $.util.log)
          .pipe($.vinylSourceStream(`${externalBundleDetails.bundleName}.js`))
          .pipe($.vinylBuffer())
          .pipe($.if(env.build.minify, $.uglify()))
          .pipe($.gulp.dest(env.paths.output.client.scripts.src));
        };
    });

    function bundleAll() {
        return $.lodash.forEach(externalBundles, (externalBundle) => {
            externalBundle();
        });
    }

    return bundleAll;
}
