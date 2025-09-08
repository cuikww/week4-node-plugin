import chalk from 'chalk';
import cowsay from 'cowsay';
import figlet from 'figlet';
import gradient from 'gradient-string';
import dayjs from 'dayjs';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('name', {
    type: 'string',
    description: 'Nama Lengkap',
    default: 'I Nengah',
  })
  .option('nim', {
    type: 'string',
    description: 'NIM',
    default: 'F1D022049',
  })
  .option('message', {
    type: 'string',
    description: 'Pesan Motivasi',
    default: 'Just make it exist first. You can make it good later.',
  })
  .help()
  .argv;

const cowsayCharacters = ['dragon', 'tux', 'ghostbusters', 'skeleton', 'stegosaurus'];

function displayNameAndNIM(name, nim) {
  if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
    throw new Error('Invalid or missing name. Please provide a valid name.');
  }
  if (!nim || !/^[a-zA-Z0-9]+$/.test(nim)) {
    throw new Error('Invalid or missing NIM. Please provide an alphanumeric NIM.');
  }

  const nameOutput = chalk.bold.white.bgBlue(` Full Name: ${name} `);
  const nimOutput = chalk.black.bgGreen(` NIM: ${nim} `);
  const boxedOutput = boxen(`${nameOutput}\n${nimOutput}`, {
    padding: 1,
    borderStyle: 'double',
    borderColor: 'cyan',
  });
  console.log(boxedOutput);
}

function displayMotivationalMessage(message) {
  const randomCharacter = cowsayCharacters[Math.floor(Math.random() * cowsayCharacters.length)];
  const cowsayOutput = cowsay.say({
    text: message,
    e: '^^',
    T: 'U ',
    f: randomCharacter,
  });
  const boxedCowsay = boxen(cowsayOutput, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'yellow',
  });
  console.log(boxedCowsay);
}

async function displayAsciiName(name) {
  try {
    const asciiArt = await figlet.text(name, {
      font: 'Ghost',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    });
    const gradientArt = gradient.rainbow.multiline(asciiArt);
    const boxedArt = boxen(gradientArt, {
      padding: 1,
      borderStyle: 'classic',
      borderColor: 'magenta',
    });
    console.log(boxedArt);
  } catch (err) {
    console.error(chalk.red('Error generating ASCII art:', err.message));
  }
}

function displayDateTime() {
  const currentDateTime = dayjs().format('dddd, MMMM D, YYYY [at] h:mm A');
  const dateOutput = chalk.cyan.italic(`Current Date & Time: ${currentDateTime}`);
  const boxedDate = boxen(dateOutput, {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'blue',
  });
  console.log(boxedDate);
}

async function main() {
  try {
    console.log(chalk.bold.green('\n=== Node.js Assignment Output ===\n'));
    
    displayNameAndNIM(argv.name, argv.nim);
    displayMotivationalMessage(argv.message);
    await displayAsciiName(argv.name);
    displayDateTime();
    
    console.log(chalk.bold.green('\n=== Output Complete ===\n'));
  } catch (err) {
    console.error(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

main();