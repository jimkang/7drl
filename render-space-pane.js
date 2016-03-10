// var Graph = require('./graph');
// var GetNeighbors = require('./get-neighbors');
// var findWhere = require('lodash.findwhere');
var d3 = require('d3-selection');
var accessor = require('accessor');

var getId = accessor();

function renderSpacePane(opts) {
  var root;
  var space;

  if (opts) {
    root = opts.root;
    space = opts.space;
  }

  var rootSel = d3.select(root);
  var spaceSel = recycleElement(rootSel, 'space-pane', 'div');
  spaceSel.attr('id', space.id);

  recycleElement(spaceSel, 'title', 'div').text(space.type);
  recycleElement(spaceSel, 'description', 'div').text(space.description);
  if (space.hasExit) {
    recycleElement(spaceSel, 'exit-note', 'div').text('This is an exit.');
  }
  else {
    spaceSel.select('.exit-note').remove();
  }

  return spaceSel;
}

function recycleElement(rootSel, className, tag) {
  var sel = rootSel.select('.' + className);
  if (sel.empty()) {
    sel = rootSel.append(tag).classed(className, true);
  }
  return sel;
}

module.exports = renderSpacePane;
