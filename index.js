'use strict';

const path = require('path');
const express = require('express');
const app = express();
const stylus = require('stylus');
const nib = require('nib');
const port = 3700;

app.set('views', __dirname + '/tpl');
app.set('view engine', 'pug');
app.engine('pug', require('pug').__express);

function compile(str, path) {
	return stylus(str)
		.set('filename', path)
		.use(nib())
		.import('nib');
}

app.use(stylus.middleware({
	src: './stylus',
	dest: './public/estilo',
	compile: compile
}));

app.use(express.static(__dirname + '/public'));

const io = require('socket.io').listen(app.listen(port));
console.log('Listening on port ' + port);

io.sockets.on('connection', function(socket){
	socket.emit('message', {message: 'Welcome to the chat'});
	socket.on('send', function(data){
		io.sockets.emit('message', data);
	});
});

app.get('/', function(req, res){
	res.render('index');
});
