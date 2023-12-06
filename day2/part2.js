const fs = require('fs');
const readline = require('readline');

(async function readFile() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let powerCounter = 0;

  for await (const line of rl) {
    const input = line.split(' ');

    input.forEach((element, index) => {
      const clean = element.replace(':', '');
      const reallyClean = clean.replace(',', '');
      const reallyReallyClean = reallyClean.replace(';', '');
      input[index] = reallyReallyClean;
    });

    let maxBlue = 0;
    let maxRed = 0;
    let maxGreen = 0;

    input.forEach((element, index) => {
      if (element === 'blue') {
        const newBlue = parseInt(input[index - 1]);
        if (newBlue > maxBlue) maxBlue = newBlue;
      }
      if (element === 'red') {
        const newRed = parseInt(input[index - 1]);
        if (newRed > maxRed) maxRed = newRed;
      }
      if (element === 'green') {
        const newGreen = parseInt(input[index - 1]);
        if (newGreen > maxGreen) maxGreen = newGreen;
      }
    });

    powerCounter += maxBlue * maxGreen * maxRed;
  }

  console.log(powerCounter);
})();
