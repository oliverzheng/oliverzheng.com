var fs = require('fs');

var handlebars = require('handlebars');
var handlebarsIntl = require('handlebars-intl');
handlebarsIntl.registerWith(handlebars);

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var dateFormatter = require('metalsmith-date-formatter');
var paths = require('metalsmith-paths');
var rootpath = require('metalsmith-rootpath');
var permalinks = require('metalsmith-permalinks');
var layouts = require('metalsmith-layouts');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var feed = require('metalsmith-feed');
var contenthash = require('metalsmith-contenthash');

var hideCollections = require('./plugins/hideCollections');

Metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Oliver Zheng',
      url: 'http://oliverzheng.com',
      author: 'Oliver Zheng',
      description: 'A collection of projects and thoughts on software and the stech industry.',
    },
  })
  .use(rootpath())
  .use(collections({
    posts: {
      pattern: 'articles/*.md',
      sortBy: 'date',
      reverse: true
    },
    root: {
      pattern: '*.md',
    }
  }))
  .use(markdown())
  .use(paths())
  .use(permalinks({
    date: 'YYYY',
    linksets: [{
      match: { collection: 'posts' },
      pattern: ':date/:title',
    }, {
      match: { collection: 'root' },
      pattern: ':title',
    }]
  }))
  .use(feed({
    collection: 'posts',
    destination: 'rss_feed.xml',
  }))
  .use(dateFormatter({
    dates: [
      {
        key: 'date',
        format: 'MMMM DD, YYYY'
      }
    ]
  }))
  .use(assets({
    source: './assets',
    destination: './assets',
  }))
  .use(contenthash())
  .use(layouts({
    engine: 'handlebars',
    partials: 'layouts/includes'
  }))
  .build(function(err) {
    if (err) throw err;
  });
