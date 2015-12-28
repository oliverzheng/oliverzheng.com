var fs = require('fs');

var handlebars = require('handlebars');
var handlebarsIntl = require('handlebars-intl');
handlebarsIntl.registerWith(handlebars);

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var paths = require('metalsmith-paths');
var rootpath = require('metalsmith-rootpath');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');

var hideCollections = require('./plugins/hideCollections');

Metalsmith(__dirname)
  .use(rootpath())
  .use(collections({
    articles: {
      pattern: 'articles/*.md'
    },
    projects: {
      pattern: 'projects/*.md'
    },
    all: {
      pattern: '*/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown())
  .use(paths())
  .use(permalinks({
    pattern: ':title',
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'layouts/includes'
  }))
  .use(assets({
    source: './assets',
    destination: './assets',
  }))
  .use(hideCollections(['projects']))
  .build(function(err) {
    if (err) throw err;
  });
