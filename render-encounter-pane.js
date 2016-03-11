var d3 = require('d3-selection');
var accessor = require('accessor');
var recycleElement = require('./recycle-element');
var getId = accessor();
var getText = accessor('text');

function renderEncounterPane(opts) {
  var root;
  var encounter;
  var turn;
  var onChoiceClicked;

  if (opts) {
    root = opts.root;
    encounter = opts.encounter;
    turn = opts.turn;
    onChoiceClicked = opts.onChoiceClicked;
  }

  var rootSel = d3.select(root);

  var encounterSel = recycleElement(rootSel, 'encounter-pane', 'div');
  encounterSel.attr('id', encounter.id);

  recycleElement(encounterSel, 'title', 'div').text(encounter.type);
  recycleElement(encounterSel, 'encounter-text', 'div').text(turn.text);

  renderList(turn.effects, encounterSel, 'encounter-effects', 'encounter-effect');
  renderList(
    turn.choices, encounterSel, 'encounter-choices', 'encounter-choice',
    onChoiceClicked
  );

  return encounterSel;
}

function renderList(list, parentSel, rootClass, itemClass, itemClickResponder) {
  var rootSel;

  if (list) {
    rootSel = recycleElement(parentSel, rootClass, 'ul');
    var update = rootSel.selectAll('.' + itemClass).data(list, getId);
    update.exit().remove();
    var enter = update.enter()
      .append('li')
        .classed(itemClass, true);

    if (itemClickResponder) {
      enter.on('click', itemClickResponder);
    }

    enter.merge(update).text(getText);
  }
  else {
    parentSel.select('.' + rootClass).remove();
  }
  return rootSel;
}

module.exports = renderEncounterPane;
