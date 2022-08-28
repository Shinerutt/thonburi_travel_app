<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="midium"> แผนที่</ion-title>
        </ion-toolbar>
      </ion-header>
      <div>
        <g-map-map
          :center="{ lat: center.lat, lng: center.lng }"
          :zoom="15"
          map-type-id="terrain"
        >
          <g-map-marker
            :icon="{ url: require('../../public/assets/icon/imhereicon.png')}"
            :position="{ lat: center.lat, lng: center.lng }"
          ></g-map-marker>
          <g-map-marker
            @click="openWindow(item)"
            v-for="item in lists_filter"
            :key="item.id"
            :position="{ lat: item.lat, lng: item.lng }"
          >
            <g-map-info-window
              :opened="markerId == item.id"
              @click="openDetail(item.id)"
            >
              <div style="color: #000000">{{ item.name }}</div>
            </g-map-info-window>
          </g-map-marker>
        </g-map-map>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  
  // IonTitle,
  IonContent,
} from "@ionic/vue";
// import ExploreContainer from "@/components/ExploreContainer.vue";

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios, { AxiosResponse } from "axios";
const end_point = "https://api.system-searchpet.com";
export default defineComponent({
  components: {
    // ExploreContainer,
    IonHeader,
    IonToolbar,
    // IonTitle,
    IonContent,
    IonPage,
  },

  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      markerId: null,
      center: {
        lat: 0,
        lng: 0,
      },
      lists: [],
      lists_filter: [],
      info_marker: null,
      infowindow: { lat: 10, lng: 10.0 },
      window_open: false,
    };
  },
  created() {
    console.log("component working");
    // this.getAPI();
    this.getLocation();
    this.get_places_by_cat("all");
  },
  methods: {
    openDetail(id: string) {
      this.router.push(`/tabs/home/places/${id}`);
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
    },
    showPosition(position: any) {
      this.center.lat = position.coords.latitude;
      this.center.lng = position.coords.longitude;
    },
    get_places_by_cat(cat: string) {
      this.lists = [];
      axios
        .get(`${end_point}/places/${cat}`)
        .then((res: AxiosResponse) => {
          this.lists = res.data.map((item: any) => {
            item.img_places = JSON.parse(item.img_places);
            return item;
          });

          this.lists_filter = this.lists;
        })
        .catch((error) => {
          console.log("catch", error);
        })
        .finally(() => {
          console.log("finally");
        });
    },
    openWindow(item: any) {
      this.markerId = item.id;
      this.infowindow = {
        lat: item.lat,
        lng: item.lng,
      };
      this.window_open = true;
    },
  },
});
</script>
<style scoped>
.vue-map-container {
  height: 100vh;
  width: 100%;
}
.map-div {
  display: flex;
  justify-content: center;
}
.icon-map {
  margin-top: 5%;
  padding-left: 60px;
  padding-right: 60px;
}
</style>