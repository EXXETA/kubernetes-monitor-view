/**
 * Package.json Version Updater
 * 
 * Usage: Run javascript file and pass version as parameter
 * Example:     node travis-version-updater.js VERSION
 *              node travis-version-updater.js 1.0.0
 */

var fs = require('fs');
var fileName = './package.json';


if (fs.existsSync(fileName)) {

  var file = require(fileName);
  var argv = process.argv;

  if (argv.length >= 2 && argv[2] !== undefined) {

    file.version = argv[2];

    fs.writeFile(fileName, JSON.stringify(file, null, 2), function (err) {

      if (err) {
        console.log(err);
      } else {
        console.log("package.json version updated to " + argv[2])
      }
    });
  } else {
    console.log("Please pass version as parameter!");
  }
} else {
  console.error("Cannot find package.json");
}
