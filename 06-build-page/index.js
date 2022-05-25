let text = 'Уважаемый проверяющий, если есть возможность, то проверьте это задание позже! Заранее спасибо!';

console.log(text);

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

let folderInt = path.join(__dirname, 'assets');
let folderTo = path.join(__dirname, 'project-dist');

async function deleteFiles(folder) {
  // console.log(folder);
  await fs.readdir(folder, { withFileTypes: true }, (err, files) => {
    // console.log(files);
    // if (err) throw err;
    for (let file of files) {
      if (file.isFile()) fs.unlink(path.resolve(folder, file.name), err => err);
    }
  });
}

async function initFolders() {
  try {
    await fs.mkdir(folderTo, err => err);
    // console.log(11);
    try {
      await deleteFiles(folderTo);
    } catch (err) {
      // if (err) throw err;
    }
  } catch (err) {
    if (err) throw err;
    try {
      await deleteFiles(folderTo);
    } catch (err) {
      // if (err) throw err;
    }
  }
}
initFolders();

async function copyFiles(src, dest) {
  await fsPromises.rm(dest, {recursive: true, force: true});
  await fsPromises.mkdir(dest, {recursive: true});
  const files = await fsPromises.readdir(src, {withFileTypes: true});
  for (let file of files) {
    let pathInt = path.join(src, file.name);
    let pathTo = path.join(dest, file.name);
    if (file.isDirectory()) {
      await copyFiles(pathInt, pathTo);
    }
    else {
      await fsPromises.copyFile(pathInt, pathTo);
    }
  }
}

copyFiles(folderInt, folderTo);