var d3force = require('./lib/d3-force').layout.force;
var d3 = require('d3-selection');

function Graph(createOpts) {
  var width;
  var height;

  if (createOpts) {
    width = createOpts.width;
    height = createOpts.height;
  }

  var force;
  var svg;
  var linksSel;
  var nodesSel;

  function render() {
    force = d3force()
        .size([width, height])
        .charge(-400)
        .linkDistance(40)
        .on("tick", tick);

    svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

    linksSel = svg.selectAll(".link");
    nodesSel = svg.selectAll(".node");
  }

  function renderUpdate(nodes, links) {
    force
        .nodes(nodes)
        .links(links)
        .start();

    linksSel = linksSel.data(links)
      .enter().append("line")
        .attr("class", "link");

    nodesSel = nodesSel.data(nodes)
      .enter().append("circle")
        .attr("class", "node")
        .attr("r", 12)
        .on("dblclick", dblclick);    
  }

  function tick() {
    linksSel.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    nodesSel.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  function dblclick(d) {
    // d3.select(this).classed("fixed", d.fixed = false);
  }

  return {
    render: render,
    renderUpdate: renderUpdate
  };
}

module.exports = Graph;
