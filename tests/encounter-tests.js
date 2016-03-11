var test = require('tape')//.test;
var EncounterGenerator = require('../encounter-generator');
var seedrandom = require('../lib/seedrandom.min.js');
var callNextTick = require('call-next-tick');
require('longjohn');

var random = seedrandom('encounter-test');

var generateEncounter = EncounterGenerator({
  random: random
});

var mockSpaces = [
  {
    id: 'space-a',
    type: 'bogs'
  }
]

mockSpaces.forEach(runTest);

function runTest(space) {
  test('Encounter test', encounterTest);

  function encounterTest(t) {
    var encounter = generateEncounter({
      space: space
    });

    t.ok(encounter.id, 'Encounter has an id.');
    t.ok(encounter.introText, 'Encounter has introText.');
    t.ok(['guy', 'event', 'item'].indexOf(encounter.type) !== -1, 'Encounter has a type.');
    t.equal(typeof encounter.go, 'function', 'Encounter has a go function.');

    console.log(JSON.stringify(encounter, null, '  '));

    encounter.go(null, null, checkGo);

    function checkGo(error, opts, done) {
      t.ok(!error, 'No error from go.');
      t.equal(typeof opts.itsOver, 'boolean', 'Go tells you if it\'s over.');
      if (opts.itsOver) {
        t.pass('Encounter ends.');
        t.end();
      }
      else {
        t.ok(opts.text, 'Go gives you text.');

        var response = {};

        if (opts.effects) {
          t.ok(Array.isArray(opts.effects), 'If go gives effects, it is in an array.');
        }
        if (opts.choices) {
          t.ok(Array.isArray(opts.choices), 'If go gives choices, it is in an array.');
          response.choice = opts.choices[0];
        }

        callNextTick(done, null, response, checkGo);
      }
    }
  }
}
