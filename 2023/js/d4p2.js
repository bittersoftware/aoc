import fs from 'fs';

function toDict(numbers){
    return numbers.reduce((acc, x) => {
        acc[x] = true;
        return acc;
    }, {});
}

// read file. Split lines and remove empty ones
const cards = fs.readFileSync("../input/d4input.txt", "utf8").split("\n").filter(x => x.length);


// receives card game line from cards and the index
// returns an array filled from idx + 1 to idx + points
function getPoints(x, idx){
    const values = x.split(":")[1];
    const [winners, numbersValues] = values.split("|");
    const wData = winners.split(" ").filter(x => x);
    const wDict = toDict(wData.map(x => parseInt(x)));
    const numbers = numbersValues.split(" ").map(x  => parseInt(x.trim()));

    let points = 0;
    numbers.forEach(x => {
        if (wDict[x]) {
            points++;
        }
    });

    return new Array(points).fill(idx + 1).map((x, i) => {
        return x + i;
    });
}

// creates array filled from 1 ... cards.lenth
const toProcess = new Array(cards.length).fill(0).map((_, i) => i + 1);
// store calculated points
const seen = {};
// 
const count = {};

while (toProcess.length) {
    //console.log(toProcess);
    // gets last index of cards games. idx is the card game index
    const idx = toProcess.pop();
    // store how many cards copies we have for that game. [3] = 5;
    count[idx] = count[idx] ? count[idx] + 1 : 1;
    // get points for that game index. contains array from idx+1 to idx + points
    const points = seen[idx] ? seen[idx] : getPoints(cards[idx - 1], idx);
    //console.log("processing", idx, points);
    seen[idx] = points;
    //console.log(seen);

    points.forEach(x => {
        toProcess.push(x);
    });

}

console.log(count, Object.keys(count).reduce((acc, x) => {
    return acc + count[x];
}, 0));


