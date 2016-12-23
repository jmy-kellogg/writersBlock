'use strict';

const Promise = require('bluebird');
const router = require('express').Router();

module.exports = router;

const db = require('../db');
const User = db.model('users');


router.get('/', function(req, res, next) {
    User.findAll()
    .then(users =>  res.json(users))
    .catch(next)
})

