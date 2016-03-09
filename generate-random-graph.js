var randomId = require('idmaker').randomId;

function generateRandomGraph(opts) {
  var random;

  if (opts) {
    random = opts.random;
  }
  
  var randomgraph = require('randomgraph')({
    random: random
  });

  var graphData = randomgraph.WattsStrogatz.beta(30, 4, 0.2);
  graphData.nodes.forEach(setNodeId);

  return {
    nodes: graphData.nodes,
    links: graphData.edges
  };
}

function setNodeId(node) {
  node.id = randomId(4);
}

module.exports = generateRandomGraph;
