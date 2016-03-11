var createProbable = require('probable').createProbable;
var encounterTypes = require('./encounter-types');
var randomId = require('idmaker').randomId;
var callNextTick = require('call-next-tick');
// var Tablenest = require('tablenest');

// Returns a function that generates encounters (using shared state across calls).
function EncounterGenerator(createOpts) {
  var random; 

  if (createOpts) {
    random = createOpts.random;
  }

  var probable = createProbable({
    random: random
  });

  // var tablenest = Tablenest({
  //   random: random
  // });

  var typesTable = probable.createTableFromDef(encounterTypes);

  function generateEncounterForSpace(opts) {
    var space;

    if (opts) {
      space = opts.space;
    }

    // State common to the generation of all encounters, e.g.
    // Where you keep track of unique encounters.

    var generateOpts = {
      space: space
    };

    var encounter = generateEncounter(generateOpts);

    // Here's where you save notable stuff about the just-generated encounter for
    // future generation reference.

    return encounter;
  }

  return generateEncounterForSpace;


  function generateEncounter(opts) {
    var space;

    if (opts) {
      space = opts.space;
    }

    var encounterType = typesTable.roll();

    var encounter = {
      id: 'encounter-' + randomId(4),
      type: encounterType,
      go: go
    };

    return encounter;

    function go(error, response, playerGo) {
      // TODO: Get next thing in tree.
      var turnOpts = {
        itsOver: probable.roll(3) === 0,
        text: 'Something is happening',
        effects: [
          {
            id: 'something',
            text: 'lose 1 life!'
          },
          {
            id: 'somethingelse',
            text: 'gain 1 pie!'
          }
        ],
        choices: [
          {
            id: 'run',
            text: 'Run'
          },
          {
            id: 'talk',
            text: 'Talk'
          }
        ],
        go: go
      };
      callNextTick(playerGo, null, turnOpts, go);
    }
  }

  // function getDescriptionForEncounter(type) {
  //   var grammar = descriptionGrammarsForTypes[type];
  //   if (!grammar) {
  //     grammar = {
  //       root: {
  //         '0': 'A encounter.'
  //       }
  //     };
  //   }
  //   return tablenest(grammar).roll();
  // }
}

module.exports = EncounterGenerator;
