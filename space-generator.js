var GetNeighbors = require('./get-neighbors');
var createProbable = require('probable').createProbable;
var spaceTypes = require('./space-types');

// Returns a function that generates spaces (using shared state across calls).
function SpaceGenerator(createOpts) {
  var random; 

  if (createOpts) {
    random = createOpts.random;
  }

  var probable = createProbable({
    random: random
  });

  var typesTable = probable.createTableFromDef(spaceTypes);

  var numberOfExits = 0;
  var numberOfEntrances = 0;

  function generateSpaceForNode(opts) {
    var node;
    var nodes;
    var links;

    if (opts) {
      node = opts.node;
      nodes = opts.nodes;
      links = opts.links;
    }

    var getNeighbors = GetNeighbors({
      nodes: nodes,
      links: links
    });

    var generateOpts = {
      node: node,
      neighborNodes: getNeighbors(node.id),
      typesTable: typesTable,
      makeEntrance: numberOfEntrances === 0 && probable.roll(15) === 0
    };

    if (!generateOpts.makeEntrance) {
      generateOpts.makeExit = numberOfExits === 0 && probable.roll(15) === 0;
    }

    var space = generateSpace(generateOpts);

    if (space.hasExit) {
      numberOfExits += 1;
    }
    if (space.hasEntrance) {
      numberOfEntrances += 1;
    }

    return space;
  }

  return generateSpaceForNode;
}

function generateSpace(opts) {
  var node;
  var neighborNodes;
  var makeExit;
  var makeEntrance;
  var typesTable;

  if (opts) {
    node = opts.node;
    neighborNodes = opts.neighborNodes;
    makeExit = opts.makeExit;
    makeEntrance = opts.makeEntrance;
    typesTable = opts.typesTable;
  }

  var space = {
    type: typesTable.roll(),
    description: 'Hey, this is a space.',
    encounterKey: 'main-deck',
    hasExit: makeExit || false,
    hasEntrance: makeEntrance || false
  };

  return space;
}

module.exports = SpaceGenerator;
