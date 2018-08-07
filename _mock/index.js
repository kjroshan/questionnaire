/* eslint-disable import/no-extraneous-dependencies, global-require, import/no-dynamic-require */

const Promise = require('bluebird');
const Hapi = require('hapi');
const fs = require('fs');

const logger = console;
const port = 3030;
const timeout = 1;
const WORKFLOW_PATH = `${__dirname}/../_workflows/tenants`;

const server = new Hapi.Server();
server.connection({ port });

function loadFile(filePath) {
    return Promise.fromCallback((done) => {
        if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
            fs.readFile(filePath, 'utf8', (_err, content) => {
                if (_err) done(_err);
                done(null, content);
            });
        } else if (fs.existsSync(`${filePath}.json`)) {
            fs.readFile(`${filePath}.json`, 'utf8', (_err, content) => {
                if (_err) done(_err);
                done(null, content);
            });
        }
    });
}

server.route({ method: 'GET',
    path: '/api/{service*}',
    handler(req, res) {
        setTimeout(() => {
            return loadFile(`${__dirname}/data/${req.params.service}`).then((result) => {
                return res(result);
            });
        }, timeout);
    }
});

server.route({ method: 'GET',
    path: '/{tenantId}/configurations/{resource}/{id*}',
    handler(req, res) {
        return loadFile(`${WORKFLOW_PATH}/${req.params.tenantId}/${req.params.resource}/${req.params.id}`).then((result) => {
            return res(result);
        });
    }
});

server.start((err) => {
    logger.log(`Mock Server is started @ http://localhost:${port}`);
    if (err) { throw err; }
});
