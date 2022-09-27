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


/**
 * Requêtes les déchets à l'API
 */
$(document).ready(function() {
  var debug = ""
    $.ajax({
        //L'URL de la requête
        url: "http://localhost:5000/geodechets",

        //La méthode d'envoi (type de requête)
        method: "GET",

        //Le format de réponse attendu
        dataType : "json",
        // allow crossorigin
        crossDomain: true,
        success: function (response) {
          console.debug(response);
          new L.GeoJSON(response,{
            pointToLayer:pointToLayer
          }).addTo(map);
          maj_tableau_bord(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert("Connection API impossible");
          console.log(thrownError);
        }
      });

});

/**
 * Ajoutes les icones des déchets (selon la catégorie)
 * @param {json} feature - Le déchet (feature geojson)
 */
function pointToLayer(feature, latlng) {
    var popupContent;
    var marker;
    switch(feature.properties.categorie) {
        case "D3E":
            marker = L.marker(latlng, {icon: d3eIcon}).addTo(map);
            popupContent = "D3E"
            break;
        case "VUH":
            marker = L.marker(latlng, {icon: vhuIcon}).addTo(map);
            popupContent = "Voiture"
            break;
        default:
            marker = L.marker(latlng, {icon: dechetIcon}).addTo(map);
            popupContent = "Inconnu"
    }

    marker.bindPopup(popupContent);
}

/**
 * Met à jour les métriques du tableau de bord
 * @param {geojson} dechets - Les déchets à compter
 */
function maj_tableau_bord(dechets) {
  count_vhu = 0;
  count_d3e = 0;

  dechets["features"].forEach((dechet, i) => {
    categorie = dechet["properties"]["categorie"]
    if ( categorie == "VHU") {
      count_vhu += 1
    }
    if ( categorie == "D3E") {
      count_d3e += 1
    }
  });
    document.getElementById("count_d3e").innerHTML = count_d3e;
    document.getElementById("count_vhu").innerHTML = count_vhu;

  console.log(count_vhu);
}

// ***************************************************************************
// CONSTANTES LIEES à L'AFFICHAGE
// ***************************************************************************

const ICON_SIZE = [15, 15];
const ICON_POP_UP = [0, -28]
var dechetIcon = L.icon({
  iconUrl: './img/trash-solid.svg',
  iconSize: ICON_SIZE,
  popupAnchor: ICON_POP_UP
});

var vhuIcon = L.icon({
  iconUrl: './img/car-solid.svg',
  iconSize: ICON_SIZE,
  popupAnchor: ICON_POP_UP
});

var d3eIcon = L.icon({
  iconUrl: './img/charging-station-solid.svg',
  iconSize: ICON_SIZE,
  popupAnchor: ICON_POP_UP
});
