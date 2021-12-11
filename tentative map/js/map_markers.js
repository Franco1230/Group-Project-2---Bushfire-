// Setting backgrounds of our map.
var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

// Create map object.
var map = L.map("map", {
  center: [-25.2744, 133.7751],
  zoom: 3,
});

// Set the map as default.
lightMap.addTo(map);

// Create a layer group made from the earthquake data
var earthquakes = new L.LayerGroup();

// Store the query URL to a variable
var queryURL = "DataPreProcessing/Data/fire_location.json";

d3.json(queryURL).then(function(fireData) {

    var markers = L.circleMarker([fireData.latitude, fireData.longitude], {
        radius: mag*3,
      })
myMap.addLayer(markers);    

});