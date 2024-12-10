import fs from 'fs';

const mapsInput = fs.readFileSync("../input/d5input.txt", "utf8").split("\n\n").filter(x => x.length);

// removes first line from mapsInput and parse to seedValues
const seedValues = mapsInput.shift().split(": ")[1].split(" ");
const seeds = [];

// For each even index store [start, length] pairs in seeds
for (let i = 0; i < seedValues.length; i+=2) {
    seeds.push({
        start: +seedValues[i],
        length: +seedValues[i + 1],
    })
}

// creates range object from each range
// {dest, src, range}
function createRange(line) {
    const items = line.split(" ");
    const range = {
        dest: +items[0],
        src: +items[1],
        range: +items[2],
    };

    return range;
}

// Fill the blanks of the ranges to have starting points
function createNegativeRanges(ranges) {
    // order ranges by src
    ranges.sort((a, b) => a.src - b.src);

    let start = 0;

    for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];

        // if src is greater than our starting point there is a blank space
        if (range.src > start) {
            // adds range to range array to fill the blank
            ranges.splice(i, 0, {
                src: start,
                dest: start,
                range: range.src - start,
            });

            i++
        }

        // start now is the the end of segment + 1
        start = range.src + range.range;
    }
    //console.log("Filled ranges", ranges);
    return ranges;
}

function parseMap(data) {
    const contents = data.split("\n").filter(x => x);

    // get and remove the first element of array that is the string to parse
    // splits "light-to-temperature map" > ["light", "to", "temperature"]
    const [ from, _, to] = contents.shift().split(" ")[0].split("-");

    // create object and map the rest of the data with createRange function
    return {
        from: from,
        to: to,
        map: contents.map(createRange)
    }
};

// value: start
// reange: remaining
// name: from key
// map: map for key
// returns: [startLocation, consumed]
function walk(value, range, name, map) {
    console.log("walk", value, range, name);
    // last value "location" will have no key
    if (map[name] === undefined) {
        //console.log("undefined", value, range)
        return [value, range];
    }

    // gets map for each from key. starts with "seeds"
    const item = map[name];
    // finds what range contains value
    const rangeItem = item.map.find(x => x.src <= value && value < x.src + x.range);

    if (rangeItem) {
        const diff = value - rangeItem.src;
        const newValue = rangeItem.dest + diff;
        //console.log(value, range, newValue, rangeItem.range - diff, item.to)
        return walk(newValue, Math.min(range, rangeItem.range - diff), item.to, map);
    }

    //console.log("Name", name, item.to)
    return walk(value, 1, item.to, map);
}

// creates list of objects for dest, src and range
const parsed = mapsInput.map(x => parseMap(x));

// add negative ranges to the map
parsed.forEach(p => {
    p.map = createNegativeRanges(p.map);
});

// use from as parent key for each object
const parsedMap = parsed.reduce((acc, x) => {
    acc[x.from] = x;
    return acc;
}, {});

//console.log(JSON.stringify(parsedMap, null, 4));

let lowest = Infinity;

for (const seed of seeds) {
    console.log("start", seed);
    let remaining = seed.length;
    let start = seed.start;
    while (remaining > 0) {
        const [startLocation, consumed] = walk(start, remaining, "seed", parsedMap);
        console.log("start, consumed", startLocation, consumed);

        remaining -= consumed;
        start += consumed;

        if (consumed > 1) {
            //console.log("consumed", consumed);
        }
        if (startLocation < lowest) {
            lowest = startLocation;
        }
    }

    console.log("finished", seed);
}

console.log(lowest);
