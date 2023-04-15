require('dotenv').config();
const app = require('./app');
require('./db');

async function main(){
  await app.listen(app.get('port'));
  console.log("Servidor en linea en puerto", app.get('port'));
}

main();

