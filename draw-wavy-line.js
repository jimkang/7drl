var shape = require('d3-shape');
var range = require('d3-array').range;
var b2d = require('basic-2d-math');

var line = shape.line();
line.curve(shape.curveNatural);

function drawWavyLine({probable, start, end, maxVariance}) {
  const divisorA = 10 + probable.rollDie(4);
  const divisorB = 2 + probable.roll(2);

  var vector = b2d.subtractPairs(end, start);
  var length = b2d.getVectorMagnitude(vector);
  var perpendicularLeft = [-vector[1], vector[0]];
  var perpendicularRight = [vector[1], -vector[0]];

  var maxVariance = probable.rollDie(4);
  var step = 1/probable.rollDie(10);
  var points = range(0, 1, step).map(getPoint);
  // return line(points);
  var parallelPoints = points.map(getParallelPoint).reverse();
  return line(points.concat(parallelPoints));

  // return area(range(0 + tearFreq, length - tearFreq, tearFreq));
  function getPoint(fractionalDistance) {
    let thicknessDelta = Math.sin(fractionalDistance/divisorA) * maxVariance/divisorB;
    var normalPoint = b2d.multiplyPairBySingleValue(vector, fractionalDistance);

    // var varianceMagnitude = probable.rollDie(maxVariance)/length;
    var variantDirection = perpendicularLeft;
    if (probable.roll(2) === 0) {
      variantDirection = perpendicularRight;
    }
    var variantVector = b2d.multiplyPairBySingleValue(
      variantDirection, thicknessDelta
    );
    return b2d.addPairs(
      start,
      b2d.addPairs(normalPoint, variantVector)
    );
  }

  function getParallelPoint(point) {
    return b2d.addPairs(
      point,
      b2d.multiplyPairBySingleValue(perpendicularRight, 1/(10 + probable.rollDie(10)))
    );
  }
}

module.exports = drawWavyLine;
