'use strict';

const Promise = require('bluebird');
const router = require('express').Router();

module.exports = router;

const db = require('../db');
const Chapters = db.model('chapters');


router.get('/', function(req, res, next, id) {
    Chapters.findAll({
    	where:{
    		storyId: id
    	}
    })
    .then(chapters =>  res.json(chapters))
    .catch(next)
})
