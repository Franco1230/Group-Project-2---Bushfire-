
// Visualizing-Data-with-Leaflet - logic.js

// Earthquakes GeoJSON URL Variables
var bushfiresURL = "DataPreProcessing/Data/fire_location.json"//"/fetch/mapData"
var platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"
////////////////////////
// var bushfireURL = "DataPreProcessing/Data/fire_location.json"
// var bushFires = new L.LayerGroup();

// var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.satellite",
//     accessToken: API_KEY
// });
// d3.json(bushfireURL).then(function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
// console.log(data)

// });
//////////////////////

var bushfires = new L.LayerGroup();



var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});
var grayscaleMap =  L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
});

// Define baseMaps Object to Hold Base Layers
var baseMaps = {
    "Satellite": satelliteMap,
    "Grayscale": grayscaleMap,
    "Outdoors": outdoorsMap
};

// Create Overlay Object to Hold Overlay Layers
var overlayMaps = {
    "BushFires": bushfires
};

// Create Map, Passing In satelliteMap & bushfires as Default Layers to Display on Load
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 2,
    layers: [satelliteMap, bushfires]
});
var geojson;
// Create a dropdown Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Grab the data with d3
d3.json(bushfiresURL, function(data) {
    console.log(data)
        // Function to Determine Size of Marker Based on the Magnitude of the Earthquake
        L.circleMarker(fireData.latitude, fireData.longitude], {
            //         radius: mag*3,
            //       })

    // Function to Determine Color of Marker Based on the Magnitude of the Earthquake
    function chooseColor(magnitude) {
        return magnitude > 5 ? '#FF0000' :
        magnitude > 4  ? '#f0a76b' :
        magnitude > 3  ? '#f3ba4d' :
        magnitude > 2 ? '#f3db4d' :
        magnitude > 1   ? '#e1f34d' :
        magnitude > 0   ? '#168f48' :
                   '#FFEDA0';
    }
    
    // // Set Up Legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend"),
        scale = [0, 1, 2, 3, 4, 5];
        
      ////////  created the html to be displayed in the legend
        for(var i=0; i<6;i++)
        {   
            // if(i<5){
            //     div.innerHTML+='<i style="background:' + chooseColor(scale[i]) + '"></i> ' +'<h1>'+i+'-'+(i+1)+'</h1>'

            // }
            // else {
            //     div.innerHTML+='<h1>'+i+'+</h1>'
            // }
            
            div.innerHTML +=
            '<i style="background:' + chooseColor(scale[i] + 1) + '"></i> ' +
            scale[i] + (scale[i + 1] ? '&ndash;' + scale[i + 1] + '<br>' : '+');
            
            // #style tag with i
        }
      
        return div
      };
    // Add Legend to the Map
    legend.addTo(myMap);
});