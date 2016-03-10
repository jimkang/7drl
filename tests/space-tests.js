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
    t.ok(space.type, 'Space has a type.');
    t.ok(space.description, 'Space has a description.');
    t.ok(space.encounterKey, 'Space has an encounterKey');
    t.equal(typeof space.hasExit, 'boolean', 'Space has hasExit.');
    t.equal(typeof space.hasEntrance, 'boolean', 'Space has hasEntrance.');

    console.log(JSON.stringify(space, null, '  '));
    t.end();
  }
}
