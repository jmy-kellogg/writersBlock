'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('stories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    banner: {
    	type: Sequelize.STRING
    },
    summary: {
        type: Sequelize.TEXT
    },
    content: {
    	type: Sequelize.TEXT
    }
});
