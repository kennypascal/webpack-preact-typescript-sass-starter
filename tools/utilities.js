const package = require('../package.json');

getEnvironment = function() {
  return process.env ? (process.env.NODE_ENV ? process.env.NODE_ENV : 'development') : 'development';
};

getVersion = function() {
  return package.version ? package.version : '';
};

getName = function() {
  return package.name ? package.name : 'no-name';
};

getTitle = function() {
  return package.title ? package.title : 'no-title';
};

getAssetFilename = function(filename = '') {
  return (getName() != '' ? getName() + '-' : '') + (getVersion() != '' ? getVersion() + '-' : '') + filename;
};

getExtension = function(filename) {
  return filename.slice(-3);
};

removeExtension = function(filename) {
  return getExtension(filename).match(/(png|jpg|svg)(?:\W|$)/) ? filename.slice(0, -4) : filename;
};

module.exports = {
  // returns the package title
  getTitle: getTitle,

  // returns a string used to name index files
  getIndexName: getName,

  // returns the constucted file name for Javascript, CSS and asset files.
  getAssetFilename: getAssetFilename
};
