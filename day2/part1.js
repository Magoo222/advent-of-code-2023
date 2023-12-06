const fs = require('fs');
const readline = require('readline');

(async function readFile() {
  const fileStream = fs.createReadStream('input.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let idCounter = 0;

  for await (const line of rl) {
    const input = line.split(' ');

    let blue = 0;
    let red = 0;
    let green = 0;

    input.forEach((element, index) => {
      const clean = element.replace(':', '');
      const reallyClean = clean.replace(',', '');
      const reallyReallyClean = reallyClean.replace(';', '');
      input[index] = reallyReallyClean;
    });

    let gameId = input[1];

    let isBlueInvalid = false;
    let isGreenInvalid = false;
    let isRedInvalid = false;

    input.forEach((element, index) => {
      if (element === 'blue') {
        if (parseInt(input[index - 1]) > 14) isBlueInvalid = true;
      }
      if (element === 'red') {
        if (parseInt(input[index - 1]) > 12) isRedInvalid = true;
      }
      if (element === 'green') {
        if (parseInt(input[index - 1]) > 13) isGreenInvalid = true;
      }
    });

    // console.log(`Red: ${red}, Green: ${green}, Blue: ${blue}`);

    if (!isRedInvalid && !isBlueInvalid && !isGreenInvalid) {
      console.log(line);
      idCounter += parseInt(gameId);
    }
  }

  console.log(idCounter);
})();
