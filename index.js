const express = require('express')
const app = express()
const parseString = require('xml2js').parseString;
const url = "http://www9.prefeitura.sp.gov.br/secretarias/sdte/pesquisa/feiras/services/feiras.xml"
const http = require('http');

app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public'))

function xmlToJson(url, request, response) {
	var req = http.get(url, function (res) {
		var xml = '';

		res.on('data', function (chunk) {
			xml += chunk;
		});

		res.on('error', function (e) {
			response.send(e);
		});

		res.on('timeout', function (e) {
			response.send(e);
		});

		res.on('end', function () {
			parseString(xml, function (err, result) {
				response.send(result);
			});
		});
	});
}

app.get('/feiras/', function (request, response) {
	xmlToJson(url, request, response);
})

app.get('/', function (request, response) {
	var result = 'App is running'
	response.send(result);
}).listen(app.get('port'), function () {
	console.log('App is running, server is listening on port ', app.get('port'));
});