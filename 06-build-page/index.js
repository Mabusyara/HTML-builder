/* eslint-disable prettier/prettier */
const fsPromises = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');

const projectPath = path.join(__dirname, 'project-dist');

function createNewFolder(where, name) {
  fsPromises.mkdir(path.join(where, name), { recursive: true });
}

async function replaceTemplateTags() {
  await fsPromises.copyFile(path.join(__dirname, 'template.html'), path.join(projectPath, 'index.html'));
  let newHtml = await fsPromises.readFile(path.join(projectPath, 'index.html'), 'utf-8');
  const files = await fsPromises.readdir(path.join(__dirname, 'components'));
  for (const file of files) {
    await fsPromises.readFile(path.join(__dirname, 'components', file), 'utf-8').then((data) => {
      newHtml = newHtml.toString().replaceAll(`{{${path.basename(file, '.html')}}}`, data.toString());
    });
  }
  await fsPromises.writeFile(path.join(projectPath, 'index.html'), newHtml);
}

async function mergeStyles () {
  await fsPromises.writeFile(path.join(projectPath, 'style.css'), '');
  const cssArray = [];
  const files = await fsPromises.readdir(path.join(__dirname, 'styles'));
  for (const file of files) {
    const stats = await fsPromises.stat(path.join(__dirname, 'styles', file));
    if (stats.isFile() && path.extname(file) === '.css') {
      const temp = await fsPromises.readFile(path.join(__dirname, 'styles', file), 'utf-8');
      cssArray.push(temp.toString());
    }
  }
  for (const data of cssArray) {
    await fsPromises.appendFile(path.join(projectPath, 'style.css'), data);
  }
}

createNewFolder(__dirname, 'project-dist');
// createNewFolder(projectPath, 'assets');
// createNewFolder(path.join(projectPath, 'assets'), 'fonts');
// createNewFolder(path.join(projectPath, 'assets'), 'img');
// createNewFolder(path.join(projectPath, 'assets'), 'svg');
replaceTemplateTags();
mergeStyles();
