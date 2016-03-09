var test = require('tape');
var SpaceGenerator = require('../space-generator');
var graphData = require('./fixtures/graph-data');
var seedrandom = require('../lib/seedrandom.min.js');

var random = seedrandom('space-test');

var generateSpaceForNode = SpaceGenerator({
  random: random
});

graphData.nodes.forEach(runTest);

function runTest(node, i) {
  test('Space test', spaceTest);

  function spaceTest(t) {
    // t.deepEqual(getNeighbors(node.id), expectedNeighbors[i], 'Correct neighbors returned.');
    var space = generateSpaceForNode({
      node: node,
      nodes: graphData.nodes,
      links: graphData.links
    });
    console.log(JSON.stringify(space, null, '  '));
    t.end();
  }
}
