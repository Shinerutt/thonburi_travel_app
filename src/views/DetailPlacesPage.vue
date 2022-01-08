<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{record.name}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{record.name}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-slides v-if="loadding == false">
        <ion-slide v-for="(url, index) in record.img_places" :key="index">
          <img :src="url"/>
        </ion-slide>
      </ion-slides>

      <div v-html="record.detail"></div>

      <!-- {{record.img_places[0]}} -->
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
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  created() {
    this.get_detail(this.$route.params.id);
  },
  data() {
    return {
      loadding: true,
      record: {
        id: "",
        name: "",
        lat: 0,
        lng: 0,
        detail: "",
        img_places: [1, 2, 4, 5, 3, 2, 1],
        category: "",
        created_at: "",
        updated_at: "",
      },
    };
  },
  methods: {
    get_detail(places_id: any) {
      this.record.img_places = [];
      axios
        .get(`${end_point}/view/places/${places_id}`)
        .then((res: AxiosResponse) => {
          res.data.img_places = JSON.parse(res.data.img_places);
          this.record = res.data;
          this.loadding = false;
        });

      //http://127.0.0.1:3333/view/places/{{places_id}}
    },
  },
});
</script>

