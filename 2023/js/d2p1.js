import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('../input/d2input.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

let totalSum = 0;

const maxCubes = {
    red: 12,
    green: 13,
    blue: 14,
}


rl.on('line', (line) => {

    let isValidGame = true;

    const gameAndResult = line.split(":");
    const game = Number(gameAndResult[0].split(" ")[1]);
    const rounds = gameAndResult[1].split(";");
    

    for(let i = 0; i < rounds.length; i++) {
        const balls = rounds[i].split(",");

        for(let j = 0; j < balls.length; j++){
            const quantityAndColor = balls[j].trim().split(" ");
            //console.log(balls[j]);
            //console.log(`Game ${game}: ${quantityAndColor}`)

            if(quantityAndColor[0] > maxCubes[quantityAndColor[1]]) {
                console.log(`INVALID Game ${game}: ${quantityAndColor}`)
                isValidGame = false;
                break;
            }
        }
    }

    if(isValidGame) {
        console.log("Valid game: ", game);
        totalSum += game;
    }
});

rl.on('close', () => {
    console.log(`TOTAL: ${totalSum}`);
});


