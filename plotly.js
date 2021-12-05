var svgWidth = 1100;
var svgHeight = 800;

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
d3.csv("Data/clean_fire_data.csv").then(function(fireData) {

 // Print the tvData
 console.log(fireData);


 // Cast the hours value to a number for each piece of tvData
 fireData.forEach(function(data) {
    data.hours = +data.hours;
  });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

  // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (fireData.length - 1))) / fireData.length;

  // @TODO
  // Create code to build the bar chart using the tvData.
  chartGroup.selectAll(".bar")
    .data(fireData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.hours * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.hours * scaleY);
}).catch(function(error) {
  console.log(error);


    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([90.5, -60])
      .style("background-color", "aqua")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .html(function(d) {
        return (`${d.state}<br>Income: $${d.income} <br>People with Healthcare: ${d.healthcare}%`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
      });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("People with Healthcare (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
      .attr("class", "axisText")
      .text("Income ($)");

      chartGroup.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "24px") 
      .style("text-decoration", "underline")  
      .text("Average Income and Percentage of People With Healthcare in Each State");

  }).catch(function(error) {
    console.log(error);
  });
