const fs = require('fs');
const path = require('path');

let data = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8');
  
data.on('data', function(chunk) {
  console.log(chunk);
});
