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

file.forEach((line, index) => {
    //if (index !== 1) return;
    line = line.map(el => Number(el));
    let target = line;
    let allZeros = false;
    let firstDiff = [];


    while (!allZeros) {
        target = getDiff(target);
        //console.log("Diffs", target)
        firstDiff.push(target[0]);

        allZeros = target.every(x => x === 0);
    }

    console.log("First diff", firstDiff)
    const valToSub = firstDiff.reverse().reduce((acc, val) => {
        acc = val - acc;
        return acc;
    }, 0);

    console.log("To subtract", valToSub, "from", line[0]);

    resultList.push(line.shift() - valToSub);
});

console.log("Result List", resultList);

const result = resultList.reduce((acc, val) => acc + val, 0);
console.log("End Result", result);





