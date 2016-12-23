'use strict';

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function (app, db) {

    const User = db.model('users');

    const twitterConfig = app.getValue('env').TWITTER;

    const twitterCredentials = {
        consumerKey: twitterConfig.consumerKey,
        consumerSecret: twitterConfig.consumerSecret,
        callbackUrl: twitterConfig.callbackUrl
    };

    const createNewUser = function (token, tokenSecret, profile) {
        return User.create({
            twitter_id: profile.id
        });
    };

    const verifyCallback = function (token, tokenSecret, profile, done) {

        User.findOne({
            where: {
                twitter_id: profile.id
            }
        }).exec()
            .then(function (user) {
                if (user) { // If a user with this twitter id already exists.
                    return user;
                } else { // If this twitter id has never been seen before and no user is attached.
                    return createNewUser(token, tokenSecret, profile);
                }
            })
            .then(function (user) {
                done(null, user);
            })
            .catch(function (err) {
                console.error('Error creating user from Twitter authentication', err);
                done(err);
            });

    };

    passport.use(new TwitterStrategy(twitterCredentials, verifyCallback));

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {failureRedirect: '/login'}),
        function (req, res) {
            res.redirect('/');
        });

};
