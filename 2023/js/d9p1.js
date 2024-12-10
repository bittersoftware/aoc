import fs from 'fs';

const file = fs.readFileSync("../input/d9input", "utf8").split("\n").filter(x => x.length).map(x => x.split(" "));
console.log(file);


/**
 *  Get diff in array
 *
 * @param {Array<number>} sequence
 */
function getDiff(sequence) {
    return sequence.slice(1).map((value, index) => value - sequence[index]);
}


let resultList = []

file.forEach(line => {
    line = line.map(el => Number(el));
    let target = line;
    let allZeros = false;
    let lastDiff = [];


    while (!allZeros) {
        target = getDiff(target);
        console.log("Diffs", target)
        lastDiff.push(target[target.length - 1]);

        allZeros = target.every(x => x === 0);
    }

    const valToSum = lastDiff.reduce((acc, val) => {
        acc = acc + val;
        return acc;
    }, 0);

    resultList.push(line.pop() + valToSum);
});

console.log("Result List", resultList);

const result = resultList.reduce((acc, val) => acc + val, 0);
console.log("End Result", result);





