const fs = require('fs');

function decodeValue(base, value) {
    return parseInt(value, parseInt(base));
}

function lagrangeInterpolation(points) {
    const secret = points.reduce((result, [xi, yi], i) => {
        let li = points.reduce((product, [xj, _], j) => {
            if (i !== j) {
                product *= xj / (xj - xi);
            }
            return product;
        }, 1);
        return result + yi * li;
    }, 0);

    return Math.round(secret);
}

function findSecret(jsonData) {
    const { keys, ...points } = JSON.parse(jsonData);
    const { k } = keys;

    const decodedPoints = Object.entries(points)
        .map(([x, { base, value }]) => [parseInt(x), decodeValue(base, value)])
        .slice(0, k);

    return lagrangeInterpolation(decodedPoints);
}


const jsonData = fs.readFileSync('input2.json', 'utf8');


const secret = findSecret(jsonData);
console.log(secret);