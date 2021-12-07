var svgWidth = 1800;
var svgHeight = 1300;

var margin = {
  top: 100,
  right: 40,
  bottom: 150,
  left: 60
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("clean_fire_data.csv").then(function(fireData) {

 // Print the tvData
 console.log(fireData);


 // Cast the hours value to a number for each piece of tvData
 fireData.forEach(function(d) {
    d.PercentForestBurnt = +d.PercentForestBurnt;
  });
// Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
var xBandScale = d3.scaleBand()
.domain(fireData.map(d => d.State))
.range([0, width])
.padding(0.1);

// Create a linear scale for the vertical axis.
var yLinearScale = d3.scaleLinear()
.domain([0, d3.max(fireData, d => d.PercentForestBurnt)])
.range([height, 0]);

// Create two new functions passing our scales in as arguments
// These will be used to create the chart's axes
var bottomAxis = d3.axisBottom(xBandScale);
var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

// Append two SVG group elements to the chartGroup area,
// and create the bottom and left axes inside of them
chartGroup.append("g")
.call(leftAxis);

chartGroup.append("g")
.attr("transform", `translate(0, ${height})`)
.call(bottomAxis);

  // @TODO
  // Create code to build the bar chart using the tvData.
  var bars = chartGroup.selectAll(".bar")
  .data(fireData)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("fill", "red")
  .attr("x", d => xBandScale(d.State))
  .attr("y", d => yLinearScale(d.PercentForestBurnt))
  .attr("width", xBandScale.bandwidth())
  .attr("height", d => height - yLinearScale(d.PercentForestBurnt));



      // Create axes labels
      chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .style("font-size", "30px")
      .text("Forest Burnt (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top})`)
      .attr("class", "axisText")
      .style("font-size", "30px")
      .text("States");

      chartGroup.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "54px") 
      .style("text-decoration", "underline")  
      .text("Total Fire Damage to Forests in Each State");
      

   
    // // Initialize tool tip
    // // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([-10, 0])
      .style("background-color", "blue")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .html(function(d) {
        return (`${d.State}<br>Forest burnt: ${d.PercentForestBurnt}% <br>Total forest (hectares): ${d.TotalForestHectares}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    bars.on("mouseover", function(d) {
      toolTip.show(d, this);
    })
      // onmouseout event
      .on("mouseout", function(d, index) {
        toolTip.hide(d);
      });



  }).catch(function(error) {
    console.log(error);
  });

