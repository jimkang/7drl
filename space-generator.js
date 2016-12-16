var GetNeighbors = require('./get-neighbors');
var createProbable = require('probable').createProbable;
var spaceTypes = require('./space-types');
var randomId = require('idmaker').randomId;
var Tablenest = require('tablenest');

var descriptionGrammarsForTypes = {
  'bogs': require('./descriptions/bogs-grammar'),
  'woods': require('./descriptions/woods-grammar'),
  'hills': require('./descriptions/hills-grammar'),
  'plains': require('./descriptions/plains-grammar'),
  'mountain': require('./descriptions/mountain-grammar'),
  'village': require('./descriptions/village-grammar'),
  'city': require('./descriptions/city-grammar'),
  'crags': require('./descriptions/crags-grammar'),
  'beach': require('./descriptions/beach-grammar')
};

// Returns a function that generates spaces (using shared state across calls).
function SpaceGenerator(createOpts) {
  var random; 

  if (createOpts) {
    random = createOpts.random;
  }

  var probable = createProbable({
    random: random
  });

  var tablenest = Tablenest({
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


  function generateSpace(opts) {
    var node;
    var neighborNodes;
    var makeExit;
    var makeEntrance;

    if (opts) {
      node = opts.node;
      neighborNodes = opts.neighborNodes;
      makeExit = opts.makeExit;
      makeEntrance = opts.makeEntrance;
    }

    var spaceType = typesTable.roll();

    var space = {
      id: 'space-' + randomId(4),
      type: spaceType,
      description: getDescriptionForSpace(spaceType),
      encounterKey: 'main-deck',
      hasExit: makeExit || false,
      hasEntrance: makeEntrance || false,
      keyColor: 'hsl(' + probable.roll(360) + ', 50%, 50%)',
      elevation: probable.roll(100) * -1
    };

    return space;
  }

  function getDescriptionForSpace(type) {
    var grammar = descriptionGrammarsForTypes[type];
    if (!grammar) {
      grammar = {
        root: {
          '0': 'A space.'
        }
      };
    }
    return tablenest(grammar).roll();
  }
}

module.exports = SpaceGenerator;
