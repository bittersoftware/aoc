import fs from 'fs';
import readline from 'readline';

export default function readLines(filePath, processLine) {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
        processLine(line);
    });

    rl.on('close', () => {
        console.log('EOF');
    });
}
