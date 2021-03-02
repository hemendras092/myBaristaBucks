const express = require("express");
const bodyParser = require("body-parser");
require('./library.js')();
require("./dbconfig");

const app = express();


app.use(bodyParser.json({ limit: '1000mb', type: 'application/json' })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 50000 }));


var users = require('./users');
var items = require('./items');
var orders = require('./orders');
var suggestions = require('./suggestions');

app.use('/users', users);
app.use('/items', items);
app.use('/orders', orders);
app.use('/suggestions', suggestions);







app.listen(3131, function() {
    console.log('Listening to port:  ' + 3131);
});