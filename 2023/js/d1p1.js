import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('../input/d1p1.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

let totalSum = 0;

rl.on('line', (line) => {
    let digits = [];

    for (let i = 0; i < line.length; i++) {
        const currentChar = line.charAt(i);

        if (!isNaN(currentChar)) {
            digits.push(currentChar)
        }
    }

    let sum = Number("" + digits[0] + digits[digits.length - 1])

    totalSum += sum
    console.log(sum)
    console.log(totalSum)
});

rl.on('close', () => {
    console.log(`TOTAL: ${totalSum}`);
});


