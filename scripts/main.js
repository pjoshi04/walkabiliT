window.onload = function() {
  loadMap();
}

var width = 900,
  height = 900;

var scaleX = d3.scaleLinear()
                    .domain([-width/2, width/2])
                    .range([0, width]);


var scaleY = d3.scaleLinear()
                    .domain([height/2, -height/2])
                    .range([0, height]);

var scaleR = d3.scaleLinear()
                    .range([0, width/2])
                    .domain([0,50])

function drawTimeCurves (svgCanvas){
  var distances = [5,10,15,20,25,30,35,40];

  var distanceCurves = svgCanvas.selectAll("circle")
                          .data(distances)
                          .enter()
                          .append("circle")
                          .attr("cx", scaleX(0))
                          .attr("cy", scaleY(0))
                          .attr("r", function(d) {
                               return scaleR(d);
                          })
                          .style("stroke", "red")
                          .attr("fill", "none");

};

function drawLines (svgCanvas) {
  var stopsData = [6, 5, 7, 22];
  var stopsDataCuml = [6, 11, 18, 39];
  var stopsData2 = [[11,0],[18,0],[25,-7],[38,-12]];

  var testLine = svgCanvas.append("line")
                      .attr("x1", scaleX(0))
                      .attr("y1", scaleY(0))
                      .attr("x2", scaleX(0))
                      .attr("y2", scaleY(scaleR(stopsDataCuml[stopsDataCuml.length - 1])))
                      .style("stroke", "orange")
                      .style("stroke-width", "10");

  var testLine2 = svgCanvas.selectAll("line")
                      .data(stopsData2, function(d) {return d;})
                      .enter()
                      .append("line")
                      .attr("x1", function(d, i){
                          if (stopsData2[i-1]) {
                              return scaleX(scaleR(stopsData2[i-1][1]));
                            } else {
                              return scaleX(0);
                            }
                      })
                      .attr("y1", function(d, i){
                          if (stopsData2[i-1]) {
                              return scaleY(scaleR(stopsData2[i-1][0]));
                            } else {
                              return scaleY(0);
                            }
                      })
                      .attr("x2", function(d){return scaleX(scaleR(d[1]))})
                      .attr("y2", function(d){return scaleY(scaleR(d[0]))})
                      .style("stroke", "green")
                      .style("stroke-width", "10");


  var stops = svgCanvas.selectAll("circle")
                      .data(stopsDataCuml, function(d) { return d; })
                      .enter()
                      .append("circle")
                      .attr("cx", scaleX(0))
                      .attr("cy", function(d){
                                  return scaleY(scaleR(d));
                      })
                      .attr("r", 10)
                      .style("stroke", "orange")
                      .style("fill", "white")
                      .style("stroke-width", 5)

  var stops2 = svgCanvas.selectAll("circle")
                                          .data(stopsData2, function(d) { return d; })
                                          .enter()
                                          .append("circle")
                                          .attr("cx", function(d){
                                                      return scaleX(scaleR(d[1]));
                                          })
                                          .attr("cy", function(d){
                                                      return scaleY(scaleR(d[0]));
                                          })
                                          .attr("r", 10)
                                          .style("stroke", "green")
                                          .style("fill", "white")
                                          .style("stroke-width", 5);
}


function loadMap() {
    var body = d3.select("body");

    var svgCanvas = body.append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .style("border", "1px solid blue");


    drawTimeCurves(svgCanvas);
    drawLines(svgCanvas);
}
