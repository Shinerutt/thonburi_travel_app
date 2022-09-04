<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title size="small">{{ record.name }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="midium" >{{ record.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-slides v-if="loadding == false">
        <ion-slide v-for="(url, index) in record.img_places" :key="index">
          <img :src="url" />
        </ion-slide>
      </ion-slides>

      <div style="padding: 20px" v-html="record.detail"></div>
      <div class="map-div">
        <g-map-map
          :center="{ lat: record.lat, lng: record.lng }"
          :zoom="15"
          map-type-id="terrain"
        >
          <g-map-marker :position="{ lat: record.lat, lng: record.lng }"
        /></g-map-map>
      </div>
      <div class="icon-map">
        <ion-button
          @click="openmaps(record.lat, record.lng)"
          expand="block"
          color="secondary"
          >คลิกตรงนี้เพื่อนำทาง</ion-button
        >
      </div>
      <hr />
      <div v-if="isLogin()">
        <div>
          <div
            v-for="(comments_item , index) in record.review"
            :key="index"
            class="comment-item"
          >
            <div>
              <ion-avatar slot="start">
                <img :src="comments_item.user.img_profile" />
              </ion-avatar>
            </div>
            <div class="comment-text">
              <div style="font-weight: 500">@{{ comments_item.user.email }}</div>
              <br />
              {{ comments_item.content }}
              <br><br>
              {{comments_item.created_at}}
            </div>
          </div>
        </div>
      </div>
      <ion-fab
        v-if="isLogin()"
        vertical="center"
        horizontal="end"
        slot="fixed"
        class="btn-comment"
      >
        <ion-fab-button @click="openComment">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!-- {{record.img_places[0]}} -->
    </ion-content>
    <ion-modal
      :is-open="box_comment_open"
      :breakpoints="[0.1, 0.5, 1]"
      :initialBreakpoint="1"
    >
      <ion-content
        ><ion-item>
          <ion-label position="floating">แสดงความคิดเห็น</ion-label>
          <ion-textarea
            :rows="10"
            placeholder="แสดงความคิดเห็น"
            v-model="comment_text"
          ></ion-textarea>
        </ion-item>
        <vue3-star-ratings
          v-model="rating"
          inactiveColor="#bfbfbf"
          :showControl="true"
          :starSize="30"
          :step="0.5"
        />
        <ion-button expand="block" @click="sent_comment">ส่ง</ion-button>
      </ion-content>
    </ion-modal>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonModal,
} from "@ionic/vue";
import { add } from "ionicons/icons";
import { IonItem, IonLabel, IonTextarea } from "@ionic/vue";
import { defineComponent } from "vue";
import axios, { AxiosResponse } from "axios";
const end_point = "https://api.system-searchpet.com";
import vue3StarRatings from "vue3-star-ratings";
import { IonButton } from "@ionic/vue";

export default defineComponent({
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    vue3StarRatings,
    IonFab,
    IonFabButton,
    IonIcon,
    IonModal,
    IonItem,
    IonLabel,
    IonTextarea,
    IonButton,
  },
  ionViewWillEnter() {
    this.get_detail(this.$route.params.id);
    console.log(new Date().getTime());
  },
  data() {
    return {
      comment_text: "",
      box_comment_open: false,
      rating: 1,
      comments: [
        {
          email: "abc@gmail.com",
          img: "https://ionicframework.com/docs/demos/api/list/avatar-luke.png",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        },
        {
          email: "abc@gmail.com",
          img: "https://ionicframework.com/docs/demos/api/list/avatar-rey.png",
          comment:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
        },
      ],
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
        review:[]
      },
    };
  },
  
  methods: {
    sent_comment() {
      var userData = localStorage.getItem("userData");
      if(this.comment_text==""){
        this.box_comment_open = false;
        return false
      }
      if (userData) {
        var obj_userData = JSON.parse(userData);
        // var record = {
        //   places_id: this.$route.params.id,
        //   user_id: obj_userData.id,
        //   content: this.comment_text,
        //   rate: this.rating,
        // };
       axios
        .post(`${end_point}/comment/save`,{
          places_id: this.$route.params.id,
          user_id: obj_userData.id,
          content: this.comment_text,
          rate: this.rating,
        })
        .then(() => {
         this.get_detail(this.$route.params.id);
        }),
        this.box_comment_open = false;
        this.comment_text = "";
      }
    },
    openmaps(lat: number, lng: number) {
      window.open(
        `http://www.google.com/maps/place/${lat},${lng}`,
        "_system",
        "location=yes"
      );
    },

    get_detail(places_id: any) {
      this.record.img_places = [];
      axios
        .get(`${end_point}/view/places/${places_id}`)
        .then((res: AxiosResponse) => {
          res.data.img_places = JSON.parse(res.data.img_places);
          this.record = res.data;
          this.loadding = false;
        });

      //https://api.system-searchpet.com/view/places/{{places_id}}
    },
    isLogin() {
      var userData = localStorage.getItem("userData");
      if (userData) {
        return true;
      } else {
        return false;
      }
    },
    openComment() {
      this.box_comment_open = true;
    },
  },
  setup() {
    return {
      add,
    };
  },
});
</script>
<style scoped>
.vue-map-container {
  height: 300px;
  width: 75%;
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
.comment-item {
  display: flex;
  border-bottom: 0.5px solid #838181;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
}
.comment-text {
  padding-left: 10px;
  padding-right: 10px;
}
.btn-comment {
  top: 92%;
}
</style>
