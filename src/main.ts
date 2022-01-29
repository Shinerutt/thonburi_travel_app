import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import  VueGoogleMaps from '@fawmi/vue-google-maps'
/* Theme variables */
import './theme/variables.css';
import YouTube from "vue3-youtube";

const app = createApp(App)
  .use(IonicVue)
  .use(router) 
 
  .use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBpldJmmwqZcJszmiKkddqzzPKCpld3qnM',
    },
})
app.component("YouTube",YouTube)

router.isReady().then(() => {
  app.mount('#app');
});
const tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);