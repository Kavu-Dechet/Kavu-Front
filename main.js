const accessToken = 'T9AXpuzRABgCTPv1ZobtztZ7ODNt5WfPuUAXi7IOA4vZuYiBTDCwtcJD6qYByT9U';
// Definit la zone de mayotte et le zoom approprié
const map = L.map('map').setView([-12.809645, 45.130741], 11);
// Importation du fond de carte Jawgmap
L.tileLayer(
  `https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${accessToken}`, {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
    maxZoom: 22
  }
).addTo(map);

var dechetIcon = L.icon({
  iconUrl: './img/trash-solid.svg',
  iconSize: [15, 15],
  popupAnchor: [0, -28]
});


var dechets = {
    "type": "FeatureCollection",
    "features": [
      {
        "geometry": {
          "type": "Point",
          "coordinates": [45.130741,-12.809645]
        },
        "type": "Feature",
        "properties": {
          "popupContent": "Mayotte"
        },
        "id": 57
      },
      {
        "geometry": {
          "type": "Point",
          "coordinates": [45.07611,-12.9025]
        },
        "type": "Feature",
        "properties": {
          "popupContent": "Bouéni"
        },
        "id": 57
      },
      {
        "geometry": {
          "type": "Point",
          "coordinates": [45.22878,-12.78234]
        },
        "type": "Feature",
        "properties": {
          "popupContent": "Mamoudzou"
        },
        "id": 57
      },
    ]
};

new L.GeoJSON(dechets,
  {
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: dechetIcon});
  }
}).addTo(map);

$(document).ready(function(){
    $.ajax({
        //L'URL de la requête
        url: "http://localhost:5000/geodechets",

        //La méthode d'envoi (type de requête)
        method: "GET",

        //Le format de réponse attendu
        dataType : "text",
        // allow crossorigin
        crossDomain: true,
        success: function (response) {
            alert(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });

});
