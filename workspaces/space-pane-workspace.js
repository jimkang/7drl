var renderSpacePane = require('../render-space-pane');
var generateRandomGraph = require('../generate-random-graph');
var seedrandom = require('../lib/seedrandom.min.js');
var SpaceGenerator = require('../space-generator');
var StrokeRouter= require('strokerouter');

var random = seedrandom('test');

var graphData = generateRandomGraph({
  random: random
});

var generateSpaceForNode = SpaceGenerator({
  random: random
});

var spaces = graphData.nodes.map(generateSpace);

function generateSpace(node) {
  return generateSpaceForNode({
    node: node,
    nodes: graphData.nodes,
    links: graphData.links
  });
}

function renderSpaceAtIndex(i) {
  renderSpacePane({
    root: document.body,
    space: spaces[i]
  });
}

var spaceIndex = 0;
var strokeRouter = StrokeRouter(document)
strokeRouter.routeKeyUp('rightArrow', null, renderNextSpace);
strokeRouter.routeKeyUp('leftArrow', null, renderPrevSpace);

function renderNextSpace() {
  spaceIndex += 1;
  if (spaceIndex >= spaces.length) {
    spaceIndex = 0;
  }
  renderSpaceAtIndex(spaceIndex);
}

function renderPrevSpace() {
  spaceIndex -= 1;
  if (spaceIndex < 0) {
    spaceIndex = spaces.length - 1;
  }
  renderSpaceAtIndex(spaceIndex);
}

renderSpaceAtIndex(spaceIndex);
