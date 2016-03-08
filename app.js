var Graph = require('../graph');
var randomgraph = require('randomgraph');

var graphData = randomgraph.WattsStrogatz.beta(40, 4, 0.2);

var graph = Graph({
  width: 960,
  height: 500
});

graph.render();
graph.renderUpdate(graphData.nodes, graphData.edges);
