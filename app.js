var generateRandomGraph = require('./generate-random-graph');
var SpaceGenerator = require('./space-generator');
var EncounterGenerator = require('./encounter-generator');
var renderGraphPane = require('./render-graph-pane');
var renderSpacePane = require('./render-space-pane');
var renderEncounterPane = require('./render-encounter-pane');
var seedrandom = require('./lib/seedrandom.min.js');

var sb = require('standard-bail')({
  log: console.log
});

var random = seedrandom('worgjuice');

var graphData = generateRandomGraph({
  random: random,
  numberOfNodes: 15
});

var generateSpaceForNode = SpaceGenerator({
  random: random
});

var generateEncounter = EncounterGenerator({ 
  random: random
});

graphData.nodes.map(generateSpace).map(addEncounterToSpace);

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
  return space;
}

function addEncounterToSpace(space) {
  space.encounter = generateEncounter(space);
}

function respondToNodeSelection(e) {
  var space = e.detail.space;

  var spaceSel = renderSpacePane({
    root: document.body,
    space: space
  });

  var encounterSel;

  if (space.encounter) {
    space.encounter.go(null, null, sb(renderTurn));
  }

  function renderTurn(turn) {
    if (turn.itsOver && encounterSel) {
      console.log('It\'s over!');
      encounterSel.remove();
    }
    else {
      encounterSel = renderEncounterPane({
        root: spaceSel.node(),
        encounter: space.encounter,
        turn: turn,
        onChoiceClicked: onChoiceClicked
      });
    }

    function onChoiceClicked(choice) {
      var response = {
        choice: choice.id
      };
      space.encounter.go(null, response, sb(renderTurn));
    }
  }
}
