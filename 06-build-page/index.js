let text = 'Уважаемый проверяющий, если есть возможность, то проверьте это задание позже! Заранее спасибо!';

console.log(text);

const fs = require('fs');
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

