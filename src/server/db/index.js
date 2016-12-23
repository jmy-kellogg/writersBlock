'use strict';
var db = require('./_db');
module.exports = db;

// require model below
var Users = require('./models/users');
var Stories = require('./models/stories');
var Characters = require('./models/characters');
var Chapters = require('./models/chapters')

// add association here;
//e.g. User.hasMany(Reports);
Users.hasMany(Stories);
Stories.hasMany(Characters);
Stories.hasMany(Chapters);