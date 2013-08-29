
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
  console.log("query ");
  console.log(request.query);

  var querystring = '';

  for (var paramName in request.query) {
    querystring += '&' + paramName + '=' + request.query[paramName];
  }

  var options = {
    host: 'mozillians.org',
    headers: {accept: 'application/json, text/plain, */*'},
    path: 'https://mozillians.org/api/v1/users/?limit=500&format=json&app_name=' + apikey.getAPIAppName() + '&app_key=' + apikey.getAPIKey() + '&' + querystring,
    method: 'GET'
  };

  console.log("options");
  console.log(options);

  https.get(options, function(backendResponse) {
    console.log("statusCode: ", backendResponse.statusCode);
    console.log("headers: ", backendResponse.headers);   

     var data = [];
     backendResponse.on('data', function(chunk) {
       data.push(chunk);
     });
     backendResponse.on('end', function() {
       var result = JSON.parse(data.join(''))
       response.send(result);
     });
  });

});

console.log("running");

var myPort = process.env.PORT || 8080;
var mHost = process.env.VCAP_APP_HOST || "127.0.0.1";

app.listen(myPort);
