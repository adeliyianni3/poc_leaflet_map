<template>
  <div>
    <div style="height: 10%; overflow: auto;">
      <h3>OpenStreetMap and MapBox</h3>
    </div>
    <l-map
      class="map"
      style="height: 45%"
      :zoom.sync="zoom"
      :center="center"
      :options="option1"
      :bounds="bounds"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        :token="token"
      >
      </l-tile-layer>
    </l-map>
    <div style="height: 10%; overflow: auto;">
      <h3>Bing Maps</h3>
    </div>
    <l-map
      ref="map"
      class="map"
      style="height: 45%"
      :zoom.sync="zoom"
      :center="center"
      :options="option1"
      :bounds="bounds"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
    >
    </l-map>
    <div style="height: 10%; overflow: auto;">
      <h3>WMS</h3>
    </div>
    <l-map
      ref="map2"
      class="map"
      style="height: 45%"
      :zoom.sync="zoom"
      :center="center"
      :options="option1"
      :bounds="bounds"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
    >
    </l-map>
    <div style="height: 10%; overflow: auto;">
      <h3>Esri</h3>
    </div>
    <l-map
      ref="map3"
      class="map"
      style="height: 45%"
      :zoom.sync="zoom"
      :center="center"
      :options="option1"
      :bounds="bounds"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
    >
    </l-map>
  </div>
</template>
<style>
  .map {
    height: 400px !important;
    width: 400px !important;
  }
</style>

<script>
import L from 'leaflet'
import { LMap, LTileLayer } from 'vue2-leaflet';
import 'leaflet-bing-layer';

var corner1 = L.latLng(40.712, -74.227);
var corner2 = L.latLng(40.774, -74.125);
export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer
  },
  mounted () {
    this.$nextTick(() => {
      L.tileLayer.bing('AvVCK0xHGmL0Jkv6sVOo1PZv1gwYVfd6roQmfNOlhmmrwLt3xtw4tVaVvxri-wTb').addTo(this.$refs.map.mapObject);
      L.tileLayer.wms('https://demo.boundlessgeo.com/geoserver/ows?', { layers: 'nasa:bluemarble', attribution: 'NASA' }).addTo(this.$refs.map2.mapObject);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'}).addTo(this.$refs.map3.mapObject);
    })
  },
  data () {
    return {
      zoom: 1,
      center: { lat: 51.505, lng: -0.09 },
      bounds: L.latLngBounds(corner1, corner2),
      minZoom: 1,
      maxZoom: 20,
      opacity: 0.6,
      option1: { name: '1'},
      url: 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW50ZGVsaSIsImEiOiJjamtkOWc3YTcyc2k1M3BwMjUwOHdocGhqIn0.8VH4nojl2YAVHfzQekQZsw',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      token: 'pk.eyJ1IjoiYW50ZGVsaSIsImEiOiJjamtkOWc3YTcyc2k1M3BwMjUwOHdocGhqIn0.8VH4nojl2YAVHfzQekQZsw'
    }
  }
}
</script>