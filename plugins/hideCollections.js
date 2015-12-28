module.exports = function plugin(collectionsToHide) {
  return function(files, metalsmith, done) {
    setImmediate(done);

    Object.keys(files).forEach(function(file) {
      var data = files[file];
      if (!data.collection) {
        return;
      }

      var includesHiddenCollection = data.collection.some(
        function(collection) {
          return collectionsToHide.indexOf(collection) !== -1;
        }
      );
      if (includesHiddenCollection) {
        delete files[file];
      }
    });
  };
}
