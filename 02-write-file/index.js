const fs = require('fs');
const path = require('path');

const {stdin, stdout} = process;

let file = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Введите какой-нибудь текст и нажимайте клавишу Enter.\n');
stdout.write('Текст построчно запишется в файл text.txt\n');
stdout.write('По завершении ввода текста введите команду exit или нажмите Ctrl+C\n\n');


stdin.on('data', dat => {
  let text = dat.toString().trim();
  if (text == 'exit') process.exit();
  file.write(text);
  file.write('\n');
  process.on('SIGINT', () => process.exit());
});


process.on('exit', () => {
  file.end('\nЗапись завершена');
  stdout.write('\nФайл создан, запись завершена. Удачи в изучении Node.js!');
} ); 
  