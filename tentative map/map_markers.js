// // Create the tile layer that will be the background of our map
// var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//   maxZoom: 18,
//   id: "light-v10",
//   accessToken: API_KEY
// });

// // Create the map with our layers
// var map = L.map("map", {
//   center: [35.28, 149.13],
//   zoom: 3,
// });
// lightmap.addTo(map);

// d3.json("DataPreProcessing/Data/fire_location.json").then(function(fireData) {

//     var markers = L.circleMarker([fireData.latitude, fireData.longitude], {
//         radius: mag*3,
//       })
// myMap.addLayer(markers);    

// });

// Visualizing-Data-with-Leaflet - logic.js

// Earthquakes GeoJSON URL Variables
var bushfireURL = "DataPreProcessing/Data/fire_location.json"
var bushFires = new L.LayerGroup();

var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});
d3.json(bushfireURL).then(function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
console.log(data)

});