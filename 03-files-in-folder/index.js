const fs = require('fs/promises');
const path = require('path');
let fileName, fileExtname, fileSize;
let dot = '.';

let folder = path.join(__dirname, 'secret-folder');

async function getFiles(pathToFolder) {
  const files = await fs.readdir(pathToFolder, { withFileTypes: true });
  for (let file of files) {
    if (file.isFile()) {
      let pathToFile = path.resolve(__dirname, 'secret-folder', file.name);
      if (pathToFile.includes(dot)) {
        fileName = path.basename(pathToFile.split('.').slice(0, -1).join('.'));
      } else {
        fileName = path.basename(pathToFile);
      }
      fileExtname = path.extname(pathToFile).slice(1);
      let stats = await fs.stat(pathToFile);
      fileSize = stats['size'];
      console.log(fileName + ' - ' + fileExtname + ' - ' + fileSize);
    }
  }
}

getFiles(folder);



