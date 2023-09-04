const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');


function print (a) {
   process.stdout.write(a)
   process.stdout.write("\nprompt > ")
}


function bash() {
   process.stdout.write("prompt > ")
   process.stdin.on("data", function(data) {
      const args = data.toString().trim();
      const cmd = args.split(" ")[0];
      const commandsFunction = commands[cmd];
      if(commandsFunction) {
         commands[cmd](print, args);
      } else {
         print(`command not found: ${cmd}`)
      }
      
   })

}

bash();
module.exports = {
   print,
   bash,
};
