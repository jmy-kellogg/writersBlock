'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('characters', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    discription: {
        type: Sequelize.STRING,
    },
});