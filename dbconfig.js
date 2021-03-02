
const Medoo = require('medoo');
const Setting = {
    host: 'localhost',
    port: 3306,
    database: 'coffeeshop',
    user: 'root',
    password: 'hem@123',
    debug_mode: true
}
let medoo = new Medoo(Setting);

async function main() {
    await medoo.setup();
}

 main();


 module.exports = medoo;