const accessToken = 'T9AXpuzRABgCTPv1ZobtztZ7ODNt5WfPuUAXi7IOA4vZuYiBTDCwtcJD6qYByT9U';
const map = L.map('map').setView([-12.809645, 45.130741], 11);
L.tileLayer(
  `https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=${accessToken}`, {
    attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>',
    maxZoom: 22
  }
).addTo(map);

function placer_dechet(dechet) {
  // Marker with custom icon
  L.marker(dechet, {
    icon: L.icon({
      iconUrl: './img/trash-solid.svg',
      iconSize: [20, 20]
    })
  }).addTo(map);
}

const dechets = [
  [-12.809645, 45.130741],
  [-12.9025, 45.07611],
  [-12.78234, 45.22878],
]

dechets.forEach(element => placer_dechet(element));
