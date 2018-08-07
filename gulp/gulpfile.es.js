/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import runSequence from 'run-sequence';
import loadPlugins from 'gulp-load-plugins';
import registerTasks from 'gulp-tasks-registrator';
import Env from 'env-manager';

const $ = loadPlugins({
    pattern: [
        'browserify',
        'del',
        'disc',
        'glob',
        'gulp-*',
        'gulp.*',
        'gulp',
        'isparta',
        'lodash',
        'merge-stream',
        'mochify',
        'vinyl-buffer',
        'vinyl-source-stream',
        'vinyl-transform',
        'watchify'
    ],
    replaceString: /^gulp(-|\.)/,
    rename: {
        'merge-stream': 'mergeStream',
        del: 'delete',
        'gulp-cssnano': 'cssnano'
    }
});

const env = Env({
    argv: process.argv,
    dir: path.join(__dirname, 'environments'),
    base: 'base.js',
    pattern: '{env}.js',
    defaults: {
        env: 'development'
    }
});

$.util.log($.util.colors.magenta(`Running in ${env.name} environment`));

registerTasks({
    gulp: $.gulp,
    dir: path.join(__dirname, 'tasks'),
    args: [$, env],
    verbose: true,
    panic: true,
    group: true
});

$.gulp.task('test', (done) => {
    return runSequence(
        'test:istanbul',
        'test:scripts',
        done
    );
});

$.gulp.task('analyzeStyles', (done) => {
    return runSequence(
        'build:client:styles',
        'analyze:client:styles',
        done
    );
});

$.gulp.task('analyzeScripts', (done) => {
    return runSequence(
        'analyze:client:scripts',
        done
    );
});

$.gulp.task('build', (done) => {
    return runSequence(
        'clean',
        'build:server',
        'build:client:images',
        'build:client:fonts',
        [
            'build:client:external-scripts',
            'build:client:scripts',
            'build:client:styles'
        ],
        'build:client:html',
        done
    );
});

$.gulp.task('buildALL', (done) => {
    return runSequence(
        'lint:server',
        'lint:client',
        'format:server',
        'format:client',        
        'clean',
        'test',
        'build:server',
        'build:client:images',
        'build:client:fonts',
        'build:client:webapp-manifest',
        [
            'build:client:external-scripts',
            'build:client:scripts',
            'build:client:styles'
        ],
        'build:client:styles-ie-9',
        'build:client:html',
        'build:client:service-worker',
        'analyze',
        done
    );
});

$.gulp.task('default', (done) => {
    if (env.name === 'production') {
        runSequence('buildALL', ['serve', 'watch'], done);
    } else {
        runSequence('build', ['serve', 'watch'], done);
    }
});
