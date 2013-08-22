
/**
 * Module dependencies.
 */

var express = require('express');
var url = require('url');
var http = require('http');

var app = express.createServer();

app.use(express.cookieParser());
app.use(express.session({secret: 'twegrergq25y345y245y'}));

// function respondWithProxiedJSON(request, response, inURL) {
//   // parse the URL
//   var backendURL = url.parse(inURL, backendRequest);

//   // create a client to the given port and hostname
//   var backendClient = http.createClient(backendURL['port'] || 80, backendURL['hostname']);

//   // create a request to that client using method, path; supply host header with hostname
//   var backendRequest = backendClient.request(backendURL['method'] || 'GET', backendURL['pathname'], {'host': backendURL['hostname']});

//   // add a listener to the request...
//   backendRequest.addListener('response', function (backendResponse) {

//     // ...so that when the backend responds with a chunk, we write it to the frontend response
//     backendResponse.addListener('data', function(chunk) {
//       response.write(chunk, 'binary');
//     });

//     // ...and that when the backend closes, the frontend closes
//     backendResponse.addListener('end', function() {
//       response.end();
//     });

//     // kick it off by writing the head to the frontend response as soon as we get one from the backend response
//     response.writeHead(backendResponse.statusCode, backendResponse.headers);
//   });

//   // just in case there's a request payload, wire up so that frontend data chunks are sent to the backend
//   request.addListener('data', function(chunk) {
//     backendRequest.write(chunk, 'binary');
//   });

//   // just in case there's a request payload, wire up so that frontend request ENDs results in backend request END
//   request.addListener('end', function() {
//     backendRequest.end();
//   });
// };

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

// app.get('/commits/:user/:project', function(request, response) {
//   respondWithProxiedJSON(request, response, 'http://github.com/api/v2/json/commits/list/' + request.params.user +'/' + request.params.project + '/master');
// });

console.log("running");

app.listen(8080);
