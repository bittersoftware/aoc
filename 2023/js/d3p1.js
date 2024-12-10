import { promises as fsPromises } from 'fs';


async function readFileAsync() {
    try {
        const filePath = '../input/d3input.txt';
        const data = await fsPromises.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error(err);
    }
}

function createMatrix(text) {
    const lines = text.trim().split('\n');
    const matrix = lines.map((line) => line.split(''));
    return matrix;
}

function checkCoordinatesIntersection(coordinates, area) {
    for (const key in area) {
        for (const c of coordinates) {
            if (area[key].some(coord => coord[0] === c[0] && coord[1] === c[1])) {
                return true;
            }
        }
    }
    return false;
}

function findNumbersCoordinates(text, area) {
    let total = 0;

    for (let i = 0; i < text.length; i++) {
        let num = "";
        let coordinates = [];

        for (let j = 0; j < text[i].length; j++) {
            const char = text[i][j];

            if (!isNaN(char)) {
                num += char;
                coordinates.push([i, j]);

                if (j === text[i].length - 1) {
                    if (num !== "" && checkCoordinatesIntersection(coordinates, area)) {
                        console.log(`Last num: ${num}`);
                        total += parseInt(num);
                    }
                    else {
                        console.log(`Last num NA: ${num}`);
                    }
                }
            }
            else {
                if (num !== "" && checkCoordinatesIntersection(coordinates, area)) {
                    console.log(num)
                    total += parseInt(num);
                }
                else if (num !== "" && !checkCoordinatesIntersection(coordinates, area)) {
                    console.log(`No adjacent: ${num}`);
                }
                coordinates = [];
                num = "";
            }
        }
    }
    console.log(total);
}

function findAdjacent(text) {
    let areas = {};
    const area = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [-1, 1], [1, -1], [1, 1]];

    for (let i = 0; i < text.length; i++) {
        let coordinates = [];

        for (let j = 0; j < text[i].length; j++) {
            const position = "" + i + j;
            const char = text[i][j];

            if (specialChars.includes(char)) {
                area.forEach((edge) => {
                    let x = i + edge[0];
                    let y = j + edge[1];

                    if (0 <= x && x < text[i].length && 0 <= y && y < text.length) {
                        coordinates.push([x, y])
                    }
                    else {
                        console.log(`ij: ${i} ${j}`);
                        console.log(`Special ${char}`);
                        console.log(`Out of bounds ${x} ${y}: ${text[i].length} ${text.length}`);
                    }
                });
            }

            if (coordinates.length > 0 && areas[position] === undefined) {
                areas[position] = coordinates;
                coordinates = [];
            }
        }
    }

    return areas;
}

function getSpecialChars(text) {
    const specialCharacters = new Set();

    for (const char of text) {
        if (!(/[a-zA-Z0-9.\n]/).test(char)) {
            specialCharacters.add(char);
        }
    }

    const uniqueSpecialChars = Array.from(specialCharacters);

    return uniqueSpecialChars;

}


const data = await readFileAsync();
const specialChars = getSpecialChars(data);
const matrix = createMatrix(data);
const coordinates = findAdjacent(matrix);
findNumbersCoordinates(matrix, coordinates);
console.log(specialChars);



