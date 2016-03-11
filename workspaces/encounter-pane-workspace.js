var renderEncounterPane = require('../render-encounter-pane');
var seedrandom = require('../lib/seedrandom.min.js');
var EncounterGenerator = require('../encounter-generator');
var StrokeRouter= require('strokerouter');
var createProbable = require('probable').createProbable;
var spaceTypes = require('../space-types');

var random = seedrandom('test');
var probable = createProbable({
  random: random
});

var mockSpaces = [];

for (var i = 0; i < 20; ++i) {
  mockSpaces.push(makeMockSpace(i));
}

function makeMockSpace(i) {
  return {
    id: 'space-' + i,
    type: probable.pickFromArray(spaceTypes)
  };
}

var generateEncounter = EncounterGenerator({
  random: random
});

var encounters = mockSpaces.map(generateEncounter);

function renderEncounterAtIndex(i) {
  var encounter = encounters[i];
  encounter.go(null, null, runRender);

  function runRender(error, turn) {
    if (error) {
      console.log(error);
    }
    else {
      renderEncounterPane({
        root: document.body,
        encounter: encounter,
        turn: turn,
        onChoiceClicked: onChoiceClicked
      });
    }
  }

  function onChoiceClicked(choice) {
    var response = {
      choice: choice.id
    };
    encounter.go(null, response, runRender);
  }
}

var encounterIndex = 0;
var strokeRouter = StrokeRouter(document);
strokeRouter.routeKeyUp('rightArrow', null, renderNextEncounter);
strokeRouter.routeKeyUp('leftArrow', null, renderPrevEncounter);

function renderNextEncounter() {
  encounterIndex += 1;
  if (encounterIndex >= encounters.length) {
    encounterIndex = 0;
  }
  renderEncounterAtIndex(encounterIndex);
}

function renderPrevEncounter() {
  encounterIndex -= 1;
  if (encounterIndex < 0) {
    encounterIndex = encounters.length - 1;
  }
  renderEncounterAtIndex(encounterIndex);
}

renderEncounterAtIndex(encounterIndex);
