var Graph = require('../graph');
var seedrandom = require('../lib/seedrandom.min.js');
var randomId = require('idmaker').randomId;

var random = seedrandom('test');

var randomgraph = require('randomgraph')({
  random: random
});

var graphData = randomgraph.WattsStrogatz.beta(40, 4, 0.2);
graphData.nodes.forEach(setNodeId);

console.log(JSON.stringify(graphData, null, '  '));

var graph = Graph({
  width: 960,
  height: 550,
  random: random
});

graph.render();
graph.renderUpdate(graphData.nodes, graphData.edges);

function setNodeId(node) {
  node.id = randomId(4);
}
