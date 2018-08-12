import Vue from 'vue'
import App from './App.vue'
import 'leaflet/dist/leaflet.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')