const fs = require('fs/promises');
const path = require('path');


let folderInt = path.join(__dirname, 'files');
let folderTo = path.join(__dirname, 'files-copy');

async function initFolder() {
  try {
    await fs.mkdir(folderTo);
    await copyFiles();
  } catch (err) {
    try {
      // console.log(folderTo);
      let files = await fs.readdir(folderTo);
      for (let file of files) {
        fs.unlink(path.join(folderTo, file));
      }
      await fs.rmdir(folderTo);
      await fs.mkdir(folderTo);
      await copyFiles();
    } catch {
      await fs.rmdir(folderTo);
      await fs.mkdir(folderTo);
      await copyFiles();
    }
  }

}

initFolder();

async function copyFiles() {
  let files = await fs.readdir(folderInt);
  for (let file of files) {
    fs.copyFile(path.join(folderInt, file), path.join(folderTo, file));
  }
}

