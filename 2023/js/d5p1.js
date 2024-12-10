import fs from 'fs';

const file = fs.readFileSync("../input/d5input.txt").toString().split("\n\n");

const blocks = file.map((line) => line.split(":")[1].split("\n").filter(x => x.length));

function getNextValue(block, value) {
    let nextValue = value;
    console.log("Looking for:", value);

    block.forEach(line => {
        const [dest, src, range] = line.split(" ").map(x => parseInt(x));

        if (value >= src && value <= src + range) {
            console.log(`Value ${value} in ${src} and ${src+range}`);
            const diff = value - src;
            nextValue = dest + diff;
            console.log(`Offset map: ${nextValue}`);
        }
    });

    console.log(`Returning ${nextValue}`);
    return nextValue;

};

let location = [];
const seeds = blocks[0][0].split(" ").filter((seed) => seed.length).map((seed) => parseInt(seed));

seeds.forEach(seed => {
    console.log("seed", seed);
    let result = seed;

    for (let i = 1; i < blocks.length; i++) {
        result = getNextValue(blocks[i], result);
    };

    location.push(result);
});

console.log(location);
console.log("Result:", Math.min(...location));
