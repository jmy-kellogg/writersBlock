'use strict';
const path = require('path');
const express = require('express');
var favicon = require('serve-favicon');

module.exports = function (app) {

    const root = app.getValue('projectRoot');


    const npmPath = path.join(root, './node_modules');
    const publicPath = path.join(root, './src/public');
    const browserPath = path.join(root, './src/browser');


    app.use(favicon(app.getValue('faviconPath')));
    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));

};