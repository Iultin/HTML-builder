const fs = require('fs/promises');
const path = require('path');


let folder = path.join(__dirname, 'files1');

async function copyFiles() {
  // let ask = await fs.access(folder)
  // console.log(ask);
  await fs.mkdir(folder)
}

copyFiles();

// async function getFiles(pathToFolder) {
//   const dir = await fs.readdir(pathToFolder, { withFileTypes: true });
//   const files = await Promise.all(dir.map((dirent) => {
//     const result = path.resolve(pathToFolder, dirent.name);
//     return dirent.isDirectory() ? getFiles(result) : result;
//   }));
//   return Array.prototype.concat(...files);

// }


// async function showData() {
//   let files = await getFiles(folder);
//   for (let file of files) {
//     console.log(path.basename(file));
//   }
// }

// showData();
