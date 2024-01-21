/*TODO: repair callback's hell with promises */
const path = require('node:path');
const fs = require('node:fs');

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
      if (err) throw err;
    });
  }
});

fs.readdir(path.join(__dirname, 'files'), (err, files) => {
  if (err) throw err;
  for (const file of files) {
    fs.readFile(path.join(__dirname, 'files', file), (err, data) => {
      if (err) throw err;
      fs.writeFile(path.join(__dirname, 'files-copy', file), data, (err) => {
        if (err) throw err;
      });
    });
  }
});
