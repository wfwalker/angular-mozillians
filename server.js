
/**
 * Module dependencies.
 */

var express = require('express');
var url = require('url');
var http = require('http');
var https = require('https');
var apikey = require('./apikey-real');

var app = express.createServer();

app.use(express.cookieParser());
app.use(express.session({secret: 'twegrergq25y345y245y'}));

function respondWithProxiedJSON(request, response, inURL) {
  backendURL = url.parse(inURL);
  // parse the URL
  console.log(inURL);

  var options = {
    host: backendURL.hostname,
    headers: {accept: 'application/json, text/plain, */*'},
    path: backendURL.path,
    method: 'GET'
  };

  console.log("options");
  console.log(options);

  https.get(options, function(backendResponse) {
    console.log("statusCode: ", backendResponse.statusCode);
    console.log("headers: ", backendResponse.headers);   

    backendResponse.on('data', function(data) {
      console.log('data ' + data);
      response.send(data);
    });
  });

};

app.use("/client", express.static('client'));

app.get('/mozillians', function(request, response) {
	console.log("test " + request.session.test);
	if (request.session.test != 0) {
		request.session.test = request.session.test + 1
	} else {
		request.session.test = 0;
	}
	console.log("params " + request.params);
	console.log("test " + request.session.test);
	response.setHeader('Content-Type', 'application/json');
	fakeResponse = {};
	fakeResponse['meta'] = { total_count: 2 };
	fakeResponse['objects'] = [{name: 'bill', email: 'bill@bill.com'}, {name: 'john', email: 'john@john.com'}]
	response.send(JSON.stringify(fakeResponse));
});

app.get('/realmozillians', function(request, response) {
	var searchStem = 'https://mozillians.org/api/v1/users/?&limit=500&format=json&app_name=' + apikey.getAPIAppName() + '&app_key=' + apikey.getAPIKey();
	var searchURL = searchStem + '&city=brighton';
  console.log(searchURL);
	respondWithProxiedJSON(request, response, searchURL);
});

console.log("running");

app.listen(8080);
