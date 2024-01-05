const { EnapsoGraphDBClient } = require('@innotrade/enapso-graphdb-client');

let graphDBEndpoint = new EnapsoGraphDBClient.Endpoint({
    baseURL: 'http://localhost:7200',
    repository: 'dbl',
    triplestore: 'graphdb',
    prefixes: [
        {
            prefix: 'entest',
            iri: 'http://ont.enapso.com/test#'
        }
    ],
    transform: 'toJSON'
});

module.exports = graphDBEndpoint;