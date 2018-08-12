<template>
  <span>
    <div class="overlay">
      <l-map
        id="map"
        ref="map"
        class="map"
        style="height: 45%"
        :zoom.sync="zoom"
        :center="center"
        v-on:click ="getLatLon($event)"
      >
        <l-tile-layer
          :url="url"
          :attribution="attribution"
          :token="token"
        >
        </l-tile-layer>
        <l-polyline
          :latLngs="points"
          color.default= "#ff0000"
        >
        </l-polyline>
        <l-polygon
          class="polygon"
          :latLngs="polygon"
          color.default= "#ff0000"
          fillColor.default= "#ff0000"
          v-on:drag="dragPolygon($event)"
        >
        </l-polygon>
        <l-circle-marker
          v-for="(point, index) in points"
          :key="index"
          :latLng="point"
          v-on:click="clickOnVertex(point, $event)"
          color.default= "#ff0000"
          v-on:drag=""
        >
        </l-circle-marker>
      </l-map>
    </div>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>{{current_icon}}</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="green"
        v-on:click="drawEnabled"
      >
        <v-icon>edit</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="yellow"
        v-on:click="editEnabled"
      >
        <v-icon>pan_tool</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="red"
        v-on:click="deleteEnabled"
      >
        <v-icon>delete</v-icon>
      </v-btn>
    </v-speed-dial>
  </span>
</template>
<style>
  .map {
    height: 100% !important;
    width: 120% !important;
  }
  .v-speed-dial {
    z-index: 1000;
    float: right;
    margin-top: 25%;
  }
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51,51,51,0.7);
    z-index: 10;
  }
  path {
    stroke: #ff0000;
  }
  .crosshair {
    cursor: crosshair !important;
  }
</style>

<script>
import { LMap, LTileLayer, LPolygon, LPolyline, LCircleMarker} from 'vue2-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LPolygon,
    LPolyline
  },
  data () {
    return {
      closePoly: false,
      drawOn: false,
      editOn: true,
      deleteOn: false,
      map: null,
      points: [],
      polygon: [],
      current_icon: "pan_tool",
      direction: 'top',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: 'slide-y-reverse-transition',
      zoom: 20,
      center: { lat: 33.778463, lng: -84.398881 },
      url: 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW50ZGVsaSIsImEiOiJjamtkOWc3YTcyc2k1M3BwMjUwOHdocGhqIn0.8VH4nojl2YAVHfzQekQZsw',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      token: 'pk.eyJ1IjoiYW50ZGVsaSIsImEiOiJjamtkOWc3YTcyc2k1M3BwMjUwOHdocGhqIn0.8VH4nojl2YAVHfzQekQZsw'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.map = this.$refs.map.mapObject;
    })
  },
  methods: {
    drawEnabled () {
      if (!this.drawOn) {
        document.getElementById("map").className += " crosshair";
        this.current_icon='edit';
        this.drawOn = true;
        this.editOn = false;
        this.deleteOn = false;
      }
    },
    deleteEnabled () {
      if (!this.deleteOn) {
        document.getElementById("map").className = document.getElementById("map").className.replace(' crosshair','');
        this.drawOn = false;
        this.editOn = false;
        this.deleteOn = true;
      }
      if (this.points.length!=0) {
        this.points = this.polygon;
      }
      this.current_icon='delete';
    },
    editEnabled () {
      if (!this.editOn) {
        this.current_icon= "pan_tool"
        document.getElementById("map").className = document.getElementById("map").className.replace(' crosshair','');
        this.drawOn = false;
        this.deleteOn = false;
        this.editOn = true;
        this.points = this.polygon;
      }
    },
    getLatLon (e) {
      if (this.drawOn) {
        if (this.closePoly) {
          this.polygon = this.points;
          this.points = [];
          this.closePoly = false;
        } else {
          var latLng = [e.latlng.lat, e.latlng.lng];
          this.points.push(latLng);
        }
      }
    },
    clickOnVertex (circle, e) {
      console.log(this.deleteOn);
      console.log(this.drawOn);
      console.log(this.editOn);
      if (this.drawOn) {
        if (circle == this.points[0]) {
          this.points.push(circle);
          this.closePoly = true;
        }
      } else if (this.deleteOn) {
        var index = this.polygon.indexOf(circle);
        if (index > -1) {
          this.polygon.splice(index, 1);
          index = this.polygon.indexOf(circle);
          if (index > -1) {
            this.polygon.splice(index, 1);
          }
        }
      }
    },
    dragPolygon(e) {
      //e.stopPropagation();
    }
  }
}
</script>