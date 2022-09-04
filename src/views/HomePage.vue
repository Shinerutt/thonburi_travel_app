<template>
  <ion-page>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="midium"> แอปสถานที่เที่ยวฝั่งธนบุรี</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="categorybox">
        <div
          @click="clickActive('all')"
          :class="{ active: active_btn == 'all' ? true : false }"
        >
          ทั้งหมด
        </div>
        <div
          @click="clickActive('temple')"
          :class="{ active: active_btn == 'temple' ? true : false }"
        >
          วัด
        </div>
        <div
          @click="clickActive('landmark')"
          :class="{ active: active_btn == 'landmark' ? true : false }"
        >
          ที่เที่ยว
        </div>
        <div
          @click="clickActive('market')"
          :class="{ active: active_btn == 'market' ? true : false }"
        >
          ตลาด
        </div>
        <div
          @click="clickActive('restaurant')"
          :class="{ active: active_btn == 'restaurant' ? true : false }"
        >
          อาหาร
        </div>
      </div>
      <ion-toolbar>
        <IonSearchbar
          @keyup="searchAction"
          v-model="search_text"
        ></IonSearchbar>
      </ion-toolbar>

      <button @click="link_profile">OK</button>
      <div >
        <ion-card 
          @click="openDetail(item)"
          v-for="item in lists_filter"
          :key="item.id"
        >
          <img :src="item.img_places[0]" />
          <ion-card-header >
            <!-- <ion-card-subtitle>Destination</ion-card-subtitle> -->
            <ion-card-title style="font-size:1.2rem;" >{{ item.name }}</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
      <!-- <ion-button @click="getAPI()">Default</ion-button> -->

      <!-- <ExploreContainer name="Tab 1 page" /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonSearchbar,
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
    IonSearchbar,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      active_btn: "",
      search_text: "",
      user_id: "508e47fc-5612-482f-92df-2dc7adc4ea0a",
      lists: [],
      lists_filter: [],
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
  ionViewWillEnter() {
    console.log("component working");
    // this.getAPI();
    this.clickActive("all");
  },
  methods: {
    openDetail(item: any) {
      this.router.push(`/tabs/home/places/${item.id}`);
    },
    searchAction(event: any) {
      this.lists_filter = this.lists.filter((item: any) => {
        return new RegExp(event.target.value, "gi").test(item.name);
      });
    },
    clickActive(btn_name: string) {
      this.active_btn = btn_name;
      this.get_places_by_cat(btn_name);
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
    getAPI() {
      axios
        .get(`${end_point}/user/${this.user_id}`)
        .then((res: AxiosResponse) => {
          this.user = res.data;
        })
        .catch(() => {
          console.log("catch");
        })
        .finally(() => {
          console.log("finally");
        });
    },
    link_profile(){
      this.router.push('/tabs/profile');
    }
  },
});
</script>
<style scoped>
#categorybox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
}

#categorybox > div {
  /* background-color: aquamarine; */
  width: 100%;
  text-align: center;
  /* border: solid 1px coral; */
}

.active {
  color: #19b7cd;
}

</style>