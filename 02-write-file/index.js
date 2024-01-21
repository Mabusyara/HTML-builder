const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');

const writable = fs.createWriteStream(
  path.join(__dirname, 'text.txt'),
  'utf-8',
);

process.stdout.write('Enter the text: ');

process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    process.stdout.write('Work complete');
    process.exit();
  } else {
    writable.write(data);
  }
});

process.on('SIGINT', () => {
  process.stdout.write('Work complete');
  process.exit();
});
