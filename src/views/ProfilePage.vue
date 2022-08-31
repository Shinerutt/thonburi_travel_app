<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>โปรไฟล์</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
    <!-- {{isLogin}} -->
      <div v-if="isLogin == true">
        <div style="margin: 20px; text-align: center">
          <img
            :src="img"
            style="
              width: 150px;
              height: 150px;
              border-radius: 100%;
              box-shadow: 0px 0px 0px 0.5px rgba(0, 0, 0, 0.75);
            "
            alt=""
            @click="change_img"
          />
          <input
            type="file"
            style="display: none"
            ref="input_img"
            @change="previewImage"
            accept="image/*"
          />
        </div>
        <div>
          <ion-item>
            <ion-label position="stacked">อีเมล</ion-label>
            <ion-input
              @ionInput="userData.email = $event.target.value"
              :value="userData.email"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">ชื่อจริง</ion-label>
            <ion-input
              @ionInput="userData.first_name = $event.target.value"
              :value="userData.first_name"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">นามสกุล</ion-label>
            <ion-input
              @ionInput="userData.last_name = $event.target.value"
              :value="userData.last_name"
            ></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">ชื่อเล่น</ion-label>
            <ion-input
              @ionInput="userData.nick_name = $event.target.value"
              :value="userData.nick_name"
            ></ion-input>
          </ion-item>

          <!-- <ion-item>
            <ion-label position="stacked">รหัสผ่าน</ion-label>
            <ion-input
              @ionInput="userData.password = $event.target.value"
              :value="userData.password" type="password"
            ></ion-input>
          </ion-item> -->

          <ion-button
            expand="block"
            style="margin-top: 20px"
            @click="update_profile"
            >บันทึก</ion-button
          >
          <ion-button
            expand="block"
            style="margin-top: 20px" color="danger"
            @click="logout"
            >ออกจากระบบ</ion-button
          >
        </div>
      </div>
      <div v-else>
        <ion-button expand="block" @click="goToLogin">เข้าสู่ระบบ</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent
  
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import firebase from "firebase";
const end_point = "https://api.system-searchpet.com";
const firebaseConfig = {
  apiKey: "AIzaSyBE_B4EB4M_-7GHM6um6yIn7xjrRWarMiU",
  authDomain: "shinerut-3dfa4.firebaseapp.com",
  projectId: "shinerut-3dfa4",
  storageBucket: "shinerut-3dfa4.appspot.com",
  messagingSenderId: "305191756173",
  appId: "1:305191756173:web:5392d1dd42b2c3680b5dc4",
  measurementId: "G-G61N9W50Y7",
};
const app_firebase = firebase.initializeApp(firebaseConfig);
console.log(app_firebase);

export default defineComponent({
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  created() {
    var userData = localStorage.getItem("userData");
    if (userData != null) {
      this.isLogin = true;
      this.userData = JSON.parse(userData);
      this.img = this.userData.img_profile;
    }
    console.log(userData);
  },

  data() {
    // { } = odject
    return {
      img: "",
      imageData: null,
      isLogin: false,
      userData: {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        nick_name: "",
        // password:"",
        img_profile: "",
        created_at: "",
        updated_at: "",
      },
    };
  },
  methods: {
    goToLogin() {
      this.router.push("/login");
    },
    change_img() {
      var refs: any = this.$refs;
      refs.input_img.click();
    },
    previewImage(event: any) {
      this.img = "";
      this.imageData = event.target.files[0];
      console.log(this.imageData);
      this.onUpload();
    },
    onUpload() {
      this.img = "";
      var imageData: any = this.imageData;
      console.log("starUpload");

      const storageRef = app_firebase
        .storage()
        .ref(`/image_profile/${this.userData.id}/${imageData.name}`)
        .put(imageData);
      storageRef.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.img = url;
            this.userData.img_profile = url;
            console.log(this.img);
          });
        }
      );
    },
    update_profile() {
      axios
        .put(`${end_point}/user/${this.userData.id}`, this.userData)
        .then((res) => {
          if (res.data.status == true) {
            localStorage.setItem("userData", JSON.stringify(res.data.data));
            this.userData = res.data.data;
            alert("Upadte  Proflie Success");
          } else {
            alert(res.data.message);
          }
        })
        .catch(() => {
          alert("Can not Upadte Profile.");
        });
      console.log(JSON.stringify(this.userData));
    },
    logout() {
      localStorage.removeItem("userData");
      this.router.push("/login");
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>