const fs = require('node:fs');
const path = require('node:path');
//const process = require('node:process');
const readable = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readable.on('data', (chunk) => process.stdout.write(chunk));
