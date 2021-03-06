'use strict';

require('babel-register');
const chalk = require('chalk');
const db = require('./db');
const server = require('http').createServer();

const createApplication = function () {
    const app = require('./app.js')(db);
    server.on('request', app);
    require('./io')(server);
};

const startServer = function () {
    const PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });
};

db.sync()
.then(createApplication)
.then(startServer)
.catch(function (err) {
    console.error(chalk.red(err.stack));
});