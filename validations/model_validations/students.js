const { fakeLatency } = require('../../utils/fake_delay')

async function myAsyncValidationWork(v){
    // fake some async validation work like calling an API here
    await fakeLatency();
    return v && v.length > 0
}

module.exports.myAsyncValidationWork = myAsyncValidationWork;