const fs = require('fs');
const path = require('path');

const {stdin, stdout} = process;
stdout.write('Введите Ваше имя\n');
//stdin.on('data', data => stdout.write(data));

stdin.on('data', dat => {
  if (dat == 'exit') process.exit();
  stdout.write('Привет, ');
  stdout.write(dat);
  stdout.write('!');
  stdout.write('\n');
  process.on('SIGINT', handle);
});
process.on('exit', () => stdout.write('Удачи в изучении Node.js!'));