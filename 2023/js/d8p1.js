import fs from 'fs';

const file = fs.readFileSync("../input/d8sample2", "utf8").split("\n").filter(x => x.length);

const directions = file.shift().split("").map((letter) => letter === 'L' ? 0 : 1);
console.log(directions);
const map = file.reduce((acc, el) => {
    const key = el.split(" = ")[0];
    const left = el.split("(")[1].split(",")[0];
    const right = el.split(", ")[1].split(")")[0];

    acc[key] = [left, right];
    return acc;
}, {});

console.log(map);

function circularBuffer(array) {
    this.array = array;
    this.currentIndex = 0;

    this.getNext = function() {
        const value = this.array[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.array.length;
        return value;
    };
}

const buffer = new circularBuffer(directions);

let hops = 0;
let dir = "AAA";

while (dir !== "ZZZ") {
    //console.log("Now", dir)
    const next = buffer.getNext();
    dir = map[dir][next];
    hops += 1;

    //console.log("Hops", hops);
    //console.log("Hop", dir)
};

console.log("Result", hops);
