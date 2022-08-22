<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
       
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="midium">แอปสถานที่เที่ยวฝั่งธนบุรี</ion-title>
        </ion-toolbar>
      </ion-header>
       <div >
        <ion-card 
          @click="openDetail(item)"
          v-for="item in list"
          :key="item.id"
        >
          <img :src="item.img_cover"  />
          <ion-card-header>
            <!-- <ion-card-subtitle>Destination</ion-card-subtitle> -->
            <ion-card-title >{{ item.title }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import axios, { AxiosResponse } from "axios";
const end_point = "http://127.0.0.1:3333";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent( {
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
  ,
  created(){
    this.get_detail()
  },
  data() {
    return {
      list:[],

      record: {

        id: "",
        title:"",
        img_cover:"",
        created_at: "",
        updated_at: "",
       
      },
    }
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    openDetail(item: any) {
      this.router.push(`/tabs/rec/detail/${item.id}`);
    },
    get_detail() {
      
      axios
        .get(`${end_point}/recommededPlaces`)
        .then((res: AxiosResponse) => {
          
          this.list = res.data;
        });

      //http://127.0.0.1:3333/view/places/{{places_id}}
    },
  },
})
</script>