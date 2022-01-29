<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title size="small"> แอปสถานที่เที่ยวฝั่งธนบุรี</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div v-if="loading">
        <YouTube
          v-for="vdo in vdos"
          :key="vdo.id"
          :src="vdo.vdo_link"
          @ready="onReady"
          :ref="vdo.id"
          width="100%"
          height="200px"
        />
      </div>
      <!-- <YouTube
        src="https://www.youtube.com/watch?v=jNQXAC9IVRw"
        @ready="onReady"
        ref="youtube"
      width="100%" height="200px"/>
       <YouTube
        src="https://www.youtube.com/watch?v=jNQXAC9IVRw"
        @ready="onReady"
        ref="youtube"
      width="100%" height="200px"/> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { defineComponent } from "vue";

import axios, { AxiosResponse } from "axios";
const end_point = "http://127.0.0.1:3333";

export default defineComponent({
  data() {
    return {
      vdos: [],
      loading: false,
    };
  },
  // created() {
  //   var tag = document.createElement("script");

  //   tag.src = "https://www.youtube.com/iframe_api";
  //   var firstScriptTag = document.getElementsByTagName("script")[0];
  //   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // },
  mounted() {
    console.log("component working");
    this.getAPI();

  
  },

  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },

  methods: {
    onReady() {
      //this.$refs.youtube.playVideo();
    },
    getAPI() {
      axios
        .get(`${end_point}/vdo`)
        .then((res: AxiosResponse) => {
          this.vdos = res.data;
          setTimeout(() => {
            this.loading = true;
          }, 500);
        })
        .catch((error) => {
          console.log("catch");
        })
        .finally(() => {
          console.log("finally");
        });
    },
  },
});
</script>

