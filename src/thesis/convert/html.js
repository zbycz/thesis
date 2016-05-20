// stáhnout a spustit příkazem: node har-filter.node.js
// node.js > 4.0.0

var fs = require('fs');

fs.readFile('dip.html', 'utf8', function (err, txt) {
  if (err) {
    return console.log(err);
  }


	//txt = txt.replace(/<span class="c4">(.+?)<\/span>/g, '<b>$1</b>');



	txt = txt.replace(new RegExp('</?(font|span|div|o:p)[^>]*>','ig'), ''); //remove
	txt = txt.replace(new RegExp('<([a-z0-9]+)[^>]*>','ig'), '<$1>'); //remove attrs

	txt = txt.replace(new RegExp('[ \t\n\r ]+','ig'), ' '); //remove all whitespace (&#0160)
	txt = txt.replace(new RegExp('(^ +| +$)','ig'), ''); //start/end file
	txt = txt.replace(new RegExp('> <','ig'), '><');
	txt = txt.replace(new RegExp('</(p|h\\d|td|li)>','ig'), '$&\n'); //new lines
	txt = txt.replace(new RegExp('</?(table|tr|ol|ul)>','ig'), '\n$&\n');


	txt = txt.replace(new RegExp('<b></b>','ig'), '');
	txt = txt.replace(new RegExp('<p></p>','ig'), '');


	console.log(txt.length);

	txt = txt.replace(/[\s\S]+<p>\\begin\{introduction\}<\/p>/, '\\begin{introduction}');

	console.log(txt.length);



	//txt = txt.replace(new RegExp('(<(p|td|h\d|li)[^>]*>)[ \t\r\n]*','ig'), '$1');
	//txt = txt.replace(new RegExp('[ \t\r\n]*(</(p|td|h\d|li)[^>]*>)[ \t\r\n]*','ig'), '$1');




	fs.writeFile("dip-out.html", txt, function(err) {
	    if(err) {
	        return console.log(err);
	    }

	    console.log("Output saved html");
	});

});
