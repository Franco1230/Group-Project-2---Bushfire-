// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Create the map with our layers
var map = L.map("map", {
  center: [35.28, 149.13],
  zoom: 3,
});
lightmap.addTo(map);

d3.csv("DataPreProcessing/Data/fire_nrt_M6_101673.csv").then(function(fireData) {

    var markers = L.circleMarker([fireData.latitude, fireData.longitude], {
        radius: mag*3,
      })
    

});