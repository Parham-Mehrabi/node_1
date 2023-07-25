
function fakeLatency(ms){
    // promise to waste $delay amount of ms
    const delay = ms || getRandomInteger(2000, 5000)
    return new Promise(resolve => setTimeout(resolve, getRandomInteger(delay)))
}

function getRandomInteger(min, max){
    // return an integer between min and max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.fakeLatency = fakeLatency;
module.exports.getRandomInteger = getRandomInteger;