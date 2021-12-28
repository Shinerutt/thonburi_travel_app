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
      <ion-list>
        <ion-item v-for="(list_item,index) in lists" :key="index">
          <ion-label>{{list_item.title}}</ion-label>
        </ion-item>
      </ion-list>

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
      lists: [],
    };
  },
  created() {
    console.log("component working");
    // this.getAPI();
  },
  methods: {
    getAPI() {
      axios
        .get("https://jsonplaceholder.typicode.com/todos")
        .then((res: AxiosResponse) => {
          console.log("then", res.data);
          this.lists = res.data;
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