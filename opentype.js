var express = require('express');
var app = express();
var opentype = require('opentype.js')
var swig = require('swig');

app.get('/', function(req, res) {

	opentype.load('./fonts/bello_script.ttf', function(err, font) {
		if (err) {
			console.log(err);
		} else {
			var word = "My word";
			var pathObj = font.getPath(word, 0, 40, 40);
			var pathData = pathObj.toPathData(1);
			var path = generateTag('path', {
				d: pathData,
			});
			var svg = generateTag('svg', {}, path);
			paramsRenderingPage = {
				"svg": svg
			};

			var template = swig.renderFile('template.html', paramsRenderingPage);
			res.write(template);
			res.end();
		}
	});
});

var generateTag = function(nameTag, propertiesObj, insideTags) {
	var finalString = "<" + nameTag + " ";

	for (property in propertiesObj) {
		finalString += property + '="' + propertiesObj[property] + '" ';
	}

	finalString += ">";

	if (insideTags != undefined) {
		for (var i = 0; i < insideTags.length; i++) {
			finalString += insideTags[i];
		}

	}

	finalString += "</" + nameTag + ">";
	return finalString;
}


var server = app.listen(8900, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Logo generator listening at http://localhost:8900');
});