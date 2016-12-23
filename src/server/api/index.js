
'use strict';

const router = require('express').Router();
module.exports = router;

router.use('/users', require('./usersRoutes'));
router.use('/stories', require('./storiesRoutes'));
router.use('/chapters', require('./chaptersRoutes'));
router.use('/characters', require('./chaptersRoutes'));


router.use(function (req, res, next) {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
});