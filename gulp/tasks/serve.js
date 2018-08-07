import path from 'path';

export default function factory($, env) {
    return function task() {
        return $.nodemon({
            env: { NODE_ENV: env.name },
            script: env.paths.output.server.scripts.main,
            ext: 'js, json',
            watch: [
                env.paths.mock,
                ...env.paths.input.server.scripts.src,
                ...env.paths.input.client.scripts.src
            ],
            ignore: [
                path.join(env.paths.root, 'gulp/{,**/}*.*'),
                path.join(env.paths.output.server.scripts.src, '{,**/}*.*')
            ],
            tasks: [
                'build:server:scripts'
            ]
        });
    };
}
