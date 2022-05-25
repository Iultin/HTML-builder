let text = `Уважаемый проверяющий, если есть возможность, то проверьте это задание позже! 
Сегодня после обеда.. 
Заранее спасибо!`;

console.log(text);

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

let folderInt = path.join(__dirname, 'assets');
let folderTo = path.join(__dirname, 'project-dist');

let cssInt = path.join(__dirname, 'styles');
let cssTo = path.join(__dirname, 'project-dist');
// let cssBundle = fs.createWriteStream(path.join(cssTo, 'style.css'));
let cssBundle;
let htmlInt = path.join(__dirname, 'components');
let htmlTo = path.join(__dirname, 'project-dist');
// let htmlBundle = fs.createWriteStream(path.join(htmlTo, 'index.html'));
let htmlBundle;


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
    await fs.mkdir(folderTo, err => err);    // console.log(11);
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

async function createCSS() {
  let data;
  await fs.readdir(cssInt, (err, files) => {
    if (err) console.log(err);
    for (let file of files) {
      if (path.extname(file) === '.css') {
        data = fs.createReadStream(path.resolve(cssInt, file));
        data.on('data', function (chunk) {
          cssBundle.write(chunk);
          // console.log(chunk);
        });
      }
    }
  });
}


async function copyFiles(src, dest) {
  await fsPromises.rm(dest, { recursive: true, force: true });
  await fsPromises.mkdir(dest, { recursive: true });
  const files = await fsPromises.readdir(src, { withFileTypes: true });
  for (let file of files) {
    let pathInt = path.join(src, file.name);
    let pathTo = path.join(dest, file.name);
    if (file.isDirectory()) {
      await copyFiles(pathInt, pathTo);
    }
    else {
      await fsPromises.copyFile(pathInt, pathTo);
      cssBundle = await fs.createWriteStream(path.join(cssTo, 'style.css'));
      htmlBundle = fs.createWriteStream(path.join(htmlTo, 'index.html'));
      await createCSS();
    }
  }
}

initFolders();
copyFiles(folderInt, folderTo);

