const {workerData, parentPort} = require ('worker_threads');
const n = workerData.n;

const findSum = (n) => {
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum += i;
        
    }
    return sum;
}

const result = findSum(n);

parentPort.postMessage(result);