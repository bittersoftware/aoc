import fs from 'fs';

const file = fs.readFileSync("../input/d6input.txt", "utf8").split("\n").filter(x => x.length);

function parseLine(line) {
    return line.split(":").filter(x => x.length).map(x => x.split(" ").filter(x => x.length));
}

const racesAmount = parseLine(file[0])[1].length;

const races = new Array(racesAmount);

file.forEach(line => {
    const parsed = parseLine(line);
    const section = parsed[0][0];

    for (let i = 0; i < parsed[1].length; i++) {
        if (races[i] !== undefined) {
            races[i][section] = Number(parsed[1][i]);
        }
        else {
            races[i] = { [section]: Number(parsed[1][i]) };
        }
    };
})

function binSearch(maxTime, dist) {
    let initial;
    let end;

    for (let i = 0; i <= dist; i++) {
        if (i * (maxTime - i) > dist) {
            console.log("Found Lower", i);
            initial = i;
            break;
        }
    }

    for (let i = dist; i >= 0; i--) {
        if (i * (maxTime - i) > dist) {
            console.log("Found Higher", i);
            end = i;
            break;
        }
    }

    return end - initial + 1;
}

// timePressed * (timeRace - timePressed) >= distance
let possibleResults = [];

races.forEach((race, idx) => {
    const maxTime = race.Time;
    const dist = race.Distance;

    console.log("Race", idx);

    possibleResults.push(binSearch(maxTime, dist));

});

console.log(possibleResults);

const result = possibleResults.reduce((a, b) => a * b, 1);
console.log(result);

