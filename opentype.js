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



			var fontSize = 70;
			var fontScale = 1 / font.unitsPerEm * fontSize;
			// Note that ascender / descender are bottom-up, so we need to flip (negate) them.
			var topY = -(font.ascender * fontScale);
			var bottomY = -(font.descender * fontScale);

			var pathObj = font.getPath(word, 0,60, fontSize);
			var pathData = pathObj.toPathData(1);
			var path = generateTag('path', {
				d: pathData,
			});

			


			var topLine = generateTag('line', {
					'x1':0,
					'y1':topY,
					'x2':1000,
					'y2':topY,
					'stroke-width':3,
					'stroke':'blue'
			});

			var zeroLine = generateTag('line', {
				'x1':0,
				'y1':0,
				'x2':1000,
				'y2':0,
				'stroke-width':3,
				'stroke':'green'
			});

			var bottomLine = generateTag('line', {
					'x1':0,
					'y1':bottomY,
					'x2':1000,
					'y2':bottomY,
					'stroke-width':3,
					'stroke':'red'
			});
			var svg = generateTag('svg', {
				'fill':'black',
				'stroke':'black',
				'stroke-width':0.1
			}, [path, zeroLine,topLine,bottomLine]);
			

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