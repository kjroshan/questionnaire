const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const NODE_MODULES = path.join(ROOT_DIR, 'node_modules');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const CLIENT_SRC_DIR = path.join(SRC_DIR, 'client');
const SERVER_SRC_DIR = path.join(SRC_DIR, 'server');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const SERVER_DIST_DIR = DIST_DIR;
const CLIENT_DIST_DIR = path.join(SERVER_DIST_DIR, 'public');

const basePrefix = process.env.CONTEXT_ROOT || '';

module.exports = {
    name: 'base',
    build: {
        debug: false,
        minify: true
    },
    development: {
        port: 8080,
        watch: false
    },
    paths: {
        root: ROOT_DIR,
        input: {
            root: SRC_DIR,
            client: {
                root: CLIENT_SRC_DIR,
                html: CLIENT_SRC_DIR,
                images: path.join(CLIENT_SRC_DIR, 'images'),
                fonts: [],
                styles: {
                    main: path.join(CLIENT_SRC_DIR, 'styles', 'main.scss'),
                    scss: [
                        path.join(CLIENT_SRC_DIR, 'styles', '/**/*.scss'),
                        NODE_MODULES,
                        ROOT_DIR
                    ],
                    css: []
                },
                scripts: {
                    main: `${CLIENT_SRC_DIR}/scripts/index.js`,
                    src: [`${CLIENT_SRC_DIR}/scripts/**/*.js`],
                }
            },
            server: {
                scripts: {
                    main: `${SERVER_SRC_DIR}/index.js`,
                    src: [`${SERVER_SRC_DIR}/**/*.js`]
                }
            },
            test: {
                scripts: [
                    `${ROOT_DIR}/test/**/*.js`,
                    `${CLIENT_SRC_DIR}/scripts/**/*spec.js`,
                    `${SERVER_SRC_DIR}/**/*spec.js`
                ],
                exclude: [
                    `!${CLIENT_SRC_DIR}/**/*.js`,
                    `!${SERVER_SRC_DIR}/**/*.js`
                ]
            }
        },
        output: {
            root: DIST_DIR,
            client: {
                root: CLIENT_DIST_DIR,
                images: path.join(CLIENT_DIST_DIR, 'images'),
                fonts: path.join(CLIENT_DIST_DIR, 'fonts'),
                styles: path.join(CLIENT_DIST_DIR, 'styles'),
                scripts: {
                    main: 'renderer.js',
                    src: `${CLIENT_DIST_DIR}/scripts`,
                    external: {
                    },
                },
                html: CLIENT_DIST_DIR
            },
            server: {
                scripts: {
                    main: `${SERVER_DIST_DIR}/index.js`,
                    src: SERVER_DIST_DIR
                }
            },
            test: {
                coverage: `${ROOT_DIR}/coverage`
            }
        },
        mock: `${ROOT_DIR}/_mock`
    },
    thresholds: {
        coverage: {
            global: 0,
            each: 0
        },
        css: 500,
        js: 2500
    },
    config: {
        basePrefix,
        favicon: '/images/favicon.svg',
        manifest: '/manifest.json',
        serviceWorker: false
    }
};
