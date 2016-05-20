// stáhnout a spustit příkazem: node har-filter.node.js
// node.js > 4.0.0

var fs = require('fs');

fs.readFile('dip.tex', 'utf8', function (err, txt) {
    if (err) {
        return console.log(err);
    }


    txt = txt.replace('\\textbackslash{}begin\\{introduction\\}', '\\begin{introduction}');
    txt = txt.replace('\\textbackslash{}end\\{introduction\\}', '\\end{introduction}');


    txt = txt.replace(/\\textsuperscript\{\\href\{\}\{\{\[\}[a-z]+\{\]\}\}\\href\{\}\{\{\[\}[a-z]+\{\]\}\}\}/g, ''); //remove
    txt = txt.replace(/\\textsuperscript\{\\href\{\}\{\{\[\}[a-z]+\{\]\}\}\}/g, ''); //remove


    txt = txt.replace(/\\textsuperscript\{\\href\{\}\{\{\[\}([0-9]+)\{\]\}\}\}/g, '\\cite{zdroj$1}');


    // \textbackslash{}footnote\{anglicky Business Intelligence\}
    txt = txt.replace(/\\textbackslash\{\}footnote\\\{([\s\S]+?)\\\}/g, '\\footnote{$1}');


    //``příští velká věc''

    //TODO
    txt = txt.replace(/``([\s\S]+?)''/g, '\\uv{$1}');


    //TODO
    //  role:Toilets=B;3


    //  \begin{center}\rule{0.5\linewidth}{\linethickness}\end{center}
    txt = txt.replace(/\\begin\{center\}\\rule\{0\.5\\linewidth\}\{\\linethickness\}\\end\{center\}/g, '');



    txt = txt.replace(/(\\chapter|\\(sub)*section)\{[.0-9]+ /g, '$1{');

    txt = txt.replace(/([*_:\/\\0-9a-z]{3,}=[*_:\/0-9a-z]+)/g, '\\texttt{$1}');



    txt = txt.replace(/\\tightlist/g, '');




    // \chapter{Závěr}\label{zuxe1vux11br}
    txt = txt.replace(/\\chapter\{Závěr\}\\label\{zuxe1vux11br\}/g, '\\begin{conclusion}');
    txt = txt.replace(/\\chapter\{Přílohy:\}[\s\S]+$/g, '\\end{conclusion}');


    //\href{}{wiki.osm.org/Simple\_Indoor\_Tagging}
    txt = txt.replace(/\\href\{\}\{(https?:\/\/)(.+?)\}/g, '\\href{$1$2}{$2}');
    txt = txt.replace(/\\href\{\}\{(.+?)\}/g, '\\href{http://$1}{$1}');


    txt = txt.replace('href{http://api.openstreetmap.org/api/0.6/map?\\texttt{bbox=14}{api.openstreetmap.org/api/0.6/map?\\texttt{bbox=14}',
                      'href{http://api.openstreetmap.org/api/0.6/map?bbox=14.304,50.099,14.306,50.1}{api.openstreetmap.org/api/0.6/map?bbox=14');
    txt = txt.replace('var~features =~tree.intersects(iD.geo.Extent({[}0, 0{]}, {[}2, 2{]}), tree.graph());', `
\\texttt{var features = tree.intersects(iD.geo.Extent([0, 0], [2, 2]), tree.graph());}`);
    //txt = txt.replace(/\\\{+/g, '\\end{conclusion}');





    var img = `1a-orientacni-fsv.jpg
1b-orientacni-fel.jpg
1c-orientacni-fa.png
210-coreindoor-cvut-13.png
211-osmb.png
21a-Osmdbstats1_log.png
21b-Osmdbstats4A.png
22-osm-xml-ex.pdf
23-editor-josm.png
24-editor-potlatch2.png
25-editor-id.png
26a-Indoor_steps1.png
26b-Indoor_relations.png
27-IndoorOSM-General.png
28a-simple_poi.png
28b_elements.png
29a-nase-levelrepe.pdf
29b-nase-desetiny-level.pdf
2a-gmaps-moa.png
2b-gmaps-moa-1-indoor.png
2c-gmaps-moa-2.png
31-id-graph.png
32-id-navrh-ui-1.png
33-id-iterace-2.png
34a-id-iterace-3-4-kladne.png
34b-id-iterace-3-4-patro-zaporne.png
35-pull-req-comment.png
3a-apple-san-fran.png
3b-apple-moa.png
41a.png
41b.png
41c.png
42-osmbuilding-indoor-upraveny.png
43a.png
43b.png
43c.png
43d.png
4a-bing-moa-1.png
4b-bing-moa-1-indoor.png
4c-bing-moa-2.png
5a-micello1i2.png
5b-micellob0.png
5c-micellob1.png
6a-anyplace-webeditor.png
6b-anyplace-viewer-andel.png
6c-anyplace-logger.png
7a-codrops-3d.png
7b-codrops-2.png
8-google-tango.png`;

    img = img.split(/\n/);
    im = {}
    img.forEach(i => {
        var x = i.split(/[.-]/);

        im[x[0]] = i; })



    //Obrázek32: První návrh uživatelského rozhraní včetně popisu interakcí



    txt = txt.replace(/Obrázek([0-9]+)([a-z]*): (.+)/g, (m, id, pis, text) => {


            //console.log(path);

            if (pis) {


                var casti = [];
                for (var px in pis.split('')){
                    var p = pis[px];
                    var path = im[id+p];

                    casti.push(`
                    \\subfloat[\\label{obr${id}${p}}]
                    {\\includegraphics[width=.3\\linewidth]{img/${path}}}`);
                }
                casti = casti.join('\\hfill')

                return `
                      \\begin{figure}
                    ${casti}

                    \\caption{${text}}
                    \\label{obr${id}}
                    \\end{figure}
                    `;

            }
            else {

                var path = im[id];

                return ` \\begin{figure}
	  \\centering
      \\includegraphics[width=\\textwidth]{img/${path}}
      \\caption{${text}}
      \\label{obr${id}}
  \\end{figure}`
            }

        });


    //txt = txt.replace(/\\\{+/g, '\\end{conclusion}');
    //txt = txt.replace(/\\\{+/g, '\\end{conclusion}');
    //txt = txt.replace(/\\\{+/g, '\\end{conclusion}');





    function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }


    fs.writeFile("../dip-out.tex", txt, function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Output saved texx");
    });

});

@ARTICLE {a7,
title  = ""Google Maps enters the indoor GPS market"",
    journal = ""Archinect news {[online]}"",
    month  = ""červen"",
    year   = ""2013"",
    note = ""[cit. 2015-10-31]"",
    url    = ""http://pandatron.cz/?2939&sitova_karta_s_fpga_xilinx_pro_1_a_10gbe""
    }"
