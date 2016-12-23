'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('chapters', {
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
    },
    synopsis: {
        type: Sequelize.STRING,
    },
});