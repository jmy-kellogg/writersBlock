'use strict';

const Promise = require('bluebird');
const router = require('express').Router();

module.exports = router;

const db = require('../db');
const Characters = db.model('characters');


router.get('/', function(req, res, next, id) {
    Characters.findAll({
    	where:{
    		storyId: id
    	}
    })
    .then(chapters =>  res.json(chapters))
    .catch(next)
})
