// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 50, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Load data from data.csv
d3.csv("./assets/data/data.csv").then(function(data) {
    console.log(data);

    // Add X axis
    var x = d3.scaleLinear()
    .domain([8, 24])
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
    .domain([4, 26])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return x(d.poverty); } )
        .attr("cy", function (d) { return y(d.healthcare); } )
        .attr("r", 6)
        .style("fill", "#407294");

    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 10)
    .text("In Poverty (%)");

    // Y axis label:
    svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .text("Lacks Healthcare (%)")

})
 

// healthcare(y axis) vs poverty (x axis - 4th)
// id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare