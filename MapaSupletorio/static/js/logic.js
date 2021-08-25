 var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=" +
 "2019-01-02&maxlongitude=150.52148437&minlongitude=-150.83789062&maxlatitude=80.74894534&minlatitude=-70.7433195";
 
 d3.json(queryUrl, function(data) {
   
   createFeatures(data.features);
 });
 
 
 function markerSize(mag){
   return mag * 5
 }
 
 // create a function that gets colors for circle markers
 function getColors(d) {
 if (d < 1){
   return "#B7DF5F"
 }
 else if ( d < 2){
   return "#DCED11"
 }
 else if (d < 3){
   return "#EDD911"
 }
 else if (d < 4){
   return "#EDB411"
 }
 else if (d < 5 ){
   return "#ED7211"
 }
 else {
   return "#ED4311"
 }
 };
 

 function createCircleMarker(feature, latlng ){
 
   var markerOptions = {
     radius: markerSize(feature.properties.mag),
     fillColor: getColors(feature.properties.mag),
     color: "blue",
     weight: 1,
     opacity: 1,
     fillOpacity: 0.8
   }
   return L.circleMarker( latlng, markerOptions);
 };
 
 function createMarker(){
  marker =  L.marker([-1.2411788,-78.626932],
    [-1.255986, -80.647599],
    [-0.438526, -76.443968],
    [-3.795996, -79.394279],
    [0.283273, -78.046388]
    )
  return marker;
 }



 function createFeatures(earthquakeData) {
   /* console.log(earthquakeData) */
 
   function onEachFeature(feature, layer) {
     layer.bindPopup("Ubicación: " + feature.properties.place + "<br>" 
         + "Fecha: " + new Date(feature.properties.time) + "<br>" + "Magnitud: " + feature.properties.mag);
   }
   
   var earthquakes = L.geoJSON(earthquakeData, {
     onEachFeature: onEachFeature,
     pointToLayer: createCircleMarker,
     /* pointToLayer: createMarker */
   });
 

   createMap(earthquakes);
 }
 

 function createMap(earthquakes) {
 
   var grayscale = L.tileLayer.grayscale('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>", 
    maxZoom: 18,
    });
 
    marker = L.marker([-1.2411788,-78.626932]).bindPopup("<h1>Parque Cevallos</h1> <h2>Sismo1</h2> <p>-1.2411788,-78.626932</p>")
    marker1 = L.marker([-1.255986, -80.647599]).bindPopup("<h1>Membrillal</h1> <h2>Sismo2</h2><p>-1.255986, -80.647599</p>")
    marker2 = L.marker([-0.438526, -76.443968]).bindPopup("<h1>Puerto Asís, Putumayo</h1> <h2>Sismo3</h2><p>0.438526, -76.443968</p>")
    marker3 = L.marker([-3.795996, -79.394279]).bindPopup("<h1>Gualel</h1> <h2>Sismo4</h2><p>-3.795996, -79.394279</p>")
    marker4 = L.marker([0.283273, -78.046388]).bindPopup("<h1>San Francisco</h1> <h2>Sismo5</h2><p>0.283273, -78.046388</p>")    
   
   var overlayMaps = {
     Earthquakes: earthquakes,
   };
 
   // Create our map, giving it the streetmap and earthquakes layers to display on load
   var myMap = L.map("map", {
     center: [
      4.8249687,-58.1881608
     ],
     zoom: 5,
     layers: [grayscale, earthquakes, marker, marker1, marker2, marker3, marker4],
     
   });


 }
 
