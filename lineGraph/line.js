var svgWidth = 1800;
var svgHeight = 1300;

var margin = {
  top: 200,
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
d3.csv("../DataPreProcessing/Data/fire_location_counts.csv").then(function(fireData) {

 // Print the tvData
 console.log(fireData);


 fireData.forEach(function(data) {
  data.Date = parseTime(data.Date);
  data.Count = +data.Count;
});

// Configure a time scale with a range between 0 and the chartWidth
// Set the domain for the xTimeScale function
// d3.extent returns the an array containing the min and max values for the property specified
var xTimeScale = d3.scaleTime()
  .range([0, chartWidth])
  .domain(d3.extent(fireData, data => data.Date));

// Configure a linear scale with a range between the chartHeight and 0
// Set the domain for the xLinearScale function
var yLinearScale = d3.scaleLinear()
  .range([chartHeight, 0])
  .domain([0, d3.max(fireData, data => data.Count)]);

// Create two new functions passing the scales in as arguments
// These will be used to create the chart's axes
var bottomAxis = d3.axisBottom(xTimeScale);
var leftAxis = d3.axisLeft(yLinearScale);

// Configure a drawLine function which will use our scales to plot the line's points
var drawLine = d3
  .line()
  .x(data => xTimeScale(data.Date))
  .y(data => yLinearScale(data.Count));

// Append an SVG path and plot its points using the line function
chartGroup.append("path")
  // The drawLine function returns the instructions for creating the line for milesData
  .attr("d", drawLine(fireData))
  .classed("line", true);

// Append an SVG group element to the SVG area, create the left axis inside of it
chartGroup.append("g")
  .classed("axis", true)
  .call(leftAxis);

// Append an SVG group element to the SVG area, create the bottom axis inside of it
// Translate the bottom axis to the bottom of the page
chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", "translate(0, " + chartHeight + ")")
  .call(bottomAxis);
}).catch(function(error) {
console.log(error);
});