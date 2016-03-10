var generateRandomGraph = require('./generate-random-graph');
var SpaceGenerator = require('./space-generator');
var renderGraphPane = require('./render-graph-pane');
var renderSpacePane = require('./render-space-pane');
var seedrandom = require('./lib/seedrandom.min.js');

var random = seedrandom('app');

var graphData = generateRandomGraph({
  random: random
});

var generateSpaceForNode = SpaceGenerator({
  random: random
});

graphData.nodes.forEach(generateSpace);
document.addEventListener('node-selected', respondToNodeSelection);

renderGraphPane({
  random: random,
  nodes: graphData.nodes,
  links: graphData.links
});

function generateSpace(node) {
  var space = generateSpaceForNode({
    node: node,
    nodes: graphData.nodes,
    links: graphData.links
  });
  node.space = space;
}

function respondToNodeSelection(e) {
  renderSpacePane({
    root: document.body,
    space: e.detail.space
  });
}
