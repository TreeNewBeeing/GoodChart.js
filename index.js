var express = require("express")
var app = express();
app.use('/',express.static('public'));
// app.use('/',require('connect-history-api-fallback')())


// if (process.env.NODE_ENV !== 'production') {  
// 	var webpack = require('webpack');
// 	var webpackConfig = require('./webpack.config.js');
// 	var webpackCompiled = webpack(webpackConfig);

// 	var webpackDevMiddleware = require('webpack-dev-middleware');
// 	app.use(webpackDevMiddleware(webpackCompiled, {
// 	  	publicPath: "/",
// 		stats: {colors: true},
// 		lazy: false,
// 		watchOptions: {
// 		    aggregateTimeout: 300,
// 		    poll: true
// 		},
// 	}));

// 	var webpackHotMiddleware = require('webpack-hot-middleware');
// 	app.use(webpackHotMiddleware(webpackCompiled));
	
// }

var server = app.listen(2000,function(){
	var port = server.address().port;
	console.log('http://localhost:%s',port);
});


