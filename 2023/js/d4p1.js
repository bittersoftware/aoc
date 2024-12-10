import fs from 'fs';

const fileLines = fs.readFileSync("../input/d4input.txt").toString().trim().split("\n")


let myWinningNums = [];

fileLines.forEach((line) => {
    const lineCols = line.split(": ")[1].split(" | ")
    const winningNums = lineCols[0].split(" ").filter((num) => parseInt(num));
    const myNums = lineCols[1].split(" ").filter((num) => parseInt(num));

    const cardWinningNums = myNums.filter((myNum) => winningNums.includes(myNum));

    if (cardWinningNums) {
        myWinningNums.push(cardWinningNums)
    }
})


let points = 0;

const filterWinningCards = myWinningNums.filter((card) => card.length > 0);

filterWinningCards.forEach((card) => points += 2**card.length/2);

console.log(points);

