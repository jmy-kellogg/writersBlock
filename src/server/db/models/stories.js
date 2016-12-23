'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('stories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    banner: {
    	type: Sequelize.STRING
    },
    content: {
    	type: Sequelize.TEXT
    }
});
