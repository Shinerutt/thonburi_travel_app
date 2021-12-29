<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Home Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home Page</ion-title>
        </ion-toolbar>
      </ion-header>
      <H1>Hello world</H1>
      <ion-button @click="getAPI()">Default</ion-button>

      {{ user }}
      <!-- <ExploreContainer name="Tab 1 page" /> -->
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
// import ExploreContainer from "@/components/ExploreContainer.vue";

import { defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
export default defineComponent({
  components: {
    // ExploreContainer,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
  },
  data() {
    return {
      user_id: "508e47fc-5612-482f-92df-2dc7adc4ea0a",
      lists: [],
      user: {
        id: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        nick_name: "",
        img_profile: "",
        created_at: "",
        updated_at: "",
      },
    };
  },
  created() {
    console.log("component working");
    // this.getAPI();
  },
  methods: {
    getAPI() {
      axios
        .get(`http://127.0.0.1:3333/user/${this.user_id}`)
        .then((res: AxiosResponse) => {
          this.user = res.data;
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