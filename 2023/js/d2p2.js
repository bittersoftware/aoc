import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('../input/d2input.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

let totalSum = 0;


rl.on('line', (line) => {

    const gameAndResult = line.split(":");
    const rounds = gameAndResult[1].split(";");

    let minCubes = {};
    
    for(let i = 0; i < rounds.length; i++) {
        const balls = rounds[i].split(",");

        for(let j = 0; j < balls.length; j++){
            const quantityAndColor = balls[j].trim().split(" ");
            const quantity = Number(quantityAndColor[0]);
            const color = quantityAndColor[1];

            if(!minCubes[color] || minCubes[color] < quantity) {
                minCubes[color] = quantity;
            }
        }
    }

    console.log(minCubes);

    let multiplicationPower = 1;

    for(const key in minCubes){
        multiplicationPower *= minCubes[key];
    }

    totalSum += multiplicationPower;

});

rl.on('close', () => {
    console.log(`TOTAL: ${totalSum}`);
});


