const http = require ('http');
const queryString = require ('querystring');
const url = require ('url');
const {Worker} = require ('worker_threads');

const server = http.createServer (async (req, res) => {
    res.write (`Your Request is being processed... \n`);
    const query = url.parse (req.url).query;
    const n = Number(queryString.parse (query)['n']);

    const sum = await findSum (n);
    res.end(`This is the sum ${sum}`);
});

server.listen (3000, () => {
    console.log ('Server is listening at port 3000');
});

function findSum(n) {
 return new Promise ((resolve, reject) => {
    const worker = new Worker ('./worker/summation.js', {workerData: {n}});
    worker.on ('message', (result) => {
       resolve(result);
    });
    worker.on ('error', (err) => {
        reject (err);
    });
 });
};