
// Visualizing-Data-with-Leaflet - logic.js

// Earthquakes GeoJSON URL Variables
var bushfiresURL = "../../data.json"//"//"/fetch/mapData"// 

var bushfires = new L.LayerGroup();

var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});
var darkMap =  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

// Define baseMaps Object to Hold Base Layers
var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": grayscaleMap,
    "Dark Map": darkMap
};

// Create Overlay Object to Hold Overlay Layers
var overlayMaps = {
    "BushFires": bushfires
};

// Create Map, Passing In satelliteMap & bushfires as Default Layers to Display on Load
var myMap = L.map("map", {
    center: [-25.274398, 133.775136],
    zoom: 4,
    layers: [satelliteMap, bushfires]
});
var geojson;
// Create a dropdown Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Grab the data with d3
d3.json(bushfiresURL, function(response) {
    console.log(response)
    console.log(bushfiresURL)
    L.marker([31, -115]).addTo(myMap);
    for (var i = 0; i < response.length; i+=100) {
        var location =[response[i].latitude,response[i].longitude];//
    
        if(typeof location === 'undefined'){
          // element does not exist
          console.log('undefined')
        }
    
        else {
          if(typeof location[0] === 'undefined'){
            console.log('undefined lat')
          }
          if(typeof location[1] === 'undefined'){
            console.log('undefined lng')
          }
          if(location[0] != null && location[1] != null && location.length == 2){
            L.marker([location[0], location[1]]).addTo(myMap);
            console.log('worked')
          }
        }
      }
      
    

});