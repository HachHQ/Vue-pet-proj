import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { loadFonts } from './plugins/webfontloader'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import store from '@/store'


loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .use(store)
  .component('VueDatePicker', VueDatePicker)
  .mount('#app')
  
