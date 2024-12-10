import fs from 'fs';

const file = fs.readFileSync("../input/d10sample1", "utf8").split("\n").filter(x => x.length).map(x => x.split(""));
console.log(file);

/**
| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal;
 */

// (L, D, R, T)
// H - V
const directions = {
    '|': {
        "D": [0, -1, "U"],
        "U": [0, 1, "D"],
    },
    '-': {
        "L": [-1, 0, "R"],
        "R": [1, 0, "L"],
    },
    'L': {
        "D": [1, 0, "R"],
        "L": [0, -1, "U"],
    },
    'J': {
        "D": [-1, 0, "L"],
        "R": [0, -1, "U"],
    },
    '7': {
        "U": [-1, 0, "L"],
        "R": [0, 1, "D"],
    },
    'F': {
        "U": [1, 0, "R"],
        "L": [0, 1, "D"],
    },
}

//.....
//.S-7.
//.|.|.
//.L-J.
//.....

//7-F7-
//.FJ|7
//SJLL7
//|F--J
//LJ.LJ

// find starting point
const colsLength = file[0].length;
let start;

for (let i = 0; i < file.length; i++) {
    for (let j = 0; j < colsLength; j++) {
        if (file[i][j] === 'S') {
            start = [i, j];
            break;
        }
    }
    if (start) break;
}

console.log(start);

let possibleStarts = [
    { "L": [start[0], start[1] - 1] },
    { "D": [start[0] + 1, start[1]] },
    { "R": [start[0], start[1] + 1] },
    { "U": [start[0] - 1, start[1]] },
];

possibleStarts = possibleStarts.filter(dir => {
    const [_, el] = Object.entries(dir)[0];
    return el[0] >= 0 && el[0] < file.length && el[1] >= 0 && el[1] < file[0].length;
})

console.log(possibleStarts);

let result = [];

possibleStarts.forEach(dir => {
    let seen = [];

    let [from, pos] = Object.entries(dir)[0];
    let char = file[pos[0]][pos[1]];
    seen.push([pos[0], pos[1]]);

    while (!seen.includes(pos) || char !== '.') {
        let data;

        if (directions[char] && directions[char][from]) {
            data = directions[char][from];
        } else {
            console.log("Invalid character or direction");
            break;
        }
        console.log("DATA", data);
        from = data.slice(2)[0];
        const diff = data.slice(0, 2);
        pos = pos.map((el, idx) => el + diff[idx]);
        console.log("HERE", from, pos, char);
        char = file[pos[0]][pos[1]];
        seen.push([pos[0], pos[1]]);

        if (char === 'S') {
            result.push(seen);
            break;
        }
    }
});

console.log(result);
