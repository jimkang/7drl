var Graph = require('./graph');
var GetNeighbors = require('./get-neighbors');
var findWhere = require('lodash.findwhere');

function renderGraphPane(opts) {
  var random;
  var nodes;
  var links;

  if (opts) {
    random = opts.random;
    nodes = opts.nodes;
    links = opts.links;    
  }

  var getNeighbors = GetNeighbors({
    nodes: nodes,
    links: links
  });

  var graph = Graph({
    width: 960,
    height: 550,
    random: random,
    canSelectNodeFromNode: canSelectNodeFromNode
  });

  graph.render();
  // Should this function be reentrant?
  graph.renderUpdate(nodes, links);

  function canSelectNodeFromNode(node, currentlySelectedNode) {
    if (!currentlySelectedNode) {
      return true;
    }
    var neighbors = getNeighbors(currentlySelectedNode.id);
    return neighbors && findWhere(neighbors, {id: node.id});
  }
}

module.exports = renderGraphPane;
