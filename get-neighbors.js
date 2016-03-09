function GetNeighbors(createOpts) {
  var nodes;
  var links;

  if (createOpts) {
    nodes = createOpts.nodes;
    links = createOpts.links;    
  }

  var neighborsForIds = {};
  links.forEach(addNeighborsToMap);

  function getNeighbors(id) {
    return neighborsForIds[id];
  }

  function addNeighborsToMap(link) {
    var source = nodes[link.source];
    var target = nodes[link.target];

    var neighbors = [];
    if (source.id in neighborsForIds) {
      neighbors = neighborsForIds[source.id];
    }
    else {
      neighborsForIds[source.id] = neighbors;
    }

    neighbors.push(target);

    var targetNeighbors = [];
    if (target.id in neighborsForIds) {
      targetNeighbors = neighborsForIds[target.id];
    }
    else {
      neighborsForIds[target.id] = targetNeighbors;
    }

    targetNeighbors.push(source);
  }

  return getNeighbors;
}

module.exports = GetNeighbors;
