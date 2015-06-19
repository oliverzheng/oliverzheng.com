var fs = require('fs');

var handlebars = require('handlebars');
var handlebarsIntl = require('handlebars-intl');
handlebarsIntl.registerWith(handlebars);

handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/includes/footer.html').toString());

var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var paths = require('metalsmith-paths');
var permalinks = require('metalsmith-permalinks');
var templates = require('metalsmith-templates');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');

Metalsmith(__dirname)
  .use(collections({
    articles: {
    }
  }))
  .use(markdown())
  .use(paths())
  .use(permalinks({
    pattern: ':collection/:title',
  }))
  .use(templates('handlebars'))
  .use(assets({
    source: './assets',
    destination: './assets',
  }))
  .build(function(err) {
    if (err) throw err;
  });
