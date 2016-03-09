var renderGraphPane = require('./render-graph-pane');
var generateRandomGraph = require('./generate-random-graph');
var seedrandom = require('./lib/seedrandom.min.js');

var random = seedrandom('app');

var graphData = generateRandomGraph({
  random: random
});

renderGraphPane({
  random: random,
  nodes: graphData.nodes,
  links: graphData.links
});
