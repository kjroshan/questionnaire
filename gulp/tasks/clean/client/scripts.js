export default function factory($, env) {
    return function task(done) {
        return $.delete([env.paths.output.client.scripts.src], done);
    };
}
