import fs from 'fs';

const file = fs.readFileSync("../input/d8nput", "utf8").split("\n").filter(x => x.length);

const directions = file.shift().split("").map((letter) => letter === 'L' ? 0 : 1);
console.log(directions);
const map = file.reduce((acc, el) => {
    const key = el.split(" = ")[0];
        const left = el.split("(")[1].split("")[0];
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


let dirs = Object.entries(map).filter(([key, value]) => {
    if (key.endsWith("A")) {
        return true;
    }
}).map(el => el[0]);

console.log(dirs);


let hopsList = [];
dirs.forEach((el, idx) => {
    let hops = 0;
    const buffer = new circularBuffer(directions);
    console.log("e", el)

    while (!el.endsWith("Z")) {
        console.log("Now", el);
        const next = buffer.getNext();
        el = map[el][next];
        hops += 1;
        console.log("Next", el, next === 0 ? "L" : "R");
        console.log("Hops", hops);
    };

    hopsList.push(hops);

})

function gcd(a, b) {
  // Euclidean algorithm to find GCD
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a, b) {
  // Calculate LCM using the GCD
  return Math.abs(a * b) / gcd(a, b);
}

function findLCM(numbers) {
  if (numbers.length < 2) {
    throw new Error("At least two numbers are required to find LCM.");
  }

  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  return result;
}



console.log("Hops", hopsList);

const result = findLCM(hopsList);
console.log("Reasult", result);
