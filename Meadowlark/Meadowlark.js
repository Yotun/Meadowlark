'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');

var fortune = require('./lib/fortune.js');

var app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('Index');
});

app.get('/about', function (req, res) {
    res.render('About', { fortune: fortune.getFortune() });
});

// пользовательская страница 404
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

// пользовательская страница 500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express запущен на http://localhost:' +
        app.get('port') + '; нажмите Ctrl+C для завершения.');
});