'use strict';


const chalk = require('chalk');
const db = require('./src/server/db');
const Users = db.model('users');
const Stories = db.model('stories');
const Chapters = db.model('chapters');
const Characters = db.model('characters');

const seedUsers = function() {

    let users = [
        { "first_name": "Emma", "last_name": "Puppy", "email": "emma@emma.emma", "password": "123" },
        { "first_name": "Deb", "last_name": "Cat", "email": "deb.deb.deb", "password": "123" },
        { "first_name": "Jessica", "last_name": "Wolf", "email": "jess@jess.jess", "password": "123" }
    ]


    let creatingUsers = users.map(function(userObj) {
        return Users.create(userObj);
    });

    return Promise.all(creatingUsers);

};
const seedStories = function() {

    let stories = [
        {title: 'Harry Potter', banner: 'http://orig04.deviantart.net/2bab/f/2011/170/3/f/harry_potter_hogwarts_banner_by_uprisen257-d3jcvxa.png', content:'Chapter One: ', userId: '1'},
        {title: 'Game of Thrones', userId: '2'},
        {title: 'Lord of the Rings', userId: '3'},
        {title: 'Percy Jackson', userId: '1'},
        {title: 'The Witching Hour', userId: '2'},
        {title: 'Things they Carried', userId: '3'},
        {title: 'Hunger Games', userId: '1'},
        {title: 'Interview with a Vampire', userId: '2'},
        {title: 'The Stand', userId: '3'}    
   
    
    ]


    let creatingStories = stories.map(function(storiesObj) {
        return Stories.create(storiesObj);
    });

    return Promise.all(creatingStories);

};

const seedChapters = function() {

    let chapters = [
        {number: 1, title: 'The boy who lived', synopsis: 'Harry is left on the door step of his aunt and uncle', storyId:'1'},
   
    ]

    let creatingChapters = chapters.map(function(chapterObj) {
        return Chapters.create(chapterObj);
    });

    return Promise.all(creatingChapters);

};

const seedCharacters = function() {

    let characters = [
        {name: 'Harry', discription: 'glasses lighting-bolt scar', storyId:'1'}   
    ]

    let creatingCharacters = characters.map(function(charactersObj) {
        return Characters.create(charactersObj);
    });

    return Promise.all(creatingCharacters);

};

db.sync({ force: true })
    .then(function() {
        return seedUsers();
    })
    .then(function() {
        return seedStories();
    })
    .then(function(){
        return seedChapters();
    })
    .then(function(){
        return seedCharacters();
    })
    .then(function() {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function(err) {
        console.error(chalk.red(err));
        process.exit(1);
    });