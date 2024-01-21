const path = require('node:path');
const fsPromises = require('node:fs/promises');

const folder = path.join(__dirname, 'secret-folder');

fsPromises.readdir(folder).then((files) => {
  for (const file of files) {
    const fullFilePath = path.join(__dirname, 'secret-folder', file);
    fsPromises.stat(fullFilePath).then((result) => {
      if (result.isFile()) {
        const parts = path.parse(fullFilePath);
        console.log(
          `${parts.name} - ${parts.ext.replace('.', '')} - ${result.size}b`,
        );
      }
    });
  }
});
