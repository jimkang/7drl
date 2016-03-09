var renderGraphPane = require('../render-graph-pane');
var generateRandomGraph = require('../generate-random-graph');
var seedrandom = require('../lib/seedrandom.min.js');

var random = seedrandom('test');

var graphData = generateRandomGraph({
  random: random
});

// console.log(JSON.stringify(graphData, null, '  '));

renderGraphPane({
  random: random,
  nodes: graphData.nodes,
  links: graphData.links
});
