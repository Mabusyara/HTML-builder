const fsPromises = require('node:fs/promises');
const path = require('node:path');
const fs = require('node:fs');

const stylesPath = path.join(__dirname, 'styles');
const projectPath = path.join(__dirname, 'project-dist');

const bundleFile = fs.createWriteStream(
  path.join(projectPath, 'bundle.css'),
  'utf-8',
);

fsPromises.readdir(stylesPath).then((files) => {
  for (const file of files) {
    const fullFilePath = path.join(__dirname, 'styles', file);
    if (path.extname(fullFilePath) === '.css') {
      fs.readFile(fullFilePath, (err, data) => {
        if (err) throw err;
        bundleFile.write(data);
      });
    }
  }
});
