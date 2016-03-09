var Graph = require('../graph');
var seedrandom = require('../lib/seedrandom.min.js');
var randomId = require('idmaker').randomId;
var GetNeighbors = require('../get-neighbors');
var findWhere = require('lodash.findwhere');

var random = seedrandom('test');

var randomgraph = require('randomgraph')({
  random: random
});

var graphData = randomgraph.WattsStrogatz.beta(30, 4, 0.2);
graphData.nodes.forEach(setNodeId);

// console.log(JSON.stringify(graphData, null, '  '));

var getNeighbors = GetNeighbors({
  nodes: graphData.nodes,
  links: graphData.edges
});

var graph = Graph({
  width: 960,
  height: 550,
  random: random,
  canSelectNodeFromNode: canSelectNodeFromNode
});

graph.render();
graph.renderUpdate(graphData.nodes, graphData.edges);

function setNodeId(node) {
  node.id = randomId(4);
}

function canSelectNodeFromNode(node, currentlySelectedNode) {
  if (!currentlySelectedNode) {
    return true;
  }
  var neighbors = getNeighbors(currentlySelectedNode.id);
  return neighbors && findWhere(neighbors, {id: node.id});
}
