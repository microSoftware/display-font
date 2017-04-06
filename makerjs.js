var express = require('express');
var app = express();
var swig = require('swig');
var opentype = require('opentype.js')
var makerjs = require('makerjs');

app.get('/', function(req, res) {

	opentype.load('./fonts/galaxie_cassiopeia_bold.otf', function(err, font) {
		if (err) {
			console.log(err);
		} else {
			//input
			//these examples words work and don't work for this specific font.
			//word that don't work  : my word, "macbook","ozco"
			//words that don't work :okit, gras, Rock, Free
			var word = "aac";
			var fontSize = 39;
			var optionText = {
                letterSpacing: 0.1,
                kerning: true 
            };

            //generation of the model with makerjs
			var textModel = new makerjs.models.Text(font, word, fontSize, optionText);
			textModel.layer = "text";
			var options = {
				"text":{
					"fill":"#a4j3f4"
				}
			}

			var svg = makerjs.exporter.toSVG(textModel, options);

			paramsRenderingPage = {
				"svg": svg
			};

			var template = swig.renderFile('template.html', paramsRenderingPage);
			res.write(template);
			res.end();
		}
	});
});

var server = app.listen(8900, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Logo generator listening at http://localhost:8900');
});