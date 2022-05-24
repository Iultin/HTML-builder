const fs = require('fs');
const path = require('path');

let folderInt = path.join(__dirname, 'styles');
let folderTo = path.join(__dirname, 'project-dist');
let fileBundle = fs.createWriteStream(path.join(folderTo, 'bundle.css'));
let data;

async function createBundle() {
  await fs.readdir(folderInt, (err, files) => {
    if (err) console.log(err);
    for (let file of files) {
      if (path.extname(file) === '.css') {
        data = fs.createReadStream(path.resolve(folderInt, file));
        data.on('data', function (chunk) {
          fileBundle.write(chunk);
          // console.log(chunk);
        });
      }
    }

  });
  
}

createBundle();