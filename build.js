#!/usr/bin/env node

require('shelljs/global');
var concat = require('concat-files');
var fs = require('fs');

var polymerPath = __dirname + '/node_modules/Polymer/';
var polymerDest = __dirname + '/polymer.js';
var concatFiles = ['dist/polymer-micro.html', 'dist/polymer-mini.html', 'dist/polymer.html'];

// dirty, but works
exec('cd ' + polymerPath + ' && npm i && npm run build');

concatFiles = concatFiles.map(function(filePath) {
  return polymerPath + filePath;
});

concat(concatFiles, polymerDest, function() {
  fs.readFile(polymerDest, {
    encoding: 'utf8'
  }, function(err, content) {
    content = content.replace(/<\/?script>/gm, '');
    content = content.replace(/<link.*>/gm, '');

    // this leaves all license headers, as they are duplicated one could do more here
    content = content.replace(/<!--/gm, '/*');
    content = content.replace(/-->/gm, '*/');

    // properly export Polymer as CommonJS module
    var moduleHeader = 'if(typeof module === "undefined"){var module = {}};';
    moduleHeader += 'if(typeof module.exports === "undefined"){module.exports = {}};';

    // TODO: this might break at any time
    content += moduleHeader + 'module.exports = window.Polymer;';

    fs.writeFileSync(polymerDest, content);
  });
});
