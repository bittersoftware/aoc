import fs from 'fs';

const file = fs.readFileSync("../input/d7input", "utf8").split("\n").filter(x => x.length);

const hands = file.map(hand => hand.split(" ")[0]);
const bids = file.map(hand => hand.split(" ")[1]);

const cardsOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const gamesOrder = {
    fiveOfKind: { countOne: 5, countTwo: 0, priority: 0 },
    fourOfKind: { countOne: 4, countTwo: 1, priority: 1 },
    fullHouse: { countOne: 3, countTwo: 2, priority: 2 },
    threeOfKind: { countOne: 3, countTwo: 1, priority: 3 },
    twoPair: { countOne: 2, countTwo: 2, priority: 4 },
    onePair: { countOne: 2, countTwo: 1, priority: 5 },
    highCard: { countOne: 1, countTwo: 1, priority: 6 },
};

function getGame(hand) {

    const cards = hand.split("");
    const cardsCounter = {};

    // count cards
    cards.forEach(card => {
        if (card in cardsCounter) {
            cardsCounter[card] = cardsCounter[card] + 1;
        } else {
            cardsCounter[card] = 1;
        }
    });

    // sort cards
    const keyValueArr = Object.entries(cardsCounter);
    const sortedArr = [...keyValueArr].sort(([, a], [, b]) => b - a);

    // get two first card counts
    let handCountOne;
    let handCountTwo;

    if (sortedArr.length > 1) {
        handCountOne = sortedArr[0][1];
        handCountTwo = sortedArr[1][1];
    } else {
        handCountOne = sortedArr[0][1];
        handCountTwo = 0;
    }


    for (const game in gamesOrder) {
        if (gamesOrder[game].countOne === handCountOne
            && gamesOrder[game].countTwo === handCountTwo) {
            //console.log(game, gamesOrder[game].priority);
            return gamesOrder[game].priority;
        }
    }

}

/**
 * Compare hands to sort
 *
 * @param {string} a - first hand
 * @param {string} b - second hand
 * @returns {boolean} to sort
 */
function compareHands(a, b) {
    const gameA = hands[a[0]];
    const gameB = hands[b[0]];
    console.log("Compare", gameA, gameB);
    for (let i = 0; i < gameA.length; i++) {
        if (gameA[i] === gameB[i]) continue;
        //console.log("Index of", gameA[i], cardsOrder.indexOf(gameA[i]));
        //console.log("Index of", gameB[i], cardsOrder.indexOf(gameB[i]));
        console.log("Result", cardsOrder.indexOf(gameA[i]) < cardsOrder.indexOf(gameB[i]));
        //console.log("---------------");
        return cardsOrder.indexOf(gameA[i]) - cardsOrder.indexOf(gameB[i]);
    }
};


/**
 * Untie
 *
 * @param {Array.<Array.<string>>} hands - List of hands
 */
function untieHands(hands) {
    console.log("BEFORE", hands);
    const sortedHands = [...hands].sort(compareHands);
    console.log("AFTER", sortedHands);
    return sortedHands;
}


const games = hands.map((hand, index) => [index, getGame(hand)]);
const sortedGames = [...games].sort(([, a], [, b]) => a - b);

let lastRaking = -1;
let tiedBatch = [];

//console.log(sortedGames);

for (let i = 0; i < sortedGames.length; i++) {

    const currentRanking = sortedGames[i][1];

    if (currentRanking === lastRaking) {
        const last = tiedBatch.length - 1;
        tiedBatch[last].push(sortedGames[i]);
        //console.log("Tied", [sortedGames[i]])
    } else {
        //console.log("Not tied", [sortedGames[i]])
        tiedBatch.push([sortedGames[i]]);
    }

    lastRaking = currentRanking;
}

let gamesSorted = [];
tiedBatch.forEach((batch) => {
    if (batch.length > 1) {
        const untied = untieHands(batch);
        gamesSorted.push(...untied);
    }
    else {
        gamesSorted.push(...batch);
    }
})

//console.log("final", gamesSorted);

let bidResults = [];

gamesSorted.reverse();

gamesSorted.forEach((game, ranking) => {
    const bid = bids[game[0]];
    console.log("Game", game[0], "Bid", bids[game[0]], "Rank", ranking + 1);
    bidResults.push(bid * (ranking + 1));
})

console.log(bidResults);

console.log(bidResults.reduce((acc, val) => acc + val, 0));
//(765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5)

