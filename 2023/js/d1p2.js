import fs from 'fs';
import readline from 'readline';

const fileStream = fs.createReadStream('../input/d1input.txt');
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
});

let totalSum = 0;

const nums = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
}

rl.on('line', (line) => {
    let digits = {};

    for (const key in nums) {
        let index = line.indexOf(key);

        while(index !== -1){
            digits[index] = nums[key];
            index = line.indexOf(key, index + 1);
        }
    }

    for (let i = 0; i < line.length; i++) {
        const currentChar = line.charAt(i);

        if (!isNaN(currentChar)) {
            digits[i] = currentChar
            //console.log(`Numeric char: ${currentChar} - ${i}`)
        }
    }

    const keys = Object.keys(digits).map(Number);
    const smallestKey = Math.min(...keys);
    const largestKey = Math.max(...keys);

    const sum = Number("" + digits[smallestKey] + digits[largestKey]);

    // write digits per line to file
    // const data = "" + line + ": " + sum + "\n";
    //fs.appendFile('nums.txt', data, function (err) {
      //if (err) throw err;
    //});

    totalSum = totalSum + sum;

});

rl.on('close', () => {
    console.log(`TOTAL: ${totalSum}`);
});

