'use strict';

const Promise = require('bluebird');
const router = require('express').Router();

module.exports = router;

const db = require('../db');
const Stories = db.model('stories');
//don't forget to add models here as you need them!

router.param('storyId', function(req, res, next, id) {
	Stories.findById(id)
	.then(function(story) {
		if (!story) {
      		const err = Error('story not found');
     		err.status = 404;
      		throw err
		} else {
    		req.story = story;
    		next();
    		return null;
		}
		next();
	})
	.catch(next);
})

router.get('/', function(req, res, next) {
    Stories.findAll()
    .then(stories => {res.json(stories)})
    .catch(next)
})

router.get('/:storyId', function (req, res) {
  res.json(req.story);
});

router.post('/', function(req, res, next){
  Stories.create(req.body)
  .then(function(story) {
    res.json(story);
  })
  .catch(next);
})

router.post('/:storyId', function(req, res, next){
  
})
