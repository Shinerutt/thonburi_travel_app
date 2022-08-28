<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ record.title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
     <div v-for="(item,index) in record.detail" v-html="item.content" :key="index" style="padding:10px"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
const end_point = "http://128.199.103.191:3333";


export default defineComponent ({
  components: {  IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      record: {

        id: "",
        title:"",
        img_cover:"",
        created_at: "",
        updated_at: "",
        detail:[{
          content:"<h1>555</h1>"
        }]


        
      },
    }
  },
   created() {
    this.get_detail(this.$route.params.id);
    console.log(new Date().getTime());
  },
  methods: {
   get_detail(recommed_id:any) {
      
      axios
        .get(`${end_point}/view/recommededTrip/${recommed_id}`)
        .then((res: AxiosResponse) => {
          this.record = res.data
          
          
        });
  },
  }


})
</script>